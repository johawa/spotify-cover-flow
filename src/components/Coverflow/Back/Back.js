import React, { Component } from 'react';
import classes from './Back.css';

class Back extends Component {


    render() {          
        return (
            <div className={classes.Back}  onClick={this.props.clicked} >
                {this.props.children}              
            </div>
        );
    }
}


export default Back;