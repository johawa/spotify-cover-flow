import React, { Component } from 'react';

import { connect } from 'react-redux';
import Aux from '../../hoc/Auxilary';
import Tracklist from '../../components/Tracklist/Tracklist';
import Coverflow from '../../components/Coverflow/Coverflow';
import Spinner from '../../components/UI/Spinner/Spinner';
import { withRouter } from 'react-router';



class Homepage extends Component {



    render() {


        let tracklist = <p>Tracklist : </p>

        if (this.props.selectedCoverId !== null && this.props.selectedCoverId) {

            tracklist = (


                <Tracklist
                    id={this.props.selectedCoverId}
                    tracklist={this.props.tracklist}
                />
            );
        }

        let coverflow = (<Coverflow urls={this.props.imgArr} tracklistProp={tracklist} />);

        if (this.props.loadingAlbumImages) {
            coverflow = <Spinner />
        }


        return (
            <Aux>

                {coverflow}
            </Aux>
        );
    }
}

const mapStatetoProps = state => {
    return {
        imgArr: state.imgArr,
        loadingAlbumImages: state.loadingAlbumImagesForCoverflow,
        tracklist: state.selectedTracklist,
        selectedCoverId: state.selectedCoverId
    };
}


export default withRouter(connect(mapStatetoProps)(Homepage));