import React, { Component } from 'react';
import { connect } from 'react-redux';

import classes from './Playbutton.css';
import { player } from '../../../App';

class Playbutton extends Component {
    

    togglePlay = () => {

        if (this.props.playing && this.props.playing_data !== false) {        
                player.pause().then(() => {
                    console.log('Paused!');
                  });
        }



        else if (this.props.playing === false && this.props.playing_data !== true) {
            player.resume().then(() => {
                console.log('Resumed!');
              });
        }

        else {
            console.log('currently not playing')
        }

    }

    render() {

        let label = 'PLAY'

        if (this.props.playing && this.props.playing_data !== false) {
            label = 'PAUSE'
        }

        return (

            <div className={classes.Playbutton}>
                <button onClick={this.togglePlay}>{label}</button>
            </div>

        );
    }
};

const mapStateToProps = state => {
    return {
        playing: state.playing,
        playing_data: state.current_playback_data,        
    };
}


export default connect(mapStateToProps)(Playbutton);