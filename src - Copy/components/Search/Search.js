import React, { Component } from 'react';
import { connect } from 'react-redux';

import axios from '../../axios-query';
import * as actionTypes from '../../Store/actions';

class Search extends Component {
    state = {
        queryString: '',
    }

    searchAlbums = (event) => {
        event.preventDefault();
        this.props.loadingAlbumImagesForCoverflow();
        this.props.fetchQueryString(this.state.queryString)

        const search = this.state.queryString
        axios.get('search?q=' + search + '&type=album')
            .then(data => {
                let info = []

                data.data.albums.items.forEach((item) => {
                    info.push({ name: item.name, id: item.id, href: item.href })
                    //console.log(item)                                                
                })
                this.props.getAlbumIDs(info)
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
            }).then(() => this.props.loadingAlbumImagesForCoverflow())
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
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        loadingAlbumImagesForCoverflow: () => dispatch({ type: actionTypes.LOADING_ALBUMIMAGES_FOR_COVERFLOW }),
        fetchQueryString: (queryString) => dispatch({ type: actionTypes.FETCH_QUERY_STRING, queryString: queryString }),
        getAlbumIDs: (ids) => dispatch({ type: actionTypes.GET_ALBUM_IDS, ids: ids }),
        getAlbumImgURLs: (imgArr) => dispatch({ type: actionTypes.GET_ABLUM_IMG_URLS, imgArr: imgArr })
    }
}





export default connect(null, mapDispatchToProps)(Search);