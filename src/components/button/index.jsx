import React, { Component } from 'react'
import './button.css'

class Button extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: false
    }
  }

  componentWillReceiveProps() {
    this.setState({ loading: false })
  }

  render() {
    const { light, onClick, x, y } = this.props

    return (
      <circle
        r={20}
        cx={x}
        cy={y}
        className={`switch ${light.state.on ? 'on ' : ''} ${this.state.loading ? 'loading' : ''}`}
        onClick={() => {
          this.setState({ loading: true })
          onClick(light.id)(light.state.on)
        }
        }
      />
    )
  }
}

export default Button
