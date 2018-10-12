import React, { Component } from "react";
import queryString from "query-string";
import { connect } from "react-redux";
import { Route, Switch } from "react-router-dom";
import scriptLoader from "react-async-script-loader";

import * as actionTypes from "./Store/actions";
import Layout from "./hoc/Layout/Layout";
import Homepage from "./containers/Homepage/Homepage";
import Profilepage from "./containers/Profilepage/Profilepage";
import { withRouter } from "react-router";
import axios from "./axios-query";

let player, token, parsed;

class App extends Component {
  state = {
    device_id: null,
    state: null
  };

  componentWillMount() {
    parsed = queryString.parse(window.location.search);
    token = parsed.access_token;

    localStorage.setItem("TOKEN", `${token}`);

    window.onSpotifyPlayerAPIReady = () => {
      player = new window.Spotify.Player({
        name: "Cover Flow WebApp for Spotify",
        getOAuthToken: cb => {
          cb(token);
        }
      });

      //console.log("token", token, 'window', window.frameElement);
      //console.log("mounted app component", window.contentWindow );
      // Error handling
      player.on("initialization_error", e => {
        console.error(e);
        this.props.connectionError("initialization_error", true);
      });
      player.on("authentication_error", e => {
        console.error(e);
        this.props.connectionError("authentication_error", true);
      });
      player.on("account_error", e => {
        console.error(e);
        this.props.connectionError("account_error", true);
      });
      player.on("playback_error", e => {
        console.error(e);
        this.props.connectionError("playback_error", true);
      });

      // Ready
      player.on("ready", data => {
        console.log("Ready with Device ID", data.device_id);
        this.props.connectionWorking();
        this.setState({
          device_id: data.device_id
        });
        //set device-id to state
        this.props.setDeviceId(data.device_id);
      });

      player.getCurrentState().then(state => {
        if (state === null) {
          this.setState({ state: "playing" });
        }
        //console.log(state)
      });

      player.getVolume().then(volume => {
        console.log("player Volume: ", volume);
        this.props.getPlayerVolume(volume * 100);
      });

      player.addListener("player_state_changed", data => {
        console.log("[PLAYER_STATE_CHANGED_EVENT]: ", data);
        if (!data) {
          return;
        }
        if (!data.paused) {
          this.props.setPlayingToTrue();
        }

        if (data.paused) {
          this.props.setPlayingToFalse();
        }

        this.props.setCurrentPlaybackState(data);
        this.props.setCurrentTrack(data.track_window.current_track.id);
      });

      // Connect to the player!
      player.connect().then(success => {
        if (success) {
          this.props.connectionWorking();
          console.log(
            "The Web Playback SDK successfully connected to Spotify!"
          );
        }
      });
    };
  }

  componentDidMount() {
    /*  parsed = queryString.parse(window.location.search);
    token = parsed.access_token;
    console.log("token", token);
    localStorage.setItem("TOKEN", `${token}`);

    const { isScriptLoaded, isScriptLoadSucceed } = this.props;
    if (isScriptLoaded && isScriptLoadSucceed) {
      window.onSpotifyWebPlaybackSDKReady = () => {
        player = new window.Spotify.Player({
          name: "Cover Flow WebApp for Spotify",
          getOAuthToken: cb => {
            cb(token);
          }
        });
      };
    }
 */
    this.catchRecentPlayedSongs();
  }

  catchRecentPlayedSongs = () => {
    axios
      .get("search?q=Oasis&type=album")
      .then(data => {
        let info = [];

        data.data.albums.items.forEach(item => {
          info.push({ name: item.name, id: item.id, href: item.href });
          //console.log(item)
        });
        this.props.getAlbumIDs(info);
        return Promise.all(
          data.data.albums.items
            .map(item => item.id)
            .slice(0, 10)
            .map(id => axios.get("albums/" + id))
        );
      })
      .then(responses =>
        Promise.all(responses.map(image => image.data.images[0].url))
      )
      .then(urls => {
        return Promise.all(
          urls.map(url => {
            return new Promise(resolve => {
              const image = new Image();
              image.addEventListener("load", () => {
                resolve(image);
              });
              image.src = url;
            });
          })
        );
      })
      .then(images => {
        let imgArr = [];
        images.forEach(image => {
          imgArr.push(image.src);
        });
        return imgArr;
      })
      .then(imgArr => {
        this.props.getAlbumImgURLs(imgArr);
      })
      .then(() => this.props.loadingAlbumImagesForCoverflow())
      .catch(e => console.log(e));
  };

  render() {
    return (
      <Layout>
        <Switch>
          <Route path="/profile" exact component={Profilepage} />
          <Route path="/" exact component={Homepage} />
        </Switch>
      </Layout>
    );
  }
}

export { player };

const mapDispatchToProps = dispatch => {
  return {
    connectionError: (errorType, is) =>
      dispatch({ type: actionTypes.CONNECTION_ERROR, is, errorType }),
    connectionWorking: () =>
      dispatch({
        type: actionTypes.CONNECTION_ERROR,
        is: false,
        errorType: ""
      }),
    loadingAlbumImagesForCoverflow: () =>
      dispatch({ type: actionTypes.LOADING_ALBUMIMAGES_FOR_COVERFLOW }),
    fetchQueryString: queryString =>
      dispatch({
        type: actionTypes.FETCH_QUERY_STRING,
        queryString: queryString
      }),
    getAlbumIDs: ids => dispatch({ type: actionTypes.GET_ALBUM_IDS, ids: ids }),
    getAlbumImgURLs: imgArr =>
      dispatch({ type: actionTypes.GET_ABLUM_IMG_URLS, imgArr: imgArr }),
    setDeviceId: device_id =>
      dispatch({ type: actionTypes.SET_PLAYER_ID, device_id: device_id }),
    getPlayerVolume: volume =>
      dispatch({ type: actionTypes.GET_STARTING_VOLUME, volume: volume }),
    setPlayingToTrue: () => dispatch({ type: actionTypes.SET_PLAYING_TRUE }),
    setPlayingToFalse: () => dispatch({ type: actionTypes.SET_PLAYING_FALSE }),
    setCurrentPlaybackState: current_playback_data =>
      dispatch({
        type: actionTypes.SET_CURRENT_PLAYBACKDATA,
        current_playback_data: current_playback_data
      }),
    setCurrentTrack: current_track =>
      dispatch({
        type: actionTypes.SET_CURRENT_TRACK,
        current_track: current_track
      })
  };
};

const preApp = scriptLoader("https://sdk.scdn.co/spotify-player.js")(App);
export default withRouter(
  connect(
    null,
    mapDispatchToProps
  )(preApp)
);
