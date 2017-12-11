import React, {Component} from 'react'
import './home.css'

import SearchBar from '../../Components/SearchBar/search-bar'

export default class Home extends Component {

  render() {
    return (
      <div>
        <div id="navbar" className="navbar">
        <SearchBar />
        </div>
        <div className="center">
        <div className="concert-image">
          <div className="header-text-3">
            <h1>Spotlightify</h1>
            <div className="powered-by">
              <h1>Powered by</h1>
              <div className="spotify-logo">
              </div>
            </div>
            </div>
            </div>
        </div>
      </div>
    )
  }
}
