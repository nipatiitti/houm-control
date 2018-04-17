import React, { Component } from 'react'

import io from 'socket.io-client'

import config from './config.json'

import Button from './components/Button'

class App extends Component {

  constructor(props) {
    super(props)

    this.state = {
        lightOn: false,
        loading: true,
        data: {}
    }
    
    this.socket = null
  }

  componentDidMount() {
    this.socket = io.connect('https://houmkolmonen.herokuapp.com', {
        reconnectionDelay: 1000,
        reconnectionDelayMax: 3000,
        transports: ['websocket'],
    })
    
    fetch(`https://houmkolmonen.herokuapp.com/api/site/${config.siteKey}`)
    .then(response => {
        if (!response.ok) {
            throw Error(response.statusText)
        }
        return response.json()
    })
    .then(data => {  
        let lightOn = false
    
        data.devices.forEach(device => {
            if(device.id === config.ID) {
                lightOn = device.state.on
            }
        })
    
        this.setState({
            loading: false,
            lightOn
        })
    })
    .catch(e => {
        console.log(e)
    })

    this.socket.emit('subscribe', { siteKey: config.siteKey })

    this.socket.on('siteKeyFound', ({ siteKey, data }) => {
        console.log(data)
    })
  }

  toggleLight = () => {
    const { lightOn } = this.state

    let data = {
        id: config.ID,
        state: { on: !lightOn, bri: !lightOn ? 255 : 0 },
    }
    
    this.socket.emit('apply/device', {
        siteKey: config.siteKey,
        data
    })

    this.setState({lightOn: !lightOn})
  }

  render() {
    return (
      <div className="App">
        <Button onClick={this.toggleLight} lightOn={this.state.lightOn}/>
      </div>
    );
  }
}

export default App;
