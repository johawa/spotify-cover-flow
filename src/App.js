import React, { Component } from 'react';
import queryString from 'query-string';
import { connect } from 'react-redux';

import * as actionTypes from './Store/actions';
import Layout from './components/Layout/Layout';
import Landingpage from './containers/Landingpage';

let PLAYER;

class App extends Component {
  state = {
    device_id: null
  }

  componentWillMount() { 
  

    const parsed = queryString.parse(window.location.search)
    const token = parsed.access_token

    window.onSpotifyPlayerAPIReady = () => {
      PLAYER = new window.Spotify.Player({
        name: 'Cover Flow WebApp for Spotify',
        getOAuthToken: cb => {
          cb(token);
        }
      });


      // Error handling
      PLAYER.on('initialization_error', e => console.error(e));
      PLAYER.on('authentication_error', e => console.error(e));
      PLAYER.on('account_error', e => console.error(e));
      PLAYER.on('playerback_error', e => console.error(e));

      // playerback status updates
      /*   player.on('player_state_changed', state => {
          console.log(state)
        }); */


      // Ready
      PLAYER.on('ready', data => {
        console.log('Ready with Device ID', data.device_id);
        //set device-id to state
        this.props.setDeviceId(data.device_id);
      });

      // Connect to the player!
      PLAYER.connect().then(success => {
        if (success) {
          console.log('The Web Playback SDK successfully connected to Spotify!');
        }
      });
    }
  }

  render() {
    return (
      <div>
        <Layout>
          <Landingpage />
        </Layout>
      </div>
    );
  }
}



const mapDispatchToProps = dispatch => {
  return {
    setDeviceId: (device_id)  => dispatch({type: actionTypes.SET_PLAYER_ID, device_id: device_id})
  }
}

export default connect(null, mapDispatchToProps)(App);
