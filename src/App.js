import React, { Component } from 'react';
import "./App.css"

import Home from './Components/Home/home'
import SearchBar from './Components/SearchBar/search-bar'
import PicAndBio from './Components/PicAndBio/pic-and-bio'
import Data from './Components/Data/data'

class App extends Component {
  render() {
    return (
      <div>
      <SearchBar />
      <Home />
      <PicAndBio />
      <Data />
      </div>
    );
  }
}

export default App;
