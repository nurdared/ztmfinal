import React, { Component } from "react"
import "./App.css"
import Navigation from "./components/Navigation/Navigation"
import Logo from "./components/Logo/Logo"
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm"
import FaceRecognition from "./components/FaceRecognition/FaceRecognition"
import SignIn from "./components/SignIn/SignIn"
import Register from "./components/Register/Register"
import Rank from "./components/Rank/Rank"
import Particles from "react-particles-js"

const initialState = {
  input: "",
  imageUrl: "",
  boxes: [],
  route: 'signin',
  isSignedIn: false,
  user: {
    id: "",
    name: "",
    email: "",
    entries: 0,
    joined: ""
  }
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

  onInputChange = (event) => {
    this.setState({ input: event.target.value });
  }

  onPictureSubmit = () => {
    this.setState({ imageUrl: this.state.input })
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

  onRouteChange = (route) => {
    if (route === "home")
      this.setState({ isSignedIn: true })
    else
      this.setState(initialState)
    this.setState({ route })
  }

  loadUser = (data) => {
    this.setState({
      user: {
        id: data.id,
        name: data.name,
        email: data.email,
        entries: data.entries,
        joined: data.joined
      }
    })
  }

  updateUserEntry() {
    fetch('https://serene-anchorage-51042.herokuapp.com/image', {
      method: 'put',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id: this.state.user.id
      })
    }).then(response => response.json())
      .then(count => this.setState(Object.assign(this.state.user, { entries: count })))
      .catch(console.log);
  }

  render() {
    const { boxes, imageUrl, route, isSignedIn } = this.state;
    return (
      <div className="App">
        <Particles params={particleOptions} className="particles" />
        <div
          style={{ display: "flex", justifyContent: "space-between" }}
          className="logo-nav"
        >
          <Logo />
          <Navigation onRouteChange={this.onRouteChange} isSignedIn={isSignedIn} />
        </div>
        {
          route === 'home'
            ? <>
              <Rank className="rank" name={this.state.user.name} entries={this.state.user.entries} />
              <ImageLinkForm
                className="link-form"
                onInputChange={this.onInputChange}
                onPictureSubmit={this.onPictureSubmit}
              />
              <FaceRecognition imageUrl={imageUrl} boxes={boxes} />
            </>
            : (route === 'signin')
              ? <SignIn onRouteChange={this.onRouteChange} loadUser={this.loadUser} />
              : <Register onRouteChange={this.onRouteChange} loadUser={this.loadUser} />
        }
      </div>
    )
  }
}

export default App;