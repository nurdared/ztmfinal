import React, { Component } from "react"
import "./App.css"
import Navigation from "../components/Navigation/Navigation"
import Logo from "../components/Logo/Logo"
import ImageLinkForm from "../components/ImageLinkForm/ImageLinkForm"
import FaceRecognition from "../components/FaceRecognition/FaceRecognition"
import SignIn from "../components/SignIn/SignIn"
import Register from "../components/Register/Register"
import Profile from '../components/Profile/Profile'
import Rank from "../components/Rank/Rank"
import Particles from "react-particles-js"
import { connect } from 'react-redux';
import { setUserInfo, setInputUrl } from '../actions';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

const mapStatetoProps = state => ({
  user: state.setBaseState.user,
  input: state.setBaseState.input,
})

const mapDispatchToProps = dispatch => ({
  loadUser: (data) => dispatch(setUserInfo(data)),
  onInputChange: event => { dispatch(setInputUrl(event.target.value)) }
})

const initialState = {
  imageUrl: "",
  boxes: [],
  isSignedIn: false
}

const particleOptions = {
  particles: {
    number: {
      value: 150,
    },
    size: {
      value: 3,
    },
  },
  interactivity: {
    events: {
      onhover: {
        enable: true,
        mode: "repulse",
      },
    },
  },
}

class App extends Component {
  constructor() {
    super();
    this.state = initialState;
  }

  calculateFaceLocation = (data) => {
    const clarifaiBoxes = data.outputs[0].data.regions;
    const image = document.getElementById("detectImage");
    const width = Number(image.width);
    const height = Number(image.height);
    return clarifaiBoxes.map(box => {
      const { top_row, left_col, bottom_row, right_col } = box.region_info.bounding_box;
      const person = box.data.concepts[0];
      return {
        topRow: height * top_row,
        leftCol: width * left_col,
        bottomRow: height - (height * bottom_row),
        rightCol: width - (width * right_col),
        person: person
      }
    })
  }

  displayDetectionBox = (boxes) => {
    this.setState({ boxes: boxes })
  }

  onPictureSubmit = () => {
    this.setState({ imageUrl: this.props.input })
    fetch('https://serene-anchorage-51042.herokuapp.com/imageurl', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        input: this.state.input
      })
    })
      .then(response => response.json())
      .then(data => {
        if (data)
          this.updateUserEntry()
        this.displayDetectionBox(this.calculateFaceLocation(data))
      })
      .catch(err => console.log(err));
  }

  onLoginChange = () => {
    if (this.state.isSignedIn)
      this.setState(initialState)
    else
      this.setState({ isSignedIn: true })
  }

  updateUserEntry() {
    fetch('https://serene-anchorage-51042.herokuapp.com/image', {
      method: 'put',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id: this.props.user.id
      })
    }).then(response => response.json())
      .then(count => this.setState(Object.assign(this.props.user, { entries: count })))
      .catch(console.log);
  }

  render() {
    const { boxes, imageUrl, isSignedIn } = this.state;
    return (
      <div className="App">
        <Router>


          <Particles params={particleOptions} className="particles" />
          <div
            style={{ display: "flex", justifyContent: "space-between" }}
            className="logo-nav"
          >
            <Logo />
            <Navigation onLoginChange={this.onLoginChange} isSignedIn={isSignedIn} user={this.props.user} />
          </div>

          {
            (this.state.isSignedIn)
              ?
              <Switch>
                <Route path="/profile/:userId">
                  <Profile user={this.props.user} />
                </Route>
                <Route path="/">
                  <Rank className="rank" name={this.props.user.name} entries={this.props.user.entries} />
                  <ImageLinkForm
                    className="link-form"
                    onInputChange={this.props.onInputChange}
                    onPictureSubmit={this.onPictureSubmit}
                  />
                  <FaceRecognition imageUrl={imageUrl} boxes={boxes} />
                </Route>
              </Switch>
              :
              <Switch>
                <Route path="/register">
                  <Register onLoginChange={this.onLoginChange} loadUser={this.props.loadUser} />
                </Route>
                <Route path="/">
                  <SignIn onLoginChange={this.onLoginChange} loadUser={this.props.loadUser} />
                </Route>
              </Switch>
          }


        </Router>
      </div>
    )
  }
}

export default connect(mapStatetoProps, mapDispatchToProps)(App);