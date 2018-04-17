import React, { Component } from 'react'

import io from 'socket.io-client'

import config from './config.json'

import Button from './components/button'
import Layout from './components/layout'

class App extends Component {

  constructor(props) {
    super(props)

    this.state = {
        lightOn: false,
        loading: true,
        data: []
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

        let zones = data.locations.zones.map(item => Object.assign({}, item, {rooms: []}))

        data.locations.rooms.forEach(room => {
          for(let i = 0; i < zones.length; i++) {
            if(zones[i].id === room.zoneId) {
              zones[i].rooms.push({
                id: room.id,
                name: room.name,
                spots: [],
                lights: []
              })
            }
          }          
        })

        data.devices.forEach(device => {
          zones.forEach(zone => {
            zone.rooms.forEach(room => {
              if(room.id === device.roomId) {
                if(device.type === 'dimmable')
                  room.spots.push(device)
                else
                  room.lights.push(device)
              }
            })
          })
        })

        console.log(zones)

        this.setState({
            loading: false,
            data: zones
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

  toggleLight = id => state => {

    let data = {
        id,
        state: { on: !state, bri: 255 },
    }
    
    this.socket.emit('apply/device', {
        siteKey: config.siteKey,
        data
    })

  }

  buttons = () => {
    const { data } = this.state

    const items = data.map(zones => {

    })
  }

  render() {
    const { loading, data } = this.state

    let light = {}

    if (!loading) {
      light = data[1].rooms[2].lights[0]
      console.log(light)
    }
    
    return (
      <div className="App">
        {!loading &&
          <div className="buttons">
            <Button state={light.state.on} onClick={this.toggleLight(light.id)} />
          </div>
        }
        <Layout />
      </div>
    )
  }
}

export default App;
