import React, { Component } from 'react';
import { connect } from 'react-redux';

import classes from './Progressbar.css';
import { player } from '../../../App';

class Progressbar extends Component {
    constructor(props) {
        super(props);
        this.startInterval = this.startInterval.bind(this);
        this.state = {
            seeking: false,
            position: 0,
            status: false
        }
    }


    handleChange = (event) => {
        const value = event.target.value
        this.setState({ position: value })
        this.setState({ seeking: true })
    }

    handleSubmit = () => {
        if (this.state.seeking) {
            player.seek(this.state.position).then(() => {
                console.log('Changed position!');
            });
        }
        this.setState({ seeking: false })
    }

    shouldComponentUpdate(nextProps) {

        if (this.props.playingFromPlayer !== nextProps.playingFromPlayer) {
            //console.log(this.props.playingFromPlayer, nextProps.playingFromPlayer)
            //console.log('new prop');
            const state = this.state.status;
            this.setState({status: !state})
            setTimeout(() => {
                this.startInterval();
            }, 100);          
           
        }
        return true      
    }


    startInterval = () => {

        
        if (this.state.status === true) {    

            console.log('Interval Started')
            this.Interval = setInterval(() => {
                player.getCurrentState()
                    .then(state => {
                        this.setState({ position: state.position })
                    })
            }, 1000);

        }

        if (this.state.status === false) {
            console.log('clear Interval')
            clearInterval(this.Interval)
        }        

    }



    render() {


        let value = "0";

        if (this.state.seeking) {
            value = this.state.position
        }

        if (!this.state.seeking && this.state.position !== 0) {
            value = this.state.position
        }

        return (

            <div className={classes.Progressbar}>
                {this.state.position}
                <input
                    type="range"
                    value={value}
                    max={this.props.duration}
                    onChange={this.handleChange}
                    onTouchEnd={this.handleSubmit}
                    onMouseUp={this.handleSubmit}
                />
            </div>

        );
    }
};

const mapStateToProps = state => {
    return {
        duration: state.current_playback_data.duration,
        playing: state.playing
    };
}


export default connect(mapStateToProps)(Progressbar);