import React, { Component } from 'react';
import axios from '../../../axios-query';
import { connect } from 'react-redux';

import classes from './Track.css';
import * as actionTypes from '../../../Store/actions.js';

class Track extends Component {

    playsong = (nr) => {

        const coverId = this.props.selectedCoverID
        const album = `spotify:album:${coverId}`
        const offset = nr - 1

        axios.put("me/player/play?device_id=" + this.props.device_id, {
            context_uri: album,
            offset: { position: offset }
        }).then(data => console.log(data))
            .then(() => this.props.playing_to_true())

    }


    render() {
        return (
            <li className={classes.TrackItem} onClick={() => this.playsong(this.props.nr)}>
                <span>&#9658;</span>
                <span>{this.props.name} </span>
                <span>{this.props.duration} </span>
            </li>
        );
    }
};

const mapStatetoProps = state => {
    return {
        device_id: state.device_id,
        selectedCoverID: state.selectedCoverId,
        playing: state.playing,
        selected_tracklist: state.selectedTracklist
    };
}

const mapDispatchToProps = dispatch => {
    return {
        playing_to_true: () => dispatch({ type: actionTypes.SET_PLAYING_TRUE }),
        playing_to_false: () => dispatch({ type: actionTypes.SET_PLAYING_FALSE })
    }
}

export default connect(mapStatetoProps, mapDispatchToProps)(Track);