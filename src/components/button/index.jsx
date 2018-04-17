import React, { Component } from 'react'
import './button.css'

class Button extends Component {

    render() {
        const { lightOn, onClick } = this.props

        return (
            <div className="lights-container">
                <div onClick={() => onClick()} className={ lightOn ? "light-button on" : "light-button"} >{lightOn ? 'On' : 'Off'}</div>
            </div>
        )
    }
}

export default Button
