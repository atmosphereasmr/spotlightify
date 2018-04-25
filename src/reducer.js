import axios from "axios";

  this.state = {
    followers: 0
  }

const initialState = {
  chosen: false,
  followers: 0,
  genres: '',
  popularity: 0,
  backgroundOne: '',
  backgroundTwo: '',
  backgroundThree: '',
  nameOne: '',
  nameTwo: '',
  nameThree: '',
  additionalName: '',
  relatedArtist1Picked: false,
  relatedArtist2Picked: false,
  relatedArtist3Picked: false,
  relatedArtist1Id: '',
  relatedArtist2Id: '',
  relatedArtist3Id: '',
  access_token: '',
  link1: '',
  link2: '',
  link3: '',
  input: '',
  resultsBackground: '',
  resultsArtistId: '',
  resultsName: '',
  selectedID: ''

};

const IS_CHOSEN = "IS_CHOSEN";
const IS_UNCHOSEN = "IS_UNCHOSEN"
const UNSELECT_ALL = "UNSELECT_ALL";
const GET_FOLLOWERS = "GET_FOLLOWERS"
const GET_GENRES = "GET_GENRES"
const GET_POPULARITY = "GET_POPULARITY"
const GET_BACKGROUNDS = "GET_BACKGROUNDS"
const GET_NAMES = "GET_NAMES"
const RELATED_ARTIST_1_CHOSEN = "RELATED_ARTIST_1_CHOSEN"
const RELATED_ARTIST_1_UNCHOSEN = "RELATED_ARTIST_1_UNCHOSEN"
const GET_RELATED_ARTIST_ID = "GET_RELATED_ARTIST_ID"
const GET_ACCESS_TOKEN = "GET_ACCESS_TOKEN"
const GET_LINK = "GET_LINK"
const SEARCH_ARTIST = "SEARCH_ARTIST"
const GET_RESULTS_NAME = "GET_RESULTS_NAME"
const GET_SELECTED_ID = "GET_SELECTED_ID"

function reducer(state = initialState, action) {
  switch (action.type) {
    case IS_CHOSEN:
      let { chosen } = action;
      return { ...state, chosen: true };
    case IS_UNCHOSEN:
      let { unchosen } = action;
      return {...state, chosen: false}
    case UNSELECT_ALL:
      let { unselectAll } = action;
      return {...state, drake: false, marilyn: false, ladyGaga: false, eminem: false, rihanna: false, relatedArtist1Picked: false}
    case GET_FOLLOWERS:
      let { followers } = action;
      return {...state, followers: action.payload}
    case GET_GENRES:
      let { genres } = action;
      return {...state, genres: action.payload}
    case GET_POPULARITY:
      let { popularity } = action;
      return {...state, popularity: action.payload}
    case GET_BACKGROUNDS:
      let { backgroundOne, backgroundTwo, backgroundThree } = action;
      return {...state, backgroundOne: action.payload[0], backgroundTwo: action.payload[1], backgroundThree: action.payload[2]}
    case GET_NAMES:
      let {nameOne, nameTwo, nameThree, additionalName} = action;
      return {...state, nameOne: action.payload[0], nameTwo: action.payload[1], nameThree: action.payload[2], additionalName: action.payload[3]}
    case RELATED_ARTIST_1_CHOSEN:
      let {relatedArtist1Pick} = action;
      return {...state, relatedArtist1Picked: true}
    case RELATED_ARTIST_1_UNCHOSEN:
      let {relatedArtist1Unchosen} = action;
      return {...state, relatedArtist1Picked: true}
    case GET_RELATED_ARTIST_ID:
      let {relatedArtist1Id, relatedArtist2Id, relatedArtist3Id} = action;
      return {...state, relatedArtist1Id: action.payload[0], relatedArtist2Id: action.payload[1], relatedArtist3Id: action.payload[2]}
    case GET_ACCESS_TOKEN:
      let {accessToken} = action;
      return {...state, access_token: action.payload}
    case GET_LINK:
      let {link1, link2, link3} = action
      return {...state, link1: action.payload[0], link2: action.payload[1], link3: action.payload[2]}
    case SEARCH_ARTIST + "_FULFILLED":
      let {httprequest} = action;
      return {...state, name: action.payload.artists.items[0].name, followers: action.payload.artists.items[0].followers.total, genres: action.payload.artists.items[0].genres, popularity: action.payload.artists.items[0].popularity,
      resultsBackground: action.payload.artists.items[0].images[0].url, resultsArtistId: action.payload.artists.items[0].id, resultsName: action.payload.artists.items[0].name}
    case GET_RESULTS_NAME:
      let {name} = action;
      return {...state, resultsName: action.payload}
    case GET_SELECTED_ID:
      let {id} = action;
      return {...state, selectedID: action.payload}
    default:
      return state;
  }
}

export function isChosen(chosen) {
  return {
    type: IS_CHOSEN,
    payload: chosen
  };
}

export function unselectAll(unselectAll) {
  return {
    type: UNSELECT_ALL,
    payload: unselectAll
  };
}

export function getFollowers(followers) {
  return {
    type: GET_FOLLOWERS,
    payload: followers
  }
}

export function getGenres(genres) {
  return {
    type: GET_GENRES,
    payload: genres
  }
}

export function getPopularity(popularity) {
  return {
    type: GET_POPULARITY,
    payload: popularity
  }
}

export function isUnchosen() {
  return {
    type: IS_UNCHOSEN
}
}

export function getBackgrounds(backgroundOne, backgroundTwo, backgroundThree) {
  return {
    type: GET_BACKGROUNDS,
    payload: [backgroundOne, backgroundTwo, backgroundThree]
  }
}

export function clickGlass(input, access_token) {

  window.onscroll = () => {
    if (
      document.body.scrollTop > 20 ||
      document.documentElement.scrollTop > 20
    ) {
      document.getElementById("navbar").style.top = "0px";
    } else {
      document.getElementById("navbar").style.top = "-50px";
    }
  }

  const httprequest = axios.get(`https://api.spotify.com/v1/search?q=${input}&type=artist`,  {headers: {Authorization: `Bearer ${access_token.access_token}`}}).then(res => {
    return res.data})

  const rihannaPic = document.getElementById("rihanna-pic");
  const eminemPic = document.getElementById("eminem-pic");
  const ladyGagaPic = document.getElementById("lady-gaga-pic");
  const ladyGagaName = document.getElementById('lady-gaga-name')
  const marilynPic = document.getElementById("marilyn-pic");
  const marilynName = document.getElementById("marilyn-name");
  const goBack = document.getElementById("go-back");
  const drakePic = document.getElementById("drake-pic")
  const eminemName = document.getElementById("eminem-id-name")
  const listenCircle = document.getElementById('listen-circle')
  const dataCircle1 = document.getElementById('data-circle-1')
  const dataCircle2 = document.getElementById('data-circle-2')
  const dataCircle3 = document.getElementById('data-circle-3')
  const resultsArtist = document.getElementById('results-artist')
  const resultsArtistName = document.getElementById('results-artist-name')
  const snapshotArtist1 = document.getElementById('logo')
  const snapshotArtistName1 = document.getElementById('snapshot-name')

  eminemPic.className = 'eminem-pic-fade'
  ladyGagaPic.className = 'lady-gaga-pic-fade'
  drakePic.className = 'drake-pic-fade'
  marilynPic.className = 'marilyn-pic-fade'
  rihannaPic.className = "rihanna-pic-fade"
  dataCircle1.className = "data-circle-1-on"
  dataCircle2.className = "data-circle-2-on"
  dataCircle3.className = "data-circle-3-on"
  listenCircle.className = 'listen-circle-on'
  goBack.className = 'go-back-on'
  resultsArtist.className = 'results-artist-on'
  resultsArtistName.className = "results-artist-name-on"
  snapshotArtist1.className = "snapshot-artist-1-off"
  snapshotArtistName1.className = "snapshot-artist-1-off"

  return {
    type: SEARCH_ARTIST,
    payload: httprequest
  }
}

export function getNames(nameOne, nameTwo, nameThree, additionalName) {
  return {
    type: GET_NAMES,
    payload: [nameOne, nameTwo, nameThree, additionalName]
  }
}

export function getLink(link1, link2, link3) {
  return {
  type: GET_LINK,
  payload: [link1, link2, link3]
}
}

export function getSelectedId(id) {
  return {
    type: GET_SELECTED_ID,
    payload: id
  }
}

export function relatedArtist1Chosen(relatedArtist1Pick) {
  return {
    type: RELATED_ARTIST_1_CHOSEN,
    payload: relatedArtist1Pick
  }
}

export function relatedArtist1Unchosen(relatedArtist1Unchosen) {
  return {
    type: RELATED_ARTIST_1_UNCHOSEN,
    payload: relatedArtist1Unchosen
  }
}

export function getRelatedArtistIds(relatedArtist1Id, relatedArtist2Id, relatedArtist3Id) {
  return {
    type: GET_RELATED_ARTIST_ID,
    payload: [relatedArtist1Id, relatedArtist2Id, relatedArtist3Id]
  }
}

export function getAccessToken(accessToken) {
  return {
    type: GET_ACCESS_TOKEN,
    payload: accessToken
  }
}

export function getResultsName(name) {
  return {
    type: GET_RESULTS_NAME,
    payload: name
  }
}

export default reducer;
