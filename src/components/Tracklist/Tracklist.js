import React, { Component } from 'react';

import classes from './Tracklist.css';
import Track from './Track/Track';


class Tracklist extends Component {


    render() {
        //this.props.tracklist.map(item => console.log(item))


        let tracklist = <p>Loading..</p>;

        if (this.props.tracklist.length > 0) {
            tracklist = this.props.tracklist.map((item, index) => {
                return (<Track
                    key={index}
                    nr={item[0].number}
                    name={item[0].name}
                    uri={item[0].uri}
                    duration={item[0].duration}                 
                >
                </Track>);
            });
        }

        return (
            <div>
                <ul>
                    {tracklist}
                </ul>
            </div>

        );
    }
};

export default Tracklist;