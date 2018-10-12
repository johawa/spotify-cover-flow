import React, { Component } from "react";

import { connect } from "react-redux";
import Aux from "../../hoc/Auxilary";
import Tracklist from "../../components/Tracklist/Tracklist";
import Coverflow from "../../components/Coverflow/Coverflow";
import Spinner from "../../components/UI/Spinner/Spinner";
import { withRouter } from "react-router";

class Homepage extends Component {
  render() {
    let tracklist = <p>Tracklist : </p>;

    if (this.props.selectedCoverId !== null && this.props.selectedCoverId) {
      tracklist = (
        <Tracklist
          id={this.props.selectedCoverId}
          tracklist={this.props.tracklist}
        />
      );
    }
    let { loadingAlbumImages, queryString, ids, connectionError } = this.props;

    let coverflow = (
      <Coverflow urls={this.props.imgArr} tracklistProp={tracklist} />
    );

    if (queryString === "") {
      return (coverflow = (
        <div>
          <h3>Please search for an Album to view Results</h3>
        </div>
      ));
    }
    if (!ids || ids.length <= 0) {
      return (coverflow = (
        <div>
          <h3>There were no Results found</h3>
        </div>
      ));
    }
    if (connectionError.is === true) {
      return (coverflow = (
        <div>
          <h1>{`Sorry an error occured ! Error_Type:  ${
            this.props.connectionError.type
          }`}</h1>
        </div>
      ));
    }
    if (loadingAlbumImages) {
      return (coverflow = <Spinner />);
    }
    //FALLBACK
    else {
      coverflow = (
        <Coverflow urls={this.props.imgArr} tracklistProp={tracklist} />
      );
    }

    return <Aux>{coverflow}</Aux>;
  }
}

const mapStatetoProps = state => {
  return {
    imgArr: state.imgArr,
    ids: state.ids,
    loadingAlbumImages: state.loadingAlbumImagesForCoverflow,
    tracklist: state.selectedTracklist,
    selectedCoverId: state.selectedCoverId,
    connectionError: state.connectionError,
    queryString: state.queryString
  };
};

export default withRouter(connect(mapStatetoProps)(Homepage));
