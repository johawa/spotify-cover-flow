import React, { Component } from 'react';
import queryString from 'query-string';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { AnimatedSwitch } from 'react-router-transition';

import * as actionTypes from './Store/actions';
import Layout from './hoc/Layout/Layout';
import Homepage from './containers/Homepage/Homepage';
import Profilepage from './containers/Profilepage/Profilepage';
import { withRouter } from 'react-router'

let player;


class App extends Component {
  state = {
    device_id: null,
    state: null,

  }

  componentWillMount() {
    console.log('mounted app component')

    const parsed = queryString.parse(window.location.search)
    const token = parsed.access_token
    this.props.setAccessToken(token)
    //setTimeout(() => {console.log('buffer')}, 100)

    window.onSpotifyPlayerAPIReady = () => {
      player = new window.Spotify.Player({
        name: 'Cover Flow WebApp for Spotify',
        getOAuthToken: cb => {
          cb(this.props.access_token);
        }
      });


      // Error handling
      player.on('initialization_error', e => console.error(e));
      player.on('authentication_error', e => console.error(e));
      player.on('account_error', e => console.error(e));
      player.on('playerback_error', e => console.error(e));

      // Ready
      player.on('ready', data => {

        console.log('Ready with Device ID', data.device_id);
        //set device-id to state
        this.props.setDeviceId(data.device_id);
      });

      player.getCurrentState().then(state => {
        if (state === null) {
          this.setState({ state: 'playing' })
        }
        //console.log(state)
      });

      player.getVolume().then(volume => {
        //console.log('player Volume: ', volume);
        this.props.getPlayerVolume(volume * 100)
      });

      player.addListener('player_state_changed', data => {
        //console.log('[PLAYER_STATE_CHANGED_EVENT]: ', data);
        if (!data.paused) {
          this.props.setPlayingToTrue()
        }

        if (data.paused) {
          this.props.setPlayingToFalse()
        }

        this.props.setCurrentPlaybackState(data)
      });


      // Connect to the player!
      player.connect().then(success => {
        if (success) {
          console.log('The Web Playback SDK successfully connected to Spotify!');
        }
      });
    }


  }

  /*  componentDidMount() {
     const parsed = queryString.parse(window.location.search)
     const access_token = parsed.access_token
     this.props.setAccessToken(access_token)
   }
  */
  render() {
    return (

      <div>

        <Layout>
          <AnimatedSwitch
            atEnter={{ opacity: 0 }}
            atLeave={{ opacity: 0 }}
            atActive={{ opacity: 1 }}
            className={classes.SwitchWwrapper}
          >
          
            <Route path="/profile" component={Profilepage} />
            <Route path="/" component={Homepage} />
          </AnimatedSwitch>
        </Layout>

      </div>

    );
  }
}

export { player }


const mapStatetoProps = state => {
  return {
    access_token: state.access_token
  };
}


const mapDispatchToProps = dispatch => {
  return {
    setDeviceId: (device_id) => dispatch({ type: actionTypes.SET_PLAYER_ID, device_id: device_id }),
    setAccessToken: (access_token) => dispatch({ type: actionTypes.SET_ACCESS_TOKEN, access_token: access_token }),
    getPlayerVolume: (volume) => dispatch({ type: actionTypes.GET_STARTING_VOLUME, volume: volume }),
    setPlayingToTrue: () => dispatch({ type: actionTypes.SET_PLAYING_TRUE }),
    setPlayingToFalse: () => dispatch({ type: actionTypes.SET_PLAYING_FALSE }),
    setCurrentPlaybackState: (current_playback_data) => dispatch({ type: actionTypes.SET_CURRENT_PLAYBACKDATA, current_playback_data: current_playback_data })
  }
}




export default withRouter(connect(mapStatetoProps, mapDispatchToProps)(App));
