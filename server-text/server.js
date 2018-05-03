require('dotenv').config();

var express = require('express'); // Express web server framework
var request = require('request'); // "Request" library
var querystring = require('querystring');
var cookieParser = require('cookie-parser');
var session = require('express-session')
var cors = require('cors')
var massive = require('massive');
var controller = require('./controller');
var session = require('express-session');
var bodyParser = require('body-parser');

var client_id = '03a1fa81261d484d83f60c14183d0087'; // Your client id
var client_secret = '4f2bdb7b4b9d42fcb904aa9d97f5cce5'; // Your secret
var redirect_uri = 'http://spotlightify.herokuapp.com/callback'; // Your redirect uri

/**
 * Generates a random string containing numbers and letters
 * @param  {number} length The length of the string
 * @return {string} The generated string
 */
var generateRandomString = function(length) {
  var text = '';
  var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (var i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

var stateKey = 'spotify_auth_state';

var app = express();

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}))

app.use( bodyParser.json() );
app.use(cors({
  origin: true,
  credentials: true
}))

var port = process.env.PORT || 8888

app.use(express.static(__dirname + '/public'))
   .use(cookieParser());

   massive(process.env.CONNECTION_STRING).then( db => {
     app.set('db', db)
   })

   massive(process.env.CONNECTION_STRING).then(dbInstance => {
     app.set('db', dbInstance);
   });

   app.get("/", function(res, req) {
     res.render("index")
   })

   app.listen(port, function() {
     console.log("app running")
   })

app.get('/login', function(req, res) {
  var state = generateRandomString(16);
  res.cookie(stateKey, state);

  // your application requests authorization
  var scope = 'user-read-private user-read-email';
  res.redirect('https://accounts.spotify.com/authorize?' +
    querystring.stringify({
      response_type: 'code',
      client_id: client_id,
      scope: scope,
      redirect_uri: redirect_uri,
      state: state
    }));
});

app.get('/callback', function(req, res) {


  // your application requests refresh and access tokens
  // after checking the state parameter

  var code = req.query.code || null;
  var state = req.query.state || null;
  var storedState = req.cookies ? req.cookies[stateKey] : null;

  if (state === null || state !== storedState) {

    res.redirect('/#' +
      querystring.stringify({
        error: 'state_mismatch'
      }));
  } else {

    res.clearCookie(stateKey);
    var authOptions = {
      url: 'https://accounts.spotify.com/api/token',
      form: {
        code: code,
        redirect_uri: redirect_uri,
        grant_type: 'authorization_code'
      },
      headers: {
        'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))
      },
      json: true
    };

    request.post(authOptions, function(error, response, body) {
      console.log('This is our response code and body', response.statusCode, body)
      if (!error && response.statusCode === 200) {

        var access_token = body.access_token,
            refresh_token = body.refresh_token,
            email = body.email;

        var options = {
          url: 'https://api.spotify.com/v1/me',
          headers: { 'Authorization': 'Bearer ' + access_token },
          json: true
        };

        // use the access token to access the Spotify Web API
        request.get(options, function(error, response, body) {
          console.log('I the body', body);
        });
        if (!req.session.access_token) {
          req.session.access_token = access_token,
          req.session.email = body.email
        }
        // we can also pass the token to the browser to make requests from there
        res.redirect('http://spotlightify-final.herokuapp.com/search/' +
          querystring.stringify({
            access_token: access_token,
            refresh_token: refresh_token,
            email: email
          }));
      } else {
        res.redirect('http://spotlightify-final.herokuapp.com/search/' +
          querystring.stringify({
            error: 'invalid_token'
          }));
      }
    });
  }
});

app.get('/refresh_token', function(req, res) {

  // requesting access token from refresh token
  var refresh_token = req.query.refresh_token;
  var authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    headers: { 'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64')) },
    form: {
      grant_type: 'refresh_token',
      refresh_token: refresh_token
    },
    json: true
  };


  request.post(authOptions, function(error, response, body) {
    if (!error && response.statusCode === 200) {
      var access_token = body.access_token;
      var email = body.email;
      res.send({
        'access_token': access_token,
        'email': email
      });
    }
  });
});

app.get('/grab-access', function(req, res) {
  res.status(200).send(req.session)
})

app.get('/api/spotlightify_users', controller.getPlanes)
app.post('/api/add-artist', controller.addArtist)
app.post('/api/spotlightify_users', controller.addPlane)