import React, { Component } from 'react';
import './App.css';
import Navigation from './Components/Navigation/Navigation';
import Logo from './Components/Logo/Logo';
import ImageLinkForm from './Components/ImageLinkForm/ImageLinkForm';
import Rank from './Components/Rank/Rank';
import Particles from 'react-particles-js';
import FaceRecognition from './Components/FaceRecognition/FaceRecognition';
import SignIn from './Components/SignIn/SignIn';
import Register from './Components/Register/Register';
import { FaGithub,FaLinkedin } from "react-icons/fa";


const ParticleOptions = {
  particles: {
    number: {
      value: 100,
      density: {
        enable: true,
        value_area: 800
      }
    }
  }
}

const initialState = {
  Input: '',
  imgurl: '',
  box: [],
  route: 'SignIn',
  isSignedIn: false,
  user: {
      id: '',
      username: '',
      email: '',
      password: '',
      entries: 0,
      joined: ''
  }
}

class App extends Component {
  constructor() {
    super()
    this.state = initialState;
  }
  componentDidMount() {
    fetch('http://localhost:3000/')
    .then(response=>response.json())
    .then(console.log)
  }

  calculateFaceLocation = (data,i) => {
    const clarifaiData = data.outputs[0].data.regions[i].region_info.bounding_box;
    const photo = document.getElementById('imageid');
    const width = Number(photo.width);
    const height = Number(photo.height);
    return {
      leftCol: clarifaiData.left_col * width,
      topRow: clarifaiData.top_row * height,
      rightCol: width - (clarifaiData.right_col * width),
      bottomRow: height - (clarifaiData.bottom_row * height)
    }

  }
  loadUser = (data) => {
    this.setState({
      user: {
          id: data.id,
          username: data.username,
          email: data.email,
          password: data.password,
          entries: data.entries,
          joined: data.joined
        }
    })
  }

  displayFaceBox = (box) => {
    this.setState({
      box: [...this.state.box, box]
    });
  }

  onInputChange = (event) => {
    this.setState({Input: event.target.value})
  }

  onSubmit = (event) => {
    this.setState({imgurl: this.state.Input})
    fetch('http://localhost:3000/imageurl', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        Input: this.state.Input
      })
    }) 
    .then(response => response.json())
    .then(response =>{
      if(response) {
        fetch('http://localhost:3000/image',{
          method: 'put',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
              id: this.state.user.id
        })
      })
      .then(response=> response.json())
      .then(count => {
        this.setState(Object.assign(this.state.user, {entries: count}))
      })
      .catch(console.log);
    }
      for(let i = 0; i < response.outputs[0].data.regions.length; i++){
        this.displayFaceBox(this.calculateFaceLocation(response, i))
      }
    })
    .catch(err => console.log(err));
  }

  onRouteChange = (route) => {
    if (route === 'signout'){
      this.setState(initialState)
    } else if(route === 'home'){
      this.setState({isSignedIn: true})
    }
    this.setState({route: route})
  }

  render() {
    const {isSignedIn, route, box, imgurl} = this.state;
    return (
      <div className="App">
        <Particles className="particle"
              params={ParticleOptions}
        />
        <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange}/>
        {route === 'SignIn'
        ? <SignIn loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
        :(route === 'home'
        ? <div>
            <Logo />
            <Rank username={this.state.user.username} entries={this.state.user.entries}/>
            <ImageLinkForm onInputChange={this.onInputChange} onSubmit={this.onSubmit}/>
            <FaceRecognition box={box} imgurl={imgurl}/>
            <div>
              <p>Created by
              <a href="https://github.com/suyash-patil" target="_blank" rel="noopener noreferrer"> <FaGithub className="icons"/> suyash-patil</a>
              </p>
              <p><a href="https://linkedin.com/in/suyash-patil" target="_blank" rel="noopener noreferrer"> <FaLinkedin className="icons"/> Suyash Patil</a></p>
            </div>
          </div>
        : <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>)
        }
      </div>
    )
  }
}

export default App;
