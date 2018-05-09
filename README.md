Spotlightify

Created by Logan Smith in 2018

About -

Spotlightify is a fully-animated artist look-up applicaiton built with a Reactjs front-end and a Nodejs back-end. Working in stride with the official Spotify API, Spotlightify is able to display specific artists statistics such as the number of followers, popularity rating, genres and three related artists. Users are given five artists (Drake, Eminem, Lady Gaga, Marilyn Manson and Rihanna) to test the system before they make their own search queries. They can also dig deep into the Spotify arist database by clicking on the related artists, only to discover the related artists' related artists, and so forth. All of this data is being displayed in swift, pixel-perfect CSS3 keyframes animation.

Workflow and Screenshots -

1. Home / Login Page

Link: http://spotlightify.herokuapp.com

Screenshot: https://ibb.co/dtyn4S

Upon visiting the app, users are promted to login with Spotify. This is easily accomplished thanks to Spotify's one-click login socials. When the user clicks "Login with Spotify", a request is sent to Spotify for an OAuth token, which is then attached to the URL as a paramater titled "access_token". This token grants full access to all of the endpoints the Spotify API offers, more specifically the "Get Artist" and "Get Artist's Artists" endpoints that are used in the app. The user's session is then stored on the front-end with the Express-Session NPM package. The background is made from HTML5 / CSS3 to replicate an equalizer graphic set to music - it is purely for looks.

2. Artist Lookup / Search Page

Link: http://spotlightify-final.herokuapp.com

Screenshot 1: https://ibb.co/no2x4S
Screeshot 2: https://ibb.co/n18e17

After logging in with their Spotify account, the user is directed to the artist lookup / search page. They have two options - select an artist out of the five provided, or type in their query into the animated search bar at the very top of the component. Upon clicking an artist or searching for their own, an Axios call is made to the Spotify API. The returned data is set to the component's state, and that data is then mapped into the appropriate divs - followers, genres and popularity. The three related artists' images are then rendered (changing the background image of the three circles at the bottom) as well as their names and ids. The related artists can then be clicked to repeat the cycle, making the code completely reusable and interactive.

Languages and Frameworks used: Reactjs, Nodejs, HTML5, CSS3, Javascript, SQL

NPM Packages used: Express, Axios, React Router, Cors, Massive, Express-Session

Visit Spotlightify at http://spotlightify.herokuapp.com

GitHub Repo - https://github.com/atmosphereasmr/spotlightify# spotlightify