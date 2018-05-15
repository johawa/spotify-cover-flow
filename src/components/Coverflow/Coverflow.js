import React, { Component } from 'react';
import { connect } from 'react-redux';


import classes from './Coverflow.css';


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
   

    getID = (event , id) => {
        console.log(event.target)
        console.log(id)
    }


    render() {

        let listElements = <div> no albums </div>

        if (this.props.imgArr) {
            listElements = this.props.imgArr.map((image, index) => {
                const id = this.props.ids[index].id
              
                return (<li
                    onClick={(event) => this.getID(event, id)}
                    key={index}
                    style={{ 'zIndex': 100 + (index * -1) }}>
                    <div>
                        <img src={image} />
                        <p className={classes.Description}
                            style={{ 'zIndex': 101 + (index * -1) }}>
                            {this.props.ids[index].name}
                        </p>
                    </div>
                </li>);
            })
        }



        /*  if (this.state.loading) {
     
                 listElements = new Array(10)
     
                 for (let i = 0; i <= 10; i++) {
                     listElements.push(<li
                         key={Math.random() * i}
                         style={{ 'zIndex': 100 + (i * -1) }}>
                         <div>
                             <Spinner />
                         </div>
                     </li>);
                 }
             }  */



        return (
            <div className={classes.Coverflow} id="Coverflow" >
                <ul className={classes.item} id="items">
                    <div></div>
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



export default connect(mapStatetoProps)(Coverflow);