import React, { Component } from 'react';
import { connect } from 'react-redux';

import Progressbar from './Progressbar/Progressbar';
import Playbutton from './Playbutton/Playbutton';
import Volumehandler from './Volumehandler/Volumehandler';
import Nextrackbutton from './Nexttrackbutton/Nexttrackbutton';
import Previoustrackbutton from './Previoustrack/Previoustrack';
import classes from './Player.css';
import { player } from '../../App';



class PlayerComponent extends Component {

    nextsong = () => {
        player.nextTrack().then(() => {
            console.log('Skipped to next track!');
        });
    
    }
    previoussong = () => {
        player.previousTrack().then(() => {
            console.log('Skipped to next track!');
        });
    }

    


    render() {

        let progressbar = <Progressbar />

        if (this.props.playing) {
            progressbar = <Progressbar playingFromPlayer={this.props.playing} />
        }

        return (

            <div className={classes.Player}>
                <h3>PLAYER</h3>               
                <Previoustrackbutton previoussong={() => this.previoussong()} />
                <Playbutton />
                <Nextrackbutton nextsong={() => this.nextsong()} />                
                <Volumehandler />
                {progressbar}
            </div>
        );
    }
}


const mapStateToProps = state => {
    return {
        playing: state.playing,
    };
}


export default connect(mapStateToProps)(PlayerComponent); 