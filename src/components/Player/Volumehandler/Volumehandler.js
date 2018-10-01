import React, { Component } from "react";
import { connect } from "react-redux";
import InputRange from "react-input-range";

import classes from "./Volumehandler.css";
import * as actionTypes from "../../../Store/actions";
import { player } from "../../../App";


class Volumehandler extends Component {
  handleChange = event => {
    const value = event;
    const value_volume = value * 0.01;
    player.setVolume(value_volume).then(() => {
      console.log("Volume updated!");
    });
    this.props.setUserVolume(value);
  };

  handleSubmit = event => {
    console.log("submitted");
  };

  render() {
    let label = (
      <i class="fa" aria-hidden="true">
        &#xf028;
      </i>
    );

    if (this.props.user_volume <= 50) {
      label = (
        <i class="fa" aria-hidden="true">
          &#xf027;
        </i>
      );
    }

    if (this.props.user_volume <= 0) {
      label = (
        <i class="fa" aria-hidden="true">
          &#xf026;
        </i>
      );
    }

    return (
      <div className={classes.VolumehandlerBox}>
        <div className={classes.SoundIconBox}> {label} </div>

        <InputRange
          //type="range"
          minValue={0}
          value={this.props.user_volume}
          maxValue={100}
          onChange={this.handleChange}
          onChangeComplete={this.handleSubmit}
          //onMouseUp={this.handleSubmit}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    starting_volume: state.starting_volume,
    user_volume: state.user_volume
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setUserVolume: volume =>
      dispatch({ type: actionTypes.GET_USER_VOLUME, volume: volume })
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Volumehandler);
