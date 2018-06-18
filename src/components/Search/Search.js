import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Redirect } from 'react-router-dom';

import SuggestionBox from './SuggestionBox/Suggestion';
import classes from './Search.css';
import axios from '../../axios-query';
import Aux from '../../hoc/Auxilary';
import * as actionTypes from '../../Store/actions';
import Spyglas from '../../assets/spyglass.png';
import Suggestions from './SuggestionBox/Suggestion';


class Search extends Component {
    state = {
        queryString: 'Oasis',
    }

    componentDidMount() {
        this._input.focus();        
    }

    searchAlbums = (event) => {
        event.preventDefault();
        this.props.loadingAlbumImagesForCoverflow();
        this.props.fetchQueryString(this.state.queryString)
        const search = this.state.queryString
    

        /*     const search = this.state.queryString
            axios.get('search?q=' + search + '&type=artist')
                .then(data => {
                    let suggestions = []
    
                    data.data.artists.items.forEach((item) => {
                        suggestions.push({ name: item.name })
                        console.log(suggestions)
                    });
                }); */

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

        if (this.props.location.pathname === '/profile') {            
            this.props.history.push('/')
        };
    }

    handleChange = (event) => {
        const str = (event.target.value).toLowerCase();
        const codedStr = encodeURIComponent(str.trim()) 
        console.log(codedStr)
        this.setState({ queryString: codedStr });
    }

    render() {



        let form = (

            <form className={classes.Search} onSubmit={this.searchAlbums}>
                <input ref={(input) => this._input = input}
                    className={classes.Input}
                    type="text"
                    placeholder=" Suche nach einem Album"
                    onChange={this.handleChange} />               
            </form>

        );

        return (
            <Aux>                
                {form}
            </Aux>
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





export default withRouter(connect(null, mapDispatchToProps)(Search));