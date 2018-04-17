import React, { Component } from 'react'
import io from 'socket.io-client'

import config from './config.json'

class Button extends Component {
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
    
        this.socket.emit('subscribe', { siteKey: config.siteKey })
    
        this.socket.on('siteKeyFound', ({ siteKey, data }) => {
        let lightOn = false
    
        data.devices.forEach(device => {
            if(device.id === config.ID) {
                lightOn = device.state.on
            }
        })
    
        this.setState({
            loading: false,
            data,
            lightOn
        })
    
        })
    }
}
