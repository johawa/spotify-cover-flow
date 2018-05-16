import React, { Component } from 'react';
import axios from '../../../axios-query';
import { connect } from 'react-redux';

import classes from './Track.css';
import * as actionTypes from '../../../Store/actions.js';

class Track extends Component {

    playsong = (uri) => {

        switch (this.props.playing) {
            case false:
                console.log('true');
                axios.put("me/player/play?device_id=" + this.props.device_id, {
                    uris: [uri]
                }).then(data => console.log(data))
                    .then(() => this.props.playing_to_true())
                break;
            case true:
                console.log('flase')
                axios.put("me/player/pause?device_id=" + this.props.device_id).then(data => console.log(data))

                    .then(() => this.props.playing_to_false())
                break;
        }

    }

    render() {
        return (
            <div className={classes.TrackItem} onClick={() => this.playsong(this.props.uri)}>
                {this.props.nr} ,
                {this.props.name} ,
                {this.props.duration}
            </div>
        );
    }
};

const mapStatetoProps = state => {
    return {
        device_id: state.device_id,
        playing: state.playing
    };
}

const mapDispatchToProps = dispatch => {
    return {
        playing_to_true: () => dispatch({ type: actionTypes.SET_PLAYING_TRUE }),
        playing_to_false: () => dispatch({ type: actionTypes.SET_PLAYING_FALSE })
    }
}

export default connect(mapStatetoProps, mapDispatchToProps)(Track);