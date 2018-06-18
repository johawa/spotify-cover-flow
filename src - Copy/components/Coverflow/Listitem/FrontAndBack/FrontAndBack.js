import React from 'react';

import classes from './FrontAndBack.css';
import Tracklist from '../../../Tracklist/Tracklist';

export const Front = (props) => {
    let css = classes.Front
    if (props.active) {
        css = [classes.Front, classes.FlippedFront].join(' ');
    }

    return (
        <div className={css}>
            {props.active ? null : <p>Active Front</p>}
            {props.children}
        </div>
    );

};


export const Back = (props) => {
    let css = classes.Back
    if (props.active) {
        css = [classes.Back, classes.FlippedBack].join(' ');
    }

    return (
        <div className={css}>
            {props.active ? <div>Tracklist: </div>: null}
            {props.children}
        </div>
    );

};



