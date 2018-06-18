import React, { Component } from 'react';

import { connect } from 'react-redux';
import Aux from '../../hoc/Auxilary';
import Tracklist from '../../components/Tracklist/Tracklist';
import Search from '../../components/Search/Search';
import Coverflow from '../../components/Coverflow/Coverflow';
import Spinner from '../../components/UI/Spinner/Spinner';


class Homepage extends Component {



    render() {

        let coverflow = <Coverflow urls={this.props.imgArr} />

        if (this.props.loadingAlbumImages) {
            coverflow = <Spinner />
        }

        let tracklist = <p>Tracklist : </p>

        if (this.props.selectedCoverId !== null && this.props.selectedCoverId) {

            tracklist = (
                <div>
                    Tracklist:
                     <Tracklist
                        id={this.props.selectedCoverId}
                        tracklist={this.props.tracklist}
                    />
                </div>);
        }


        return (
            <Aux>
                <Search />
                {coverflow}
                {tracklist}
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


export default connect(mapStatetoProps)(Homepage);