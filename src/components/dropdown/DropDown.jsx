import React, { Component } from 'react';
import PropTypes from 'prop-types'

import ExpansionPanel, {
    ExpansionPanelSummary,
    ExpansionPanelDetails
} from 'material-ui/ExpansionPanel'

import Typography from 'material-ui/Typography'
import ExpandMoreIcon from 'react-icons/lib/md/expand-more'

import { TextField } from 'material-ui'
import { AddButton } from '../Button'

class DropDown extends Component {

    constructor(props) {
        super(props)
    }

    render () {
        const { onClick } = this.props
        return (
          <ExpansionPanel>
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
              <Typography>Correct answers</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <div>
                {idMap.map(item => (
                    <TextField
                        key={item.id}
                        value={item.text}
                        label={`Correct answer #${item.id}`}
                        margin={'normal'}
                        fullWidth
                        onChange={this.onChange(item.id)}
                  />
                ))}
                <AddButton onClick={() => this.add()} />
              </div>
            </ExpansionPanelDetails>
          </ExpansionPanel>
        )
    }
}


CorrectAnswers.propTypes = {
    data: PropTypes.array.isRequired,
    cb: PropTypes.func.isRequired
}

export default CorrectAnswers

