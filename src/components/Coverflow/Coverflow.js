import React, { Component } from 'react';
import queryString from 'query-string';

import classes from './Coverflow.css';

class Coverflow extends Component {
    state = {
        searchString: this.props.query
    }

    componentDidMount() {
        this.scrollAnimation();
    }

    componentWillReceiveProps() {
        //this.fetchAlbumData();
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

        const parsed = queryString.parse(window.location.search)
        const accessToken = parsed.access_token
        const search = this.state.searchString

        fetch('https://api.spotify.com/v1/search?q=' + search + '&type=album', {
            headers: { 'Authorization': 'Bearer ' + accessToken }
        })
            .then(response => console.log(response))

    }

    render() {
        return (
            <div className={classes.Coverflow} id="Coverflow">
                <ul className={classes.item} id="items">
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                </ul>
            </div>
        );
    }
}

export default Coverflow;