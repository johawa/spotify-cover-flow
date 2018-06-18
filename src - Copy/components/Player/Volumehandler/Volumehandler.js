import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actionTypes from '../../../Store/actions';
import { player } from '../../../App';

class Volumehandler extends Component {
    
    handleChange = (event) => {
        const value = event.target.value
        const value_volume = value * 0.01
        player.setVolume(value_volume).then(() => {
            console.log('Volume updated!');
        });   
        this.props.setUserVolume(value)
    }

    handleSubmit = (event) => {
        console.log('submitted')
    }


    render() {
       

        let label = 'VOLUME'

        if (this.props.user_volume <= 0) {
            label = 'MUTED'
        }

        return (
            <div>
                <label> {label} {this.props.user_volume } </label>
                <input
                    type="range"
                    min="0"
                    value={this.props.user_volume}
                    max="100"
                    onChange={this.handleChange}
                    onTouchEnd={this.handleSubmit}
                    onMouseUp={this.handleSubmit}
                />
            </div>

        );
    }
};

const mapStateToProps = state => {
    return {
        starting_volume: state.starting_volume,
        user_volume: state.user_volume
    };
}

const mapDispatchToProps = dispatch => {
    return {
        setUserVolume: (volume) => dispatch({ type: actionTypes.GET_USER_VOLUME, volume: volume }),
    }
}



export default connect(mapStateToProps, mapDispatchToProps)(Volumehandler);