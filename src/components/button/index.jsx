import React, { Component } from 'react'
import './button.css'

class Button extends Component {

    render() {
        const { light, onClick, x, y } = this.props

        return (
            <circle
                r={20}
                cx={x}
                cy={y}
                className={ light.state.on ? 'switch on' : 'switch'}
                onClick={() => onClick(light.id)(light.state.on)}
            />
        )
    }
}

export default Button
