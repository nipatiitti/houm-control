import React, { Component } from 'react'
import io from 'socket.io-client'

import config from './config.json'


class App extends Component {

  render() {
    return (
      <div className="App">
        {this.state.loading && "Loading"}
        {this.state.lightOn ? "päällä" : "pois"}
      </div>
    );
  }
}

export default App;
