import React, { Component } from 'react'
import './button.css'

class Button extends Component {

    render() {
        const { state, onClick, x, y } = this.props

        return (
            <circle r={20} cx={x} cy={y} className={ state ? 'switch on' : 'switch'} onClick={() => onClick(state)} />
        )
    }
}

export default Button
