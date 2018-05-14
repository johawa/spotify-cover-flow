import React, { Component } from 'react';

import Spinner from '../UI/Spinner/Spinner';
import axios from '../../axios-query';
import classes from './Coverflow.css';
import Aux from '../../hoc/Auxilary';

class Coverflow extends Component {
    state = {
        searchString: this.props.query,
        loading: false,
        ImageUrl: []
    }

    componentDidMount() {
        this.scrollAnimation();
        this.fetchAlbumData();
    }



    scrollAnimation() {
        const scrollable = document.getElementById("Coverflow")
        const items = document.getElementById("items")
        //Scroll Animation
        function scrollMiddleWare(inertia = 0.8) {
            const delta = {
                x: null,
            }
            const abs = {
                x: 0,
                y: 0,
            }

            return function onScroll(callback) {

                function notify() {
                    abs.x += delta.x;
                    callback({ abs, delta });
                }

                let requestId;

                function start() {
                    requestId = requestAnimationFrame(update);
                }

                function update() {
                    delta.x *= inertia;
                    notify();
                    start();
                }

                function stop() {
                    cancelAnimationFrame(requestId);
                    requestId = null;
                }

                let prevEvent;

                return function eventHandler(event) {
                    event.preventDefault();
                    if (prevEvent && event.buttons === 1) {
                        delta.x = event.clientX - prevEvent.clientX;
                        stop();
                        notify();
                    }

                    if (requestId === null && event.buttons === 0) {
                        start();
                    }
                    prevEvent = event;
                }
            }
        }
        scrollable.addEventListener('mousemove',
            scrollMiddleWare(.89)((scroll) => {
                items.style.left = `${scroll.abs.x}px`;
            }));


    }

    fetchAlbumData() {



        const search = this.state.searchString

        this.setState({ loading: true });

        axios.get('search?q=' + search + '&type=album')
            //.then(response => console.log(response))
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
            .then((imgArr) => Promise.all(this.setState({ ImageUrl: imgArr })))
            .then(result => {
                this.setState({ loading: false })
            })
            .catch((e) => this.setState({ loading: false }));

    }

    render() {

        let listElements = this.state.ImageUrl.map(image => {
            console.log(image)
            return <li><div><img src={image} /> </div></li>;
        })


        return (
            <div className={classes.Coverflow} id="Coverflow" >
                {
                    this.state.loading ? <Spinner /> :
                        <ul className={classes.item} id="items">
                            {listElements}
                        </ul>
                }

            </div>



        );
    }
}

export default Coverflow;