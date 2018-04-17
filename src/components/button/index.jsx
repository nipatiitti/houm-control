import React, { Component } from 'react'
import './button.css'

class Button extends Component {

    render() {
        const { state, onClick } = this.props

        return (
            <div onClick={() => onClick(state)} className={ state ? "light-button on" : "light-button"} >{state ? 'On' : 'Off'}</div>
        )
    }
}

export default Button
