import React, { Component } from 'react';
import { connect } from 'react-redux';

import classes from './Coverflow.css';
import Listitem from './Listitem/Listitem';
import axios from '../../axios-query';
import * as actionTypes from '../../Store/actions';

class Coverflow extends Component {

    componentDidMount() {
        this.scrollAnimation();
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


    getID = (event, id) => {
        console.log('cliked via coverlofw', event.target)

        this.props.selectedCoverID(id);

        axios.get('albums/' + id + '/tracks')
            .then(data => {
                console.log(data);
                return Promise.all(data.data.items.map(function (item) {

                    return [{
                        number: item.track_number,
                        name: item.name,
                        duration: item.duration_ms,
                        uri: item.uri,
                        id: item.id
                    }]
                }))
            })

            .then(tracklist => this.props.selectedTracklist(tracklist))
        //.then(() => console.log(this.state))

    }


    render() {


        let listElements = <div> no albums </div>

        if (this.props.imgArr) {
            listElements = this.props.imgArr.map((image, index) => {
                const id = this.props.ids[index].id

                return (<Listitem
                
                    style={{ 'zIndex': 100 + (index * -1) }}
                    key={index}
                    index={index}
                    onClick={(event) => this.getID(event, id)}

                >

                    
                        <img src={image} alt={index}/>
                        <p className={classes.Description}
                            style={{ 'zIndex': 101 + (index * -1) }}>
                            {this.props.ids[index].name}
                        </p>
                    

                </Listitem>);
            })
        }

        return (
            <div className={classes.Coverflow} id="Coverflow" >
                <ul className={classes.item} id="items">
                   
                    {listElements}
                </ul>
            </div>
        );
    }
}


const mapStatetoProps = state => {
    return {
        imgArr: state.imgArr,
        ids: state.ids
    };
}


const mapDispatchToProps = dispatch => {
    return {
        selectedCoverID: (id) => dispatch({ type: actionTypes.SELECTED_COVER_ID, id: id }),
        selectedTracklist: (selectedTracklist) => dispatch({ type: actionTypes.SELECTED_TRACKLIST, selectedTracklist: selectedTracklist })
    }
}


export default connect(mapStatetoProps, mapDispatchToProps)(Coverflow);