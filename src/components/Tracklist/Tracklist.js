import React, { Component } from 'react';
import format from 'format-duration';

import classes from './Tracklist.css';
import Track from './Track/Track';
import Spinner from '../UI/Spinner/Spinner';

/* 
duration = prettyMs(this.props.duration, {secDecimalDigits: 0}); */

class Tracklist extends Component {

    render() {
        let tracklist = <Spinner />

        if (this.props.id && this.props.tracklist.length >= 0) {


            tracklist = this.props.tracklist.map((item, index) => {
                
                const calcedDuration = format(item[0].duration);


                return (<Track
                    key={index}
                    nr={item[0].number}
                    name={item[0].name}
                    uri={item[0].uri}
                    duration={calcedDuration}
                ></Track>);
            });
        }

        return (
            <div className={classes.Tracklist}>
                <ol className={classes.Ol}>
                    {tracklist}
                </ol>
            </div>
        );
    }
};

export default Tracklist;