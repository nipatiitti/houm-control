import React, { Component } from 'react'

import io from 'socket.io-client'

import config from './config.json'

import Button from './components/button'
import Layout from './components/layout'

import fs from 'fs'

import id from './id.json'

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

  dataToState = data => {
    let zones = data.locations.zones.map(item => Object.assign({}, item, {rooms :[]}))

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

    this.setState({
        loading: false,
        zones,
        devices: data.devices
    })
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
      this.dataToState(data)
    })
    .catch(e => {
        console.log(e)
    })

    this.socket.emit('subscribe', { siteKey: config.siteKey })

    this.socket.on('siteKeyFound', ({ siteKey, data }) => {
        console.log(data)
    })

    this.socket.on('site' , ({ data }) => {
      this.dataToState(data)
    })
  }

  toggleLight = id => state => {

    let data = {
        id,
        state: { on: !state, bri: state ? 0 : 255 },
    }

    console.log(data)
    
    this.socket.emit('apply/device', {
        siteKey: config.siteKey,
        data
    })

  }

  render() {
    const { loading, devices } = this.state
    if(loading) return null

    let items = devices.filter(device => id[device.id])

    console.log(items)
    
    return (
      <div className="App">
        <Layout>
          <React.Fragment>
            {items.map(item => (
              <Button key={item.id} x={id[item.id].x} y={id[item.id].y} light={item} onClick={this.toggleLight} />
            ))}
          </React.Fragment>
        </Layout>
      </div>
    )
  }
}

export default App;
