import React, { Component } from "react";
import "./data.css";
import { connect } from "react-redux";
import {
  relatedArtist1Chosen,
  relatedArtist1Unchosen,
  getFollowers,
  getGenres,
  getPopularity,
  getBackgrounds,
  getRelatedArtistIds,
  getNames,
  getLink
} from "../../reducer";
import axios from "axios";

class Data extends Component {
  constructor(props) {
    super(props);
    this.state = {
      relatedArtist1Picked: false,
      relatedArtist2Picked: false,
      relatedArtist3Picked: false,
      previousRelatedArtistName: "",
      previousRelatedArtistBackground: "",
      link1: "",
      link2: "",
      link3: ""
    };
  }

  artistOneTextOn() {
    const relatedArtistName1 = document.getElementById("related-artist-name-1");
    const relatedArtistName2 = document.getElementById("related-artist-name-2");
    const relatedArtistName3 = document.getElementById("related-artist-name-3");

    relatedArtistName1.className = "artist-text-container-1-hover";
    relatedArtistName2.className = "artist-text-container-2";
    relatedArtistName3.className = "artist-text-container-3";
  }

  artistTwoTextOn() {
    const relatedArtistName1 = document.getElementById("related-artist-name-1");
    const relatedArtistName2 = document.getElementById("related-artist-name-2");
    const relatedArtistName3 = document.getElementById("related-artist-name-3");

    relatedArtistName1.className = "artist-text-container-1";
    relatedArtistName2.className = "artist-text-container-2-hover";
    relatedArtistName3.className = "artist-text-container-3";
  }

  artistThreeTextOn() {
    const relatedArtistName1 = document.getElementById("related-artist-name-1");
    const relatedArtistName2 = document.getElementById("related-artist-name-2");
    const relatedArtistName3 = document.getElementById("related-artist-name-3");

    relatedArtistName1.className = "artist-text-container-1";
    relatedArtistName2.className = "artist-text-container-2";
    relatedArtistName3.className = "artist-text-container-3-hover";
  }

  artistTextOff() {
    const relatedArtistName1 = document.getElementById("related-artist-name-1");
    const relatedArtistName2 = document.getElementById("related-artist-name-2");
    const relatedArtistName3 = document.getElementById("related-artist-name-3");

    relatedArtistName1.className = "artist-text-container-1";
    relatedArtistName2.className = "artist-text-container-2";
    relatedArtistName3.className = "artist-text-container-3";
  }

  relatedArtistSearch1() {
    "use strict";
    var element = document.getElementById("logo");
    element.classList.remove("run-animation");
        element.classList.remove("run-animation-2");
            element.classList.remove("run-animation-3");
    void element.offsetWidth;
    element.classList.add("run-animation");

    "use strict";
    var element = document.getElementById("snapshot-name");
    element.classList.remove("run-animation");
        element.classList.remove("run-animation-2");
          element.classList.remove("run-animation-3");
    void element.offsetWidth;
    element.classList.add("run-animation");

    this.setState(
      {
        link1: this.props.link1,
        link2: this.props.link2,
        link3: this.props.link3,
        relatedArtist1Picked: true,
        previousRelatedArtist: this.props.nameOne,
        previousRelatedArtistBackground: this.props.backgroundOne
      },
      () => {
        console.log(this.state);
        this.props.relatedArtist1Chosen(this.state.relatedArtist1Picked);
      }
    );
    const rihannaPic = document.getElementById("rihanna-pic");
    const eminemPic = document.getElementById("eminem-pic");
    const ladyGagaPic = document.getElementById("lady-gaga-pic");
    const drakePic = document.getElementById("drake-pic");
    const marilynPic = document.getElementById("marilyn-pic");
    const resultsArtist = document.getElementById("results-artist");
    const resultsArtistName = document.getElementById("results-artist-name")

    drakePic.className = "drake-pic-fade";
    rihannaPic.className = "rihanna-pic-fade";
    ladyGagaPic.className = "lady-gaga-pic-fade";
    eminemPic.className = "eminem-pic-fade";
    marilynPic.className = "marilyn-pic-fade";
    resultsArtist.className = "results-artist-off";
    resultsArtistName.className = "results-artist-name-off"

    axios
      .get(
        `https://api.spotify.com/v1/artists/${this.props
          .relatedArtist1Id}/related-artists`,
        {
          headers: {
            Authorization: `Bearer ${this.props.access_token.access_token}`
          }
        }
      )
      .then(res => {
        this.setState(
          {
            backgroundOne: res.data.artists[0].images[0],
            backgroundTwo: res.data.artists[1].images[0],
            backgroundThree: res.data.artists[2].images[0]
          },
          () =>
            this.props.getBackgrounds(
              this.state.backgroundOne,
              this.state.backgroundTwo,
              this.state.backgroundThree
            )
        );
        this.setState(
          {
            relatedArtist1Id: res.data.artists[0].id,
            relatedArtist2Id: res.data.artists[1].id,
            relatedArtist3Id: res.data.artists[2].id
          },
          () =>
            this.props.getRelatedArtistIds(
              this.state.relatedArtist1Id,
              this.state.relatedArtist2Id,
              this.state.relatedArtist3Id
            )
        );
        console.log("YEEEE" + this.state.link1 + this.props.link1);
        const backgroundSecond = document.getElementById("data-circle-5");
        const backgroundThird = document.getElementById("data-circle-6");
        const dataCircle4 = document.getElementById("data-circle-4");
        const snapshotArtist1 = document.getElementById("logo");
        const snapshotArtistName1 = document.getElementById(
          "snapshot-artist-name-1"
        );
        backgroundSecond.style = `background-image: url("${this.props
          .backgroundTwo.url}")`;
        backgroundSecond.className = "data-circle-5-on";
        backgroundThird.style = `background-image: url("${this.props
          .backgroundThree.url}")`;
        backgroundThird.className = "data-circle-6-on";
            snapshotArtistName1.className = "snapshot-artist-name-on";
        snapshotArtist1.style = `background-image: url("${this.state
          .previousRelatedArtistBackground.url}")`;
        dataCircle4.style = `background-image: url("${this.props.backgroundOne
          .url}")`;
      });

    console.log(this.props.access_token);

    axios
      .get(
        `https://api.spotify.com/v1/artists/${this.props.relatedArtist1Id}`,
        {
          headers: {
            Authorization: `Bearer ${this.props.access_token.access_token}`
          }
        }
      )
      .then(res => {
        this.setState({ link1: res.data.id }, () =>
          this.props.getLink(
            this.state.link1,
            this.state.link2,
            this.state.link3
          )
        );
        console.log(res.data.followers.total);
        this.setState({ followers: res.data.followers.total }, () =>
          this.props.getFollowers(this.state.followers)
        );
      });

    axios
      .get(
        `https://api.spotify.com/v1/artists/${this.props
          .relatedArtist1Id}/related-artists`,
        {
          headers: {
            Authorization: `Bearer ${this.props.access_token.access_token}`
          }
        }
      )
      .then(res => {
        this.setState(
          {
            nameOne: res.data.artists[0].name,
            nameTwo: res.data.artists[1].name,
            nameThree: res.data.artists[2].name,
            additionalName: res.data.artists[0].name
          },
          () =>
            this.props.getNames(
              this.state.nameOne,
              this.state.nameTwo,
              this.state.nameThree,
              this.state.additionalName
            )
        );
        console.log(this.props);
      });

    axios
      .get(
        `https://api.spotify.com/v1/artists/${this.props.relatedArtist1Id}`,
        {
          headers: {
            Authorization: `Bearer ${this.props.access_token.access_token}`
          }
        }
      )
      .then(res => {
        console.log(res.data.genres);
        this.setState({ genres: res.data.genres }, () =>
          this.props.getGenres(this.state.genres)
        );
      });

    axios
      .get(
        `https://api.spotify.com/v1/artists/${this.props.relatedArtist1Id}`,
        {
          headers: {
            Authorization: `Bearer ${this.props.access_token.access_token}`
          }
        }
      )
      .then(res => {
        console.log(res.data.popularity);
        this.setState({ popularity: res.data.popularity }, () =>
          this.props.getPopularity(this.state.popularity)
        );
      });
  }

  relatedArtistSearch2() {

    "use strict";
    var element = document.getElementById("logo");
    element.classList.remove("run-animation-2");
            element.classList.remove("run-animation-3");
                element.classList.remove("run-animation");
    void element.offsetWidth;
    element.classList.add("run-animation-2");

    "use strict";
    var element = document.getElementById("snapshot-name");
    element.classList.remove("run-animation-2");
                element.classList.remove("run-animation-3");
                  element.classList.remove("run-animation");
    void element.offsetWidth;
    element.classList.add("run-animation-2");


    this.setState(
      {
        link1: this.props.link1,
        link2: this.props.link2,
        link3: this.props.link3,
        relatedArtist2Picked: true,
        previousRelatedArtist: this.props.nameTwo,
        previousRelatedArtistBackground: this.props.backgroundTwo
      },
      () => {
        console.log(this.state);
        this.props.relatedArtist1Chosen(this.state.relatedArtist2Picked);
      }
    );
    const rihannaPic = document.getElementById("rihanna-pic");
    const eminemPic = document.getElementById("eminem-pic");
    const ladyGagaPic = document.getElementById("lady-gaga-pic");
    const drakePic = document.getElementById("drake-pic");
    const marilynPic = document.getElementById("marilyn-pic");
    const resultsArtist = document.getElementById("results-artist");
    const resultsArtistName = document.getElementById("results-artist-name")

    drakePic.className = "drake-pic-fade";
    rihannaPic.className = "rihanna-pic-fade";
    ladyGagaPic.className = "lady-gaga-pic-fade";
    eminemPic.className = "eminem-pic-fade";
    marilynPic.className = "marilyn-pic-fade";
    resultsArtist.className = "results-artist-off";
    resultsArtistName.className = "results-artist-name-off"

    axios
      .get(
        `https://api.spotify.com/v1/artists/${this.props
          .relatedArtist2Id}/related-artists`,
        {
          headers: {
            Authorization: `Bearer ${this.props.access_token.access_token}`
          }
        }
      )
      .then(res => {
        this.setState(
          {
            backgroundOne: res.data.artists[0].images[0],
            backgroundTwo: res.data.artists[1].images[0],
            backgroundThree: res.data.artists[2].images[0]
          },
          () =>
            this.props.getBackgrounds(
              this.state.backgroundOne,
              this.state.backgroundTwo,
              this.state.backgroundThree
            )
        );
        this.setState(
          {
            relatedArtist1Id: res.data.artists[0].id,
            relatedArtist2Id: res.data.artists[1].id,
            relatedArtist3Id: res.data.artists[2].id
          },
          () =>
            this.props.getRelatedArtistIds(
              this.state.relatedArtist1Id,
              this.state.relatedArtist2Id,
              this.state.relatedArtist3Id
            )
        );
        console.log("YEEEE" + this.state.link1 + this.props.link1);
        const backgroundSecond = document.getElementById("data-circle-5");
        const backgroundThird = document.getElementById("data-circle-6");
        const dataCircle4 = document.getElementById("data-circle-4");
        const snapshotArtist1 = document.getElementById("logo");
        const snapshotArtistName1 = document.getElementById(
          "snapshot-artist-name-1"
        );
        backgroundSecond.style = `background-image: url("${this.props
          .backgroundTwo.url}")`;
        backgroundSecond.className = "data-circle-5-on";
        backgroundThird.style = `background-image: url("${this.props
          .backgroundThree.url}")`;
        backgroundThird.className = "data-circle-6-on";
            snapshotArtistName1.className = "snapshot-artist-name-on";
        snapshotArtist1.style = `background-image: url("${this.state
          .previousRelatedArtistBackground.url}")`;
        dataCircle4.style = `background-image: url("${this.props.backgroundOne
          .url}")`;
      });

    axios
      .get(
        `https://api.spotify.com/v1/artists/${this.props.relatedArtist2Id}`,
        {
          headers: {
            Authorization: `Bearer ${this.props.access_token.access_token}`
          }
        }
      )
      .then(res => {
        this.setState({ link1: res.data.id }, () =>
          this.props.getLink(
            this.state.link1,
            this.state.link2,
            this.state.link3
          )
        );
        console.log(res.data.followers.total);
        this.setState({ followers: res.data.followers.total }, () =>
          this.props.getFollowers(this.state.followers)
        );
      });

    axios
      .get(
        `https://api.spotify.com/v1/artists/${this.props
          .relatedArtist2Id}/related-artists`,
        {
          headers: {
            Authorization: `Bearer ${this.props.access_token.access_token}`
          }
        }
      )
      .then(res => {
        this.setState(
          {
            nameOne: res.data.artists[0].name,
            nameTwo: res.data.artists[1].name,
            nameThree: res.data.artists[2].name,
            additionalName: res.data.artists[0].name
          },
          () =>
            this.props.getNames(
              this.state.nameOne,
              this.state.nameTwo,
              this.state.nameThree,
              this.state.additionalName
            )
        );
        console.log(this.props);
      });

    axios
      .get(
        `https://api.spotify.com/v1/artists/${this.props.relatedArtist2Id}`,
        {
          headers: {
            Authorization: `Bearer ${this.props.access_token.access_token}`
          }
        }
      )
      .then(res => {
        console.log(res.data.genres);
        this.setState({ genres: res.data.genres }, () =>
          this.props.getGenres(this.state.genres)
        );
      });

    axios
      .get(
        `https://api.spotify.com/v1/artists/${this.props.relatedArtist2Id}`,
        {
          headers: {
            Authorization: `Bearer ${this.props.access_token.access_token}`
          }
        }
      )
      .then(res => {
        console.log(res.data.popularity);
        this.setState({ popularity: res.data.popularity }, () =>
          this.props.getPopularity(this.state.popularity)
        );
      });
  }

  relatedArtistSearch3() {
    "use strict";
    "use strict";
    var element = document.getElementById("logo");
    element.classList.remove("run-animation");
        element.classList.remove("run-animation-2");
            element.classList.remove("run-animation-3");
    void element.offsetWidth;
    element.classList.add("run-animation-3");

    "use strict";
    var element = document.getElementById("snapshot-name");
    element.classList.remove("run-animation");
        element.classList.remove("run-animation-2");
          element.classList.remove("run-animation-3");
    void element.offsetWidth;
    element.classList.add("run-animation-3");
    this.setState(
      {
        link1: this.props.link1,
        link2: this.props.link2,
        link3: this.props.link3,
        relatedArtist3Picked: true,
        previousRelatedArtist: this.props.nameThree,
        previousRelatedArtistBackground: this.props.backgroundThree
      },
      () => {
        console.log(this.state);
        this.props.relatedArtist1Chosen(this.state.relatedArtist3Picked);
      }
    );
    const rihannaPic = document.getElementById("rihanna-pic");
    const eminemPic = document.getElementById("eminem-pic");
    const ladyGagaPic = document.getElementById("lady-gaga-pic");
    const drakePic = document.getElementById("drake-pic");
    const marilynPic = document.getElementById("marilyn-pic");
    const resultsArtist = document.getElementById("results-artist");
    const resultsArtistName = document.getElementById("results-artist-name")

    drakePic.className = "drake-pic-fade";
    rihannaPic.className = "rihanna-pic-fade";
    ladyGagaPic.className = "lady-gaga-pic-fade";
    eminemPic.className = "eminem-pic-fade";
    marilynPic.className = "marilyn-pic-fade";
    resultsArtist.className = "results-artist-off";
    resultsArtistName.className = "results-artist-name-off"

    axios
      .get(
        `https://api.spotify.com/v1/artists/${this.props
          .relatedArtist3Id}/related-artists`,
        {
          headers: {
            Authorization: `Bearer ${this.props.access_token.access_token}`
          }
        }
      )
      .then(res => {
        this.setState(
          {
            backgroundOne: res.data.artists[0].images[0],
            backgroundTwo: res.data.artists[1].images[0],
            backgroundThree: res.data.artists[2].images[0]
          },
          () =>
            this.props.getBackgrounds(
              this.state.backgroundOne,
              this.state.backgroundTwo,
              this.state.backgroundThree
            )
        );
        this.setState(
          {
            relatedArtist1Id: res.data.artists[0].id,
            relatedArtist2Id: res.data.artists[1].id,
            relatedArtist3Id: res.data.artists[2].id
          },
          () =>
            this.props.getRelatedArtistIds(
              this.state.relatedArtist1Id,
              this.state.relatedArtist2Id,
              this.state.relatedArtist3Id
            )
        );
        console.log("YEEEE" + this.state.link1 + this.props.link1);
        const backgroundSecond = document.getElementById("data-circle-5");
        const backgroundThird = document.getElementById("data-circle-6");
        const dataCircle4 = document.getElementById("data-circle-4");
        const snapshotArtist1 = document.getElementById("logo");
        const snapshotArtistName1 = document.getElementById(
          "snapshot-artist-name-1"
        );
        backgroundSecond.style = `background-image: url("${this.props
          .backgroundTwo.url}")`;
        backgroundSecond.className = "data-circle-5-on";
        backgroundThird.style = `background-image: url("${this.props
          .backgroundThree.url}")`;
        backgroundThird.className = "data-circle-6-on";
            snapshotArtistName1.className = "snapshot-artist-name-on";
        snapshotArtist1.style = `background-image: url("${this.state
          .previousRelatedArtistBackground.url}")`;
        dataCircle4.style = `background-image: url("${this.props.backgroundOne
          .url}")`;
      });

    console.log(this.props.access_token);

    axios
      .get(
        `https://api.spotify.com/v1/artists/${this.props.relatedArtist3Id}`,
        {
          headers: {
            Authorization: `Bearer ${this.props.access_token.access_token}`
          }
        }
      )
      .then(res => {
        this.setState({ link1: res.data.id }, () =>
          this.props.getLink(
            this.state.link1,
            this.state.link2,
            this.state.link3
          )
        );
        console.log(res.data.followers.total);
        this.setState({ followers: res.data.followers.total }, () =>
          this.props.getFollowers(this.state.followers)
        );
      });

    axios
      .get(
        `https://api.spotify.com/v1/artists/${this.props
          .relatedArtist3Id}/related-artists`,
        {
          headers: {
            Authorization: `Bearer ${this.props.access_token.access_token}`
          }
        }
      )
      .then(res => {
        this.setState(
          {
            nameOne: res.data.artists[0].name,
            nameTwo: res.data.artists[1].name,
            nameThree: res.data.artists[2].name,
            additionalName: res.data.artists[0].name
          },
          () =>
            this.props.getNames(
              this.state.nameOne,
              this.state.nameTwo,
              this.state.nameThree,
              this.state.additionalName
            )
        );
        console.log(this.props);
      });

    axios
      .get(
        `https://api.spotify.com/v1/artists/${this.props.relatedArtist3Id}`,
        {
          headers: {
            Authorization: `Bearer ${this.props.access_token.access_token}`
          }
        }
      )
      .then(res => {
        console.log(res.data.genres);
        this.setState({ genres: res.data.genres }, () =>
          this.props.getGenres(this.state.genres)
        );
      });

    axios
      .get(
        `https://api.spotify.com/v1/artists/${this.props.relatedArtist3Id}`,
        {
          headers: {
            Authorization: `Bearer ${this.props.access_token.access_token}`
          }
        }
      )
      .then(res => {
        console.log(res.data.popularity);
        this.setState({ popularity: res.data.popularity }, () =>
          this.props.getPopularity(this.state.popularity)
        );
      });
  }

  render() {
    return (
      <div>
        <div className="data-circle-1-off" id="data-circle-1">
          Followers: {this.props.followers}
        </div>
        <div className="data-circle-2-off" id="data-circle-2">
          Genres:
          <ul>
            <li> {this.props.genres[0]}</li>
            <li>{this.props.genres[1]}</li>
            <li>{this.props.genres[2]} </li>
          </ul>
        </div>
        <div className="data-circle-3-off" id="data-circle-3">
          Popularity: {this.props.popularity}
        </div>
        <div
          className="data-circle-4-off"
          id="data-circle-4"
          onMouseEnter={() => {
            this.setState({ hovered: this.props.nameOne });
            this.artistOneTextOn();
          }}
          onMouseLeave={() => {
            this.artistTextOff(`${this.props.nameOne}`);
          }}
          onClick={() => {
            this.relatedArtistSearch1();
          }}
        />
        <div className="artist-text-container-1" id="related-artist-name-1">
          <h2>{this.props.nameOne}</h2>
        </div>
        <div
          className="data-circle-5-off"
          id="data-circle-5"
          onMouseEnter={() => {
            this.setState({ hovered: this.props.nameTwo });
            this.artistTwoTextOn();
          }}
          onMouseLeave={() => {
            this.artistTextOff(`${this.props.nameTwo}`);
          }}
          onClick={() => {
            this.relatedArtistSearch2();
          }}
        />
        <div className="artist-text-container-2" id="related-artist-name-2">
          <h2>{this.props.nameTwo}</h2>
        </div>
        <div
          className="data-circle-6-off"
          id="data-circle-6"
          onMouseEnter={() => {
            this.setState({ hovered: this.props.nameThree }, () => {
              this.artistThreeTextOn();
            });
          }}
          onMouseLeave={() => {
            this.artistTextOff(`${this.props.nameThree}`);
          }}
          onClick={() => {
            this.relatedArtistSearch3();
          }}
        />
        <div className="artist-text-container-3" id="related-artist-name-3">
          <h2>{this.props.nameThree}</h2>
        </div>
        <div
          className="run-animation"
          id="snapshot-artist-1"
          onMouseEnter={() => {
            console.log(this.props.additionalName);
          }}
          onMouseLeave={() => {
            console.log(this.props.additionalName);
          }}
          onClick={() => {
            console.log("yes");
          }}
        />
        <div className="snapshot-artist-name-off" id="snapshot-artist-name-1" />
        <div className="results-artist-off" id="results-artist">
        </div>
        <div className="results-artist-name-off" id="results-artist-name">
          <h2>{this.props.resultsName}</h2>
          </div>
        <div id="logo"/>
        <div id="snapshot-name">
          <h2>{this.state.previousRelatedArtist}</h2>
        </div>
      </div>
    );
  }
}

function MapStateToProps(state) {
  return state;
}

export default connect(MapStateToProps, {
  relatedArtist1Chosen,
  relatedArtist1Unchosen,
  getFollowers,
  getGenres,
  getPopularity,
  getBackgrounds,
  getRelatedArtistIds,
  getNames,
  getLink
})(Data);
