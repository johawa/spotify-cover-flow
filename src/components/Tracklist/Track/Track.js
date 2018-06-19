import React, { Component } from 'react';
import axios from '../../../axios-query';
import { connect } from 'react-redux';

import classes from './Track.css';
import * as actionTypes from '../../../Store/actions.js';

class Track extends Component {
    state = {
        isHovered: false
    }

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

    handleHover = () => {
        this.setState({
            isHovered: !this.state.isHovered
        });
    }


    render() {
        const icon = this.state.isHovered ? <i class="fa">&#xf04b;</i> : <i class="fa">&#xf0a1;</i>;

        let css = null;

        if (this.props.playing && this.props.current_track === this.props.id) {
            css = { color: 'green', backgroundColor: 'rgba(54, 56, 57, 1)' }
        }
        return (
            <li className={classes.TrackItem}
                style={css}
                onMouseEnter={this.handleHover}
                onMouseLeave={this.handleHover}
                onClick={() => this.playsong(this.props.nr)}>
                <div className={classes.IconBox}>
                    {icon}
                </div>
                <div className={classes.NameBox}>
                    <div className={classes.Name}>{this.props.name} </div>
                </div>
                <div className={classes.DurationBox}>{this.props.duration} </div>
            </li>
        );
    }
};

const mapStatetoProps = state => {
    return {
        device_id: state.device_id,
        selectedCoverID: state.selectedCoverId,
        playing: state.playing,
        selected_tracklist: state.selectedTracklist,
        current_track: state.current_track
    };
}

const mapDispatchToProps = dispatch => {
    return {
        playing_to_true: () => dispatch({ type: actionTypes.SET_PLAYING_TRUE }),
        playing_to_false: () => dispatch({ type: actionTypes.SET_PLAYING_FALSE })
    }
}

export default connect(mapStatetoProps, mapDispatchToProps)(Track);