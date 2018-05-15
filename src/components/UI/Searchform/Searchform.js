import React, { Component } from 'react';
import { connect } from 'react-redux';

import axios from '../../../axios-query';
import Coverflow from '../../Coverflow/Coverflow';
import * as actionTypes from '../../../Store/actions';

class searchform extends Component {
    state = {
        queryString: ''
    }

    searchAlbums = (event) => {
        event.preventDefault();

        this.props.fetchQueryString(this.state.queryString)

        const search = this.state.queryString
        axios.get('search?q=' + search + '&type=album')
            .then(data => {
                return Promise.all(data.data.albums.items
                    .map(item => item.id).slice(0, 10)
                    .map(id => axios.get('albums/' + id)));
            })
            .then(responses => Promise.all(responses.map(image => image.data.images[0].url)))
            .then(urls => {
                return Promise.all(urls.map(url => {
                    return new Promise(resolve => {
                        const image = new Image();
                        image.addEventListener('load', () => {
                            resolve(image);
                        });
                        image.src = url;
                    })
                }));
            })
            .then(images => {
                let imgArr = [];
                images.forEach(image => {
                    imgArr.push(image.src);
                });
                return imgArr
            })
            .then((imgArr) => {
                this.props.getAlbumImgURLs(imgArr)                
            })
            .catch((e) => console.log(e));


    }

    handleChange = (event) => {
        this.setState({ queryString: event.target.value });
    }


    render() {
        let form = (
            <form onSubmit={this.searchAlbums}>
                <h2>Search For an Artist:</h2>
                <input type="text" placeholder="Type an Artist Name" onChange={this.handleChange} />
                <input type="submit" value="Search" />
            </form>
        );

        return (
            <div>
                {form}
                <Coverflow urls={this.state.urls} />
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        loadingAlbumData: state.loading
    };
}


const mapDispatchToProps = dispatch => {
    return {
        fetchQueryString: (queryString) => dispatch({ type: actionTypes.FETCH_QUERY_STRING, queryString: queryString }),
        getAlbumImgURLs: (imgArr) => dispatch({ type: actionTypes.GET_ABLUM_IMG_URLS, imgArr: imgArr })
    }
}





export default connect(mapStateToProps, mapDispatchToProps)(searchform);