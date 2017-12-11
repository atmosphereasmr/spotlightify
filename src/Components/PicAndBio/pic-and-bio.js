import React, { Component } from "react";
import "./pic-and-bio.css";
import axios from "axios";
import {connect} from 'react-redux'
import {isChosen, isUnchosen, unselectAll, getFollowers, getGenres, getPopularity, getBackgrounds, getNames, getRelatedArtistIds, getAccessToken, getLink} from '../../reducer'

document.body.style.width = '1200px';

class PicAndBio extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      selected: "none",
      chosen: false,
      followers: '',
      genres: '',
      popularity: 0,
      link: '',
      backgroundOne: '',
      backgroundTwo: '',
      backgroundThree: '',
      nameOne: '',
      nameTwo: '',
      nameThree: '',
      access_token: '',
      relatedArtistId: '',
      relatedArtist2Id: '',
      relatedArtist3Id: '',
      link1: '',
      link2: '',
      link3: ''
    };
    this.artistTextOff = this.artistTextOff.bind(this);
    this.scroller = this.scroller.bind(this)
    this.artistSearchDrake = this.artistSearchDrake.bind(this);
    this.listenCircleLogic = this.listenCircleLogic.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.resultsBackground != nextProps.resultsBackground) {
        const resultsArtist = document.getElementById('results-artist')
       resultsArtist.style = `background-image: url("${nextProps.resultsBackground}")`
    }
  }

  componentDidMount() {
    const navBar = document.getElementById('navbar')
    navBar.style = "top: -50px"
    this.scroller();
    axios.get('http://localhost:8888/grab-access', {withCredentials: true})
    .then( res => {
      console.log(res)
      this.setState({access_token: res.data.access_token}, () =>
    this.props.getAccessToken({access_token: this.state.access_token}))
    })
  }

  scroller = () => {
    window.onscroll = () => {
      const rihannaPic = document.getElementById("rihanna-pic");
      const eminemPic = document.getElementById("eminem-pic");
      const ladyGagaPic = document.getElementById("lady-gaga-pic");
      const drakePic = document.getElementById("drake-pic");
      const marilynPic = document.getElementById("marilyn-pic");

      if (
        document.body.scrollTop > 50 ||
        (document.documentElement.scrollTop > 50 &&
          this.state.selected !== "none")
      ) {
        rihannaPic.className = "rihanna-pic";
      } else {
        rihannaPic.className = "rihanna-pic";
      }
      if (
        document.body.scrollTop > 50 ||
        (document.documentElement.scrollTop > 50 &&
          this.state.selected !== "none")
      ) {
        eminemPic.className = "eminem-pic";
      } else {
        eminemPic.className = "eminem-pic";
      }
      if (
        document.body.scrollTop > 50 ||
        (document.documentElement.scrollTop > 50 &&
          this.state.selected !== "none")
      ) {
        ladyGagaPic.className = "lady-gaga-pic";
      } else {
        ladyGagaPic.className = "lady-gaga-pic";
      }
      if (
        document.body.scrollTop > 50 ||
        (document.documentElement.scrollTop > 50 &&
          this.state.selected !== "none")
      ) {
        drakePic.className = "drake-pic=hide";
      } else {
        drakePic.className = "drake-pic";
      }
      if (this.state.selected === "Drake") {
        drakePic.className = "drake-pic-selected";
      }
      if (
        document.body.scrollTop > 50 ||
        (document.documentElement.scrollTop > 50 &&
          this.state.selected !== "none")
      ) {
        marilynPic.className = "marilyn-pic-hide";
      } else {
        marilynPic.className = "marilyn-pic";
      }
      if (
        document.body.scrollTop > 20 ||
        document.documentElement.scrollTop > 20
      ) {
        document.getElementById("navbar").style.top = "0px";
      } else {
        document.getElementById("navbar").style.top = "-50px";
      }
    }
  }

  artistTextOn(e) {

    const eminemName = document.getElementById("eminem-id-name");
    const ladyGagaName = document.getElementById("lady-gaga-name");
    const drakeName = document.getElementById("drake-name");
    const marilynName = document.getElementById("marilyn-name");
    const rihannaName = document.getElementById("rihanna-name")
    const drakeBall = document.getElementById('drake-ball')
    const marilynBall = document.getElementById('marilyn-ball')
    const drakePic = document.getElementById('drake-pic')
    const ladyGagaBall = document.getElementById('lady-gaga-ball')

    if (e === "Marilyn Manson") {
      marilynName.className = "artist-text-on"
      drakeName.className = "artist-text-off"
      ladyGagaName.className = "artist-text-off"
      eminemName.className = "artist-text-off"
      rihannaName.className = "artist-text-off"
      marilynBall.className = "marilyn-add-ball-on"
    } else {
      marilynName.className = "artist-text-off"
    }

    if (e === "Drake" && this.state.selected !== "Drake") {
      drakeName.className = "artist-text-on"
      marilynName.className = "artist-text-off"
      ladyGagaName.className = "artist-text-off"
      eminemName.className = "artist-text-off"
      rihannaName.className = "artist-text-off"
      drakeBall.className = "drake-add-ball-on"
    }

    if (e === "Lady Gaga") {
      ladyGagaName.className = "artist-text-on"
      marilynName.className = "artist-text-off"
      drakeName.className = "artist-text-off"
      eminemName.className = "artist-text-off"
      rihannaName.className = "artist-text-off"
      ladyGagaBall.className = "lady-gaga-add-ball-on"
    } else {
      ladyGagaName.className = "artist-text-off"
    }

    if (e === "Eminem") {
      eminemName.className = "artist-text-on"
      drakeName.className = "artist-text-off"
      marilynName.className = "artist-text-off"
      ladyGagaName.className = "artist-text-off"
      rihannaName.className = "artist-text-off"
    } else {
      eminemName.className = "artist-text-off"
    }

    if (e === "Rihanna") {
      rihannaName.className = "artist-text-on"
      drakeName.className = "artist-text-off"
      marilynName.className = "artist-text-off"
      ladyGagaName.className = "artist-text-off"
      eminemName.className = "artist-text-off"
    } else {
      rihannaName.className = "artist-text-off"
    }
    if (e === "Drake Ball") {
      drakeName.className = "artist-text-on"
      marilynName.className = "artist-text-off"
      ladyGagaName.className = "artist-text-off"
      eminemName.className = "artist-text-off"
      rihannaName.className = "artist-text-off"
      drakeBall.className = "drake-add-ball-on"
    } else if (e === "Drake") {
      drakeBall.className = "drake-add-ball-on"
    }
    if (e === "Marilyn Ball") {
      drakeName.className = "artist-text-off"
      marilynName.className = "artist-text-on"
      ladyGagaName.className = "artist-text-off"
      eminemName.className = "artist-text-off"
      rihannaName.className = "artist-text-off"
      marilynBall.className = "marilyn-add-ball-on"
    } else if (e === "Marilyn") {
      marilynBall.className = "marilyn-add-ball-on"
    }
    if (e === "Lady Gaga Ball") {
      drakeName.className = "artist-text-off"
      marilynName.className = "artist-text-off"
      ladyGagaName.className = "artist-text-on"
      eminemName.className = "artist-text-off"
      rihannaName.className = "artist-text-off"
      ladyGagaBall.className = "lady-gaga-add-ball-on"
    } else if (e === "Lady Gaga Ball") {
      ladyGagaBall.className = "lady-gaga-add-ball-on"
    }
    }

  artistTextOff(e) {

    const drakeName = document.getElementById("drake-name");
    const marilynName = document.getElementById("marilyn-name");
    const ladyGagaName = document.getElementById("lady-gaga-name");
    const eminemName = document.getElementById("eminem-id-name");
    const rihannaName = document.getElementById("rihanna-name")
    const drakeBall = document.getElementById('drake-ball')
    const marilynBall = document.getElementById('marilyn-ball')
    const ladyGagaBall = document.getElementById('lady-gaga-ball')

    if (this.state.selected === "Drake") {
      drakeName.className = "artist-text-selected";
    } else {
      drakeName.className = "artist-text-off";
      drakeBall.className = "drake-add-ball-off"
    }
    if (this.state.selected === "Marilyn") {
      marilynName.className = "artist-text-selected";
    } else {
      marilynName.className = "artist-text-off";
      marilynBall.className = "marilyn-add-ball-off"
    }
    if (this.state.selected === "Lady Gaga") {
      ladyGagaName.className = "artist-text-selected"
    } else {
      ladyGagaName.className = "artist-text-off"
      ladyGagaBall.className = "lady-gaga-add-ball-off"
    }
    if (this.state.selected === "Eminem") {
      eminemName.className = "artist-text-selected"
    } else {
      eminemName.className = "artist-text-off"
    }
    if (this.state.selected === "Rihanna") {
      rihannaName.className = "artist-text-selected"
    } else {
      rihannaName.className = "artist-text-off"
    }
    if (e === "Drake Ball") {
      drakeBall.className = "drake-add-ball-off"
    }
    if (e === "Marilyn Ball") {
      marilynBall.className = "marilyn-add-ball-off"
    }
  }

  goBackClick = () => {

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

    this.setState({ selected: "none" });

    const rihannaPic = document.getElementById("rihanna-pic");
    const rihannaName = document.getElementById("rihanna-name")
    const eminemPic = document.getElementById("eminem-pic");
    const ladyGagaPic = document.getElementById("lady-gaga-pic");
    const ladyGagaName = document.getElementById('lady-gaga-name')
    const drakePic = document.getElementById("drake-pic");
    const marilynPic = document.getElementById("marilyn-pic");
    const drakeName = document.getElementById("drake-name");
    const marilynName = document.getElementById("marilyn-name");
    const eminemName = document.getElementById('eminem-id-name')
    const listenCircle = document.getElementById('listen-circle')
    const dataCircleFour = document.getElementById('data-circle-4')
    const dataCircleFive = document.getElementById('data-circle-5')
    const dataCircleSix = document.getElementById('data-circle-6')
    const snapshotArtist1 = document.getElementById('logo')
    const snapshotArtistName1 = document.getElementById('snapshot-name')
    const resultsArtist = document.getElementById('results-artist')
    const resultsArtistName = document.getElementById('results-artist-name')

    rihannaName.className = "artist-text-off"
    rihannaPic.className = "rihanna-pic-return";
    marilynName.className = "artist-text-off"
    marilynPic.className = "marilyn-pic-return";
    eminemPic.className = "eminem-pic-return";
    eminemName.className = "artist-text-off"
    drakePic.className = "drake-pic-return";
    ladyGagaPic.className = "lady-gaga-pic-return";
    drakeName.className = "artist-text-off";
    ladyGagaName.className = "artist-text-off"
    listenCircle.className = "listen-circle-off"
    dataCircleFour.className = "data-circle-4-off"
    dataCircleFive.className = "data-circle-5-off"
    dataCircleSix.className = "data-circle-6-off"
    snapshotArtist1.className = "snapshot-artist-1-off"
    snapshotArtistName1.className = "snapshot-artist-1-off"
    resultsArtist.className = "results-artist-off"
    resultsArtistName.className = "results-artist-name-off"


  };

  artistSearchMarilynManson = () => {

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

    this.setState({ selected: "Marilyn" });

    const rihannaPic = document.getElementById("rihanna-pic");
    const eminemPic = document.getElementById("eminem-pic");
    const ladyGagaPic = document.getElementById("lady-gaga-pic");
    const marilynPic = document.getElementById("marilyn-pic");
    const marilynName = document.getElementById("marilyn-name");
    const goBack = document.getElementById("go-back");
    const drakePic = document.getElementById("drake-pic")
    const listenCircle = document.getElementById('listen-circle')

    marilynPic.className = "marilyn-pic-selected";
    goBack.className = "go-back-on";
    marilynName.className = "artist-text-selected";
    listenCircle.className = "listen-circle-on"

    if (this.state.selected !== "Marilyn") {
      drakePic.className = "drake-pic-fade";
    } else {
      drakePic.className = "hide-pic";
    }
    if (this.state.selected !== "Marilyn") {
      eminemPic.className = "eminem-pic-fade";
    } else {
      eminemPic.className = "hide-pic";
    }
    if (this.state.selected !== "Marilyn") {
      ladyGagaPic.className = "lady-gaga-pic-fade";
    } else {
      ladyGagaPic.className = "hide-pic";
    }
    if (this.state.selected !== "Marilyn") {
      rihannaPic.className = "rihanna-pic-fade";
    } else {
      rihannaPic.className = "hide-pic";
    }

        this.setState({link: '2VYQTNDsvvKN9wmU5W7xpj'})

        axios.get('	https://api.spotify.com/v1/artists/2VYQTNDsvvKN9wmU5W7xpj/related-artists', {headers: {Authorization: `Bearer ${this.state.access_token}`}})
          .then(res => {
            this.setState({backgroundOne: res.data.artists[0].images[0], backgroundTwo: res.data.artists[1].images[1], backgroundThree: res.data.artists[2].images[2]},
            () => this.props.getBackgrounds(this.state.backgroundOne, this.state.backgroundTwo, this.state.backgroundThree))
            this.setState({relatedArtist1Id: res.data.artists[0].id, relatedArtist2Id: res.data.artists[1].id, relatedArtist3Id: res.data.artists[2].id},
               () => this.props.getRelatedArtistIds(this.state.relatedArtist1Id, this.state.relatedArtist2Id, this.state.relatedArtist3Id))
               this.setState({link1: res.data.artists[0].id, link2: res.data.artists[1].id, link3: res.data.artists[2].id},
                  () => this.props.getLink(this.state.link1, this.state.link2, this.state.link3))
            console.log(res)
            const backgroundFirst = document.getElementById("data-circle-4")
            const backgroundSecond = document.getElementById("data-circle-5")
            const backgroundThird = document.getElementById("data-circle-6")
            backgroundFirst.style = `background-image: url("${this.props.backgroundOne.url}")`
            backgroundFirst.className = "data-circle-4-on"
            backgroundSecond.style = `background-image: url("${this.props.backgroundTwo.url}")`
            backgroundSecond.className = "data-circle-5-on"
            backgroundThird.style = `background-image: url("${this.props.backgroundThree.url}")`
            backgroundThird.className = "data-circle-6-on"
          })

          axios.get('	https://api.spotify.com/v1/artists/2VYQTNDsvvKN9wmU5W7xpj/related-artists', {headers: {Authorization: `Bearer ${this.state.access_token}`}})
            .then(res => {
              this.setState({nameOne: res.data.artists[0].name, nameTwo: res.data.artists[1].name, nameThree: res.data.artists[2].name},
              () => this.props.getNames(this.state.nameOne, this.state.nameTwo, this.state.nameThree))
            })

    axios
      .get("https://api.spotify.com/v1/artists/2VYQTNDsvvKN9wmU5W7xpj", {headers: {Authorization: `Bearer ${this.state.access_token}`}})
      .then(res => {
        console.log(res.data.followers.total)
        this.setState({followers: res.data.followers.total},
        () => this.props.getFollowers(this.state.followers))
      })

      axios
        .get("https://api.spotify.com/v1/artists/2VYQTNDsvvKN9wmU5W7xpj", {headers: {Authorization: `Bearer ${this.state.access_token}`}})
        .then(res => {
          console.log(res.data.genres)
          this.setState({genres: res.data.genres},
          () => this.props.getGenres(this.state.genres))
        })

    axios
      .get("https://api.spotify.com/v1/artists/2VYQTNDsvvKN9wmU5W7xpj", {headers: {Authorization: `Bearer ${this.state.access_token}`}})
      .then(res => {
        console.log(res.data.popularity)
        this.setState({popularity: res.data.popularity},
        () => this.props.getPopularity(this.state.popularity))
      })
  }

  artistSearchRihanna = () => {

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

    const rihannaPic = document.getElementById("rihanna-pic");
    const rihannaName = document.getElementById("rihanna-name")
    const eminemPic = document.getElementById("eminem-pic");
    const ladyGagaPic = document.getElementById("lady-gaga-pic");
    const ladyGagaName = document.getElementById('lady-gaga-name')
    const marilynPic = document.getElementById("marilyn-pic");
    const marilynName = document.getElementById("marilyn-name");
    const goBack = document.getElementById("go-back");
    const drakePic = document.getElementById("drake-pic")
    const eminemName = document.getElementById("eminem-id-name")
    const listenCircle = document.getElementById('listen-circle')

    rihannaPic.className = "rihanna-pic-selected";
    goBack.className = "go-back-on";
    rihannaName.className = "artist-text-selected";
    listenCircle.className = "listen-circle-on"

    if (this.state.selected === "Rihanna") {
      drakePic.className = "drake-pic-fade";
      marilynPic.className = "marilyn-pic-fade"
      ladyGagaPic.className = "lady-gaga-pic-fade"
      eminemPic.className = "eminem-pic-fade"
  }

        this.setState({link: '5pKCCKE2ajJHZ9KAiaK11H'})

        axios.get('	https://api.spotify.com/v1/artists/5pKCCKE2ajJHZ9KAiaK11H/related-artists', {headers: {Authorization: `Bearer ${this.state.access_token}`}})
          .then(res => {
            this.setState({backgroundOne: res.data.artists[0].images[0], backgroundTwo: res.data.artists[1].images[1], backgroundThree: res.data.artists[2].images[2]},
            () => this.props.getBackgrounds(this.state.backgroundOne, this.state.backgroundTwo, this.state.backgroundThree))
            this.setState({relatedArtist1Id: res.data.artists[0].id, relatedArtist2Id: res.data.artists[1].id, relatedArtist3Id: res.data.artists[2].id},
               () => this.props.getRelatedArtistIds(this.state.relatedArtist1Id, this.state.relatedArtist2Id, this.state.relatedArtist3Id))
               this.setState({link1: res.data.artists[0].id, link2: res.data.artists[1].id, link3: res.data.artists[2].id},
                  () => this.props.getLink(this.state.link1, this.state.link2, this.state.link3))
            console.log(this.props.backgroundOne.url)
            const backgroundFirst = document.getElementById("data-circle-4")
            const backgroundSecond = document.getElementById("data-circle-5")
            const backgroundThird = document.getElementById("data-circle-6")
            backgroundFirst.style = `background-image: url("${this.props.backgroundOne.url}")`
            backgroundFirst.className = "data-circle-4-on"
            backgroundSecond.style = `background-image: url("${this.props.backgroundTwo.url}")`
            backgroundSecond.className = "data-circle-5-on"
            backgroundThird.style = `background-image: url("${this.props.backgroundThree.url}")`
            backgroundThird.className = "data-circle-6-on"
          })

          axios.get('	https://api.spotify.com/v1/artists/5pKCCKE2ajJHZ9KAiaK11H/related-artists', {headers: {Authorization: `Bearer ${this.state.access_token}`}})
            .then(res => {
              this.setState({nameOne: res.data.artists[0].name, nameTwo: res.data.artists[1].name, nameThree: res.data.artists[2].name},
              () => this.props.getNames(this.state.nameOne, this.state.nameTwo, this.state.nameThree))
            })

  axios
    .get("https://api.spotify.com/v1/artists/5pKCCKE2ajJHZ9KAiaK11H", {headers: {Authorization: `Bearer ${this.state.access_token}`}})
    .then(res => {
      console.log(res.data.followers.total)
      this.setState({followers: res.data.followers.total},
      () => this.props.getFollowers(this.state.followers))
    })

    axios
      .get("https://api.spotify.com/v1/artists/5pKCCKE2ajJHZ9KAiaK11H", {headers: {Authorization: `Bearer ${this.state.access_token}`}})
      .then(res => {
        console.log(res.data.genres)
        this.setState({genres: res.data.genres},
        () => this.props.getGenres(this.state.genres))
      })

  axios
    .get("https://api.spotify.com/v1/artists/5pKCCKE2ajJHZ9KAiaK11H", {headers: {Authorization: `Bearer ${this.state.access_token}`}})
    .then(res => {
      console.log(res.data.popularity)
      this.setState({popularity: res.data.popularity},
      () => this.props.getPopularity(this.state.popularity))
    })
}

  artistSearchEminem = () => {

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

    eminemPic.className = "eminem-pic-selected";
    goBack.className = "go-back-on";
    eminemName.className = "artist-text-selected";
    listenCircle.className = "listen-circle-on"

    if (this.state.selected === "Eminem") {
      drakePic.className = "drake-pic-fade";
      marilynPic.className = "marilyn-pic-fade"
      ladyGagaPic.className = "lady-gaga-pic-fade"
      rihannaPic.className = "rihanna-pic-fade"
  }

      this.setState({link: '7dGJo4pcD2V6oG8kP0tJRR'})

      axios.get('	https://api.spotify.com/v1/artists/7dGJo4pcD2V6oG8kP0tJRR/related-artists', {headers: {Authorization: `Bearer ${this.state.access_token}`}})
        .then(res => {
          this.setState({backgroundOne: res.data.artists[0].images[0], backgroundTwo: res.data.artists[1].images[1], backgroundThree: res.data.artists[2].images[2]},
          () => this.props.getBackgrounds(this.state.backgroundOne, this.state.backgroundTwo, this.state.backgroundThree))
          this.setState({relatedArtist1Id: res.data.artists[0].id, relatedArtist2Id: res.data.artists[1].id, relatedArtist3Id: res.data.artists[2].id},
             () => this.props.getRelatedArtistIds(this.state.relatedArtist1Id, this.state.relatedArtist2Id, this.state.relatedArtist3Id))
             this.setState({link1: res.data.artists[0].id, link2: res.data.artists[1].id, link3: res.data.artists[2].id},
                () => this.props.getLink(this.state.link1, this.state.link2, this.state.link3))
          console.log(this.props.backgroundOne.url)
          const backgroundFirst = document.getElementById("data-circle-4")
          const backgroundSecond = document.getElementById("data-circle-5")
          const backgroundThird = document.getElementById("data-circle-6")
          backgroundFirst.style = `background-image: url("${this.props.backgroundOne.url}")`
          backgroundFirst.className = "data-circle-4-on"
          backgroundSecond.style = `background-image: url("${this.props.backgroundTwo.url}")`
          backgroundSecond.className = "data-circle-5-on"
          backgroundThird.style = `background-image: url("${this.props.backgroundThree.url}")`
          backgroundThird.className = "data-circle-6-on"
        })

        axios.get('	https://api.spotify.com/v1/artists/7dGJo4pcD2V6oG8kP0tJRR/related-artists', {headers: {Authorization: `Bearer ${this.state.access_token}`}})
          .then(res => {
            this.setState({nameOne: res.data.artists[0].name, nameTwo: res.data.artists[1].name, nameThree: res.data.artists[2].name},
            () => this.props.getNames(this.state.nameOne, this.state.nameTwo, this.state.nameThree))
          })

  axios
    .get("https://api.spotify.com/v1/artists/7dGJo4pcD2V6oG8kP0tJRR", {headers: {Authorization: `Bearer ${this.state.access_token}`}})
    .then(res => {
      console.log(res.data.followers.total)
      this.setState({followers: res.data.followers.total},
      () => this.props.getFollowers(this.state.followers))
    })

    axios
      .get("https://api.spotify.com/v1/artists/7dGJo4pcD2V6oG8kP0tJRR", {headers: {Authorization: `Bearer ${this.state.access_token}`}})
      .then(res => {
        console.log(res.data.genres)
        this.setState({genres: res.data.genres},
        () => this.props.getGenres(this.state.genres))
      })

  axios
    .get("https://api.spotify.com/v1/artists/7dGJo4pcD2V6oG8kP0tJRR", {headers: {Authorization: `Bearer ${this.state.access_token}`}})
    .then(res => {
      console.log(res.data.popularity)
      this.setState({popularity: res.data.popularity},
      () => this.props.getPopularity(this.state.popularity))
    })
}

  artistSearchLadyGaga = () => {

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

    const rihannaPic = document.getElementById("rihanna-pic");
    const eminemPic = document.getElementById("eminem-pic");
    const ladyGagaPic = document.getElementById("lady-gaga-pic");
    const ladyGagaName = document.getElementById('lady-gaga-name')
    const marilynPic = document.getElementById("marilyn-pic");
    const marilynName = document.getElementById("marilyn-name");
    const goBack = document.getElementById("go-back");
    const drakePic = document.getElementById("drake-pic")
    const listenCircle = document.getElementById('listen-circle')


    ladyGagaPic.className = "lady-gaga-pic-selected";
    goBack.className = "go-back-on";
    ladyGagaName.className = "artist-text-selected";
    listenCircle.className = "listen-circle-on"

    if (this.state.selected === "Lady Gaga") {
      drakePic.className = "drake-pic-fade";
      marilynPic.className = "marilyn-pic-fade"
      eminemPic.className = "eminem-pic-fade"
      rihannaPic.className = "rihanna-pic-fade"
  }

    this.setState({link: '1HY2Jd0NmPuamShAr6KMms'})

    axios.get('	https://api.spotify.com/v1/artists/1HY2Jd0NmPuamShAr6KMms/related-artists', {headers: {Authorization: `Bearer ${this.state.access_token}`}})
      .then(res => {
        this.setState({backgroundOne: res.data.artists[0].images[0], backgroundTwo: res.data.artists[1].images[1], backgroundThree: res.data.artists[2].images[2]},
        () => this.props.getBackgrounds(this.state.backgroundOne, this.state.backgroundTwo, this.state.backgroundThree))
        this.setState({relatedArtist1Id: res.data.artists[0].id, relatedArtist2Id: res.data.artists[1].id, relatedArtist3Id: res.data.artists[2].id},
           () => this.props.getRelatedArtistIds(this.state.relatedArtist1Id, this.state.relatedArtist2Id, this.state.relatedArtist3Id))
           this.setState({link1: res.data.artists[0].id, link2: res.data.artists[1].id, link3: res.data.artists[2].id},
              () => this.props.getLink(this.state.link1, this.state.link2, this.state.link3))
        console.log(this.props.backgroundOne.url)
        const backgroundFirst = document.getElementById("data-circle-4")
        const backgroundSecond = document.getElementById("data-circle-5")
        const backgroundThird = document.getElementById("data-circle-6")
        backgroundFirst.style = `background-image: url("${this.props.backgroundOne.url}")`
        backgroundFirst.className = "data-circle-4-on"
        backgroundSecond.style = `background-image: url("${this.props.backgroundTwo.url}")`
        backgroundSecond.className = "data-circle-5-on"
        backgroundThird.style = `background-image: url("${this.props.backgroundThree.url}")`
        backgroundThird.className = "data-circle-6-on"
      })

      axios.get('	https://api.spotify.com/v1/artists/1HY2Jd0NmPuamShAr6KMms/related-artists', {headers: {Authorization: `Bearer ${this.state.access_token}`}})
        .then(res => {
          this.setState({nameOne: res.data.artists[0].name, nameTwo: res.data.artists[1].name, nameThree: res.data.artists[2].name},
          () => this.props.getNames(this.state.nameOne, this.state.nameTwo, this.state.nameThree))
        })

  axios.get("https://api.spotify.com/v1/artists/1HY2Jd0NmPuamShAr6KMms", { headers: {Authorization: `Bearer ${this.state.access_token}`}})
    .then(res => {
      this.setState({followers: res.data.followers.total},
      () => this.props.getFollowers(this.state.followers))
    })

    axios
      .get("https://api.spotify.com/v1/artists/1HY2Jd0NmPuamShAr6KMms", { headers: {Authorization: `Bearer ${this.state.access_token}`}})
      .then(res => {
        this.setState({genres: res.data.genres},
        () => this.props.getGenres(this.state.genres))
      })

  axios
    .get("https://api.spotify.com/v1/artists/1HY2Jd0NmPuamShAr6KMms", { headers: {Authorization: `Bearer ${this.state.access_token}`}})
    .then(res => {
      this.setState({popularity: res.data.popularity},
      () => this.props.getPopularity(this.state.popularity))
    })
}


  artistSearchDrake = () => {

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

    const rihannaPic = document.getElementById("rihanna-pic");
    const eminemPic = document.getElementById("eminem-pic");
    const ladyGagaPic = document.getElementById("lady-gaga-pic");
    const drakePic = document.getElementById("drake-pic");
    const marilynPic = document.getElementById("marilyn-pic");
    const drakeName = document.getElementById("drake-name");
    const goBack = document.getElementById("go-back");
    const listenCircle = document.getElementById("listen-circle");

    drakePic.className = "drake-pic-selected";
    goBack.className = "go-back-on";
    drakeName.className = "artist-text-selected";
    listenCircle.className = "listen-circle-on"

    if (this.state.selected === "Drake") {
      ladyGagaPic.className = "lady-gaga-pic-fade";
      marilynPic.className = "marilyn-pic-fade"
      eminemPic.className = "eminem-pic-fade"
      rihannaPic.className = "rihanna-pic-fade"
  }

  this.setState({link: '3TVXtAsR1Inumwj472S9r4'})

  axios.get('https://api.spotify.com/v1/artists/3TVXtAsR1Inumwj472S9r4/related-artists', {headers: {Authorization: `Bearer ${this.state.access_token}`}})
    .then(res => {
      this.setState({backgroundOne: res.data.artists[0].images[0], backgroundTwo: res.data.artists[1].images[1], backgroundThree: res.data.artists[2].images[2]},
      () => this.props.getBackgrounds(this.state.backgroundOne, this.state.backgroundTwo, this.state.backgroundThree))
      this.setState({relatedArtist1Id: res.data.artists[0].id, relatedArtist2Id: res.data.artists[1].id, relatedArtist3Id: res.data.artists[2].id},
         () => this.props.getRelatedArtistIds(this.state.relatedArtist1Id, this.state.relatedArtist2Id, this.state.relatedArtist3Id))
      this.setState({link1: res.data.artists[0].id, link2: res.data.artists[1].id, link3: res.data.artists[2].id},
         () => this.props.getLink(this.state.link1, this.state.link2, this.state.link3))
      const backgroundFirst = document.getElementById("data-circle-4")
      const backgroundSecond = document.getElementById("data-circle-5")
      const backgroundThird = document.getElementById("data-circle-6")
      backgroundFirst.style = `background-image: url("${this.props.backgroundOne.url}")`
      backgroundFirst.className = "data-circle-4-on"
      backgroundSecond.style = `background-image: url("${this.props.backgroundTwo.url}")`
      backgroundSecond.className = "data-circle-5-on"
      backgroundThird.style = `background-image: url("${this.props.backgroundThree.url}")`
      backgroundThird.className = "data-circle-6-on"
    })

    axios.get('	https://api.spotify.com/v1/artists/3TVXtAsR1Inumwj472S9r4/related-artists', {headers: {Authorization: `Bearer ${this.state.access_token}`}})
      .then(res => {
        this.setState({nameOne: res.data.artists[0].name, nameTwo: res.data.artists[1].name, nameThree: res.data.artists[2].name},
        () => this.props.getNames(this.state.nameOne, this.state.nameTwo, this.state.nameThree))
        console.log(this.props)
      })

        axios.get("https://api.spotify.com/v1/artists/3TVXtAsR1Inumwj472S9r4", {headers: {Authorization: `Bearer ${this.state.access_token}`}})
    .then(res => {
      console.log(res.data.followers.total)
      this.setState({followers: res.data.followers.total},
      () => this.props.getFollowers(this.state.followers))
    })

      axios
        .get("https://api.spotify.com/v1/artists/3TVXtAsR1Inumwj472S9r4", {headers: {Authorization: `Bearer ${this.state.access_token}`}})
        .then(res => {
          console.log(res.data.genres)
          this.setState({genres: res.data.genres},
          () => this.props.getGenres(this.state.genres))
        })

    axios
      .get("https://api.spotify.com/v1/artists/3TVXtAsR1Inumwj472S9r4", {headers: {Authorization: `Bearer ${this.state.access_token}`}})
      .then(res => {
        console.log(res.data.popularity)
        this.setState({popularity: res.data.popularity},
        () => this.props.getPopularity(this.state.popularity))
      })
  }

  isItTrue() {
    if (this.props.chosen === true) {
      const dataCircleOne = document.getElementById("data-circle-1")
      const dataCircleTwo = document.getElementById("data-circle-2")
      const dataCircleThree = document.getElementById("data-circle-3")
      dataCircleOne.className = "data-circle-1-on"
      dataCircleTwo.className = "data-circle-2-on"
      dataCircleThree.className = "data-circle-3-on"
    }
    if (this.props.chosen === false) {
      const dataCircleOne = document.getElementById("data-circle-1")
      const dataCircleTwo = document.getElementById("data-circle-2")
      const dataCircleThree = document.getElementById("data-circle-3")
      dataCircleOne.className = "data-circle-1-off"
      dataCircleTwo.className = "data-circle-2-off"
      dataCircleThree.className = "data-circle-3-off"
    }
  }

  setAllFalse() {
    this.setState({ chosen: false, genres: '', popularity: 0, relatedArtist1Picked: false }, () => {
        this.isItTrue()
        console.log(this.props)
  }, this.props.unselectAll(this.state.chosen, this.state.genres, this.state.popularity, this.state.relatedArtist1Picked))
  }

  listenCircleLogic() {
    var theLink;

    if (this.props.relatedArtist1Picked === true) {
      theLink = this.props.link1
      window.location.href = `https://open.spotify.com/artist/${this.props.link1}`
    } else if (this.props.relatedArtist2Picked === true) {
      theLink = this.props.link2
      window.location.href = `https://open.spotify.com/artist/${this.props.link2}`
    } else if (this.props.relatedArtist3Picked === true) {
      theLink = this.props.link3
      window.location.href = `https://open.spotify.com/artist/${this.props.link3}`
    } else if (this.state.selected === "Drake") {
      window.location.href = `https://open.spotify.com/artist/${this.state.link}`
    } else if (this.state.selected === "Marilyn Manson") {
      window.location.href = `https://open.spotify.com/artist/${this.state.link}`
    } else if (this.state.selected === "Eminem") {
      window.location.href = `https://open.spotify.com/artist/${this.state.link}`
    } else if (this.state.selected === "Lady Gaga") {
      window.location.href = `https://open.spotify.com/artist/${this.state.link}`
    } else if (this.state.selected === "Rihanna") {
      window.location.href = `https://open.spotify.com/artist/${this.state.link}`
  } else {
    window.location.href = `https://open.spotify.com/artist/${this.props.resultsArtistId}`
  }
}

  render() {
    return (
      <div>
      <div
        id="marilyn-pic"
        onMouseEnter={() => {
          this.artistTextOn("Marilyn Manson")}}
        onMouseLeave={() => {
          this.artistTextOff();
        }}
        onClick={() => {
          this.setState({ selected: "Marilyn Manson", chosen: true }, () => {
              this.isItTrue()
              console.log(this.props)
              this.artistSearchMarilynManson();
        }, this.props.isChosen(this.state.chosen))
      }}
      >
        <h4 className="artist-text-off" id="marilyn-name">
          Marilyn Manson
        </h4>
      </div>
        <div
          id="drake-pic"
          onMouseEnter={() => {
            this.artistTextOn("Drake");
          }}
          onMouseLeave={() => {
            this.artistTextOff();
          }}
          onClick={() => {
            this.setState({ selected: "Drake", chosen: true }, () => {
                this.isItTrue()
                console.log(this.props)
                this.artistSearchDrake();
          }, this.props.isChosen(this.state.chosen))
        }}
        >
          <h2 className="artist-text-off" id="drake-name">
            Drake
          </h2>
        </div>
        <div
          id="lady-gaga-pic"
          onMouseEnter={() => {
            this.artistTextOn("Lady Gaga");
          }}
          onMouseLeave={() => {
            this.artistTextOff();
          }}
          onClick={() => {
            this.setState({ selected: "Lady Gaga", chosen: true }, () => {
                this.isItTrue()
                console.log(this.props)
                this.artistSearchLadyGaga();
          }, this.props.isChosen(this.state.chosen))
        }}
        >
          <h2 className="artist-text-off" id="lady-gaga-name">
            Lady Gaga
          </h2>
        </div>
        <div
          id="eminem-pic"
          onMouseEnter={() => {
            this.artistTextOn("Eminem");
          }}
          onMouseLeave={() => {
            this.artistTextOff();
          }}
          onClick={() => {
            this.setState({ selected: "Eminem", chosen: true }, () => {
                this.isItTrue()
                console.log(this.props)
                this.artistSearchEminem();
          }, this.props.isChosen(this.state.chosen))
        }}
        >
          <h2 className="artist-text-off" id="eminem-id-name">
            Eminem
          </h2>
        </div>
        <div
          id="rihanna-pic"
          onMouseEnter={() => {
            this.artistTextOn("Rihanna");
          }}
          onMouseLeave={() => {
            this.artistTextOff();
          }}
          onClick={() => {
            this.setState({ selected: "Rihanna", chosen: true }, () => {
                this.isItTrue()
                console.log(this.props)
                this.artistSearchRihanna();
          }, this.props.isChosen(this.state.chosen))
        }}
        >
          <h2 className="artist-text-off" id="rihanna-name">
            Rihanna
          </h2>
        </div>
        <div
          className="go-back-off"
          id="go-back"
          onClick={() => {
            const goBack = document.getElementById("go-back");
            goBack.className = "go-back-off"
            this.setAllFalse()
            this.props.isUnchosen()
            this.goBackClick()
          }}
        >
          <h3>Go back</h3>
          <h1>{this.state.name}</h1>
        </div>
        <div className="listen-circle-off" id="listen-circle"
        onClick={() => this.listenCircleLogic()}
        >
        <h3>Listen on Spotify</h3>
        </div>
        <div className="marilyn-add-ball-off" id="marilyn-ball"
        onMouseEnter={() => {
          this.artistTextOn("Marilyn Ball");
        }}
        onMouseLeave={() => {
          this.artistTextOff("Marilyn Ball");
        }}
        >
        +
        </div>
        <div className="drake-add-ball-off" id="drake-ball"
        onMouseEnter={() => {
          this.artistTextOn("Drake Ball");
        }}
        onMouseLeave={() => {
          this.artistTextOff("Drake Ball");
        }}
        >
        +
        </div>
        <div className="lady-gaga-add-ball-off" id="lady-gaga-ball"
        onMouseEnter={() => {
          this.artistTextOn("Lady Gaga Ball");
        }}
        onMouseLeave={() => {
          this.artistTextOff("Lady Gaga Ball");
        }}
        >
        +
        </div>
        <div className="eminem-add-ball-on" id="eminem-ball"
        onMouseEnter={() => {
          this.artistTextOn("Eminem Ball");
        }}
        onMouseLeave={() => {
          this.artistTextOff("Eminem Ball");
        }}
        >
        +
        </div>
        <div className="rihanna-add-ball-on" id="rihanna-ball">
        +
        </div>
      </div>
    );
  }
}

function MapStateToProps(state) {
  return(
    state
  )
}

export default connect(MapStateToProps, {isChosen, isUnchosen, unselectAll, getFollowers, getGenres, getPopularity, getBackgrounds, getNames, getRelatedArtistIds, getAccessToken, getLink})(PicAndBio)
