import React, { Component } from "react";
import "./search-bar.css";
import axios from "axios";
import { connect } from "react-redux";
import {getFollowers, clickGlass, getRelatedArtistIds, getBackgrounds, getNames} from '../../reducer'

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input: "",
      followers: 0,
      relatedArtist1Id: '',
      relatedArtist2Id: '',
      relatedArtist3Id: '',
      backgroundOne: '',
      backgroundTwo: '',
      backgroundThree: '',
      nameOne: '',
      nameTwo: '',
      nameThree: ''
    }
  }

  artistInput(input) {
    this.setState({ input: input });
  }

  relatedResults() {
    console.log(this.props)
    axios.get(`https://api.spotify.com/v1/artists/${this.props.resultsArtistId}/related-artists`, {headers: {Authorization: `Bearer ${this.props.access_token.access_token}`}})
      .then(res => {
        this.setState({relatedArtist1Id: res.data.artists[0].id, relatedArtist2Id: res.data.artists[1].id,relatedArtist3Id: res.data.artists[2].id},
          () => this.props.getRelatedArtistIds(this.state.relatedArtist1Id, this.state.relatedArtist2Id, this.state.relatedArtist3Id)
        )
        this.setState({backgroundOne: res.data.artists[0].images[0], backgroundTwo: res.data.artists[1].images[0], backgroundThree: res.data.artists[2].images[0]},
          () => this.props.getBackgrounds(this.state.backgroundOne, this.state.backgroundTwo, this.state.backgroundThree)
        )
        this.setState({nameOne: res.data.artists[0].name, nameTwo: res.data.artists[1].name, nameThree: res.data.artists[2].name},
          () => this.props.getNames(this.state.nameOne, this.state.nameTwo, this.state.nameThree)
        )

                  const backgroundFirst = document.getElementById("data-circle-4")
                  const backgroundSecond = document.getElementById("data-circle-5")
                  const backgroundThird = document.getElementById("data-circle-6")
                  backgroundFirst.style = `background-image: url("${this.props.backgroundOne.url}")`
                  backgroundFirst.className = "data-circle-4-on"
                  backgroundSecond.style = `background-image: url("${this.props.backgroundTwo.url}")`
                  backgroundSecond.className = "data-circle-5-on"
                  backgroundThird.style = `background-image: url("${this.props.backgroundThree.url}")`
                  backgroundThird.className = "data-circle-6-on"
  })}

  render() {
    return (
      <div>
        <div className="search-bar" id="navbar"
        >
          <input
            className="input-box"
            placeholder="Enter artist name"
            onChange={e => this.artistInput(e.target.value)}
          />
          <div
            className="glass"
            onClick={() =>
              this.props.clickGlass(this.state.input, this.props.access_token).then(() =>this.relatedResults())
            }
          />
        </div>
      </div>
    );
  }
}

function MapStateToProps(state) {
  console.log(state.resultsBackground)
  return state;
}

export default connect(MapStateToProps, {getFollowers, clickGlass, getRelatedArtistIds, getBackgrounds, getNames})(SearchBar);
