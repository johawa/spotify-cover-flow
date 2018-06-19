import React, { Component } from 'react';
import { connect } from 'react-redux';
import InputRange from 'react-input-range';
import format from 'format-duration';


import classes from './Progressbar.css';
// eslint-disable-next-line import/no-webpack-loader-syntax
import '!style-loader!css-loader!../../../../node_modules/react-input-range/lib/css/input-range/input-range.css'


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

        const value = event
        this.setState({ position: value })
        clearInterval(this.Interval)
        //this.setState({ seeking: true }) 

    }

    startChange = (event) => {
        this.setState({ seeking: true })

    }

    handleSubmit = () => {
        console.log('submitted')
        if (this.state.seeking) {
            player.seek(this.state.position).then(() => {
                console.log('Changed position!');
            });
        }
        this.setState({ seeking: false })
        this.startInterval();
    }

    shouldComponentUpdate(nextProps) {

        if (this.props.playingFromPlayer !== nextProps.playingFromPlayer) {
            //console.log(this.props.playingFromPlayer, nextProps.playingFromPlayer)
            //console.log('new prop');
            const state = this.state.status;
            this.setState({ status: !state })
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

        let duration = 0;

        if (this.props.duration) {
            duration = format(this.props.duration);
            console.log(duration)
        }

        let value = 0;

        if (this.state.seeking) {
            value = this.state.position
        }

        if (!this.state.seeking && this.state.position !== 0) {
            value = this.state.position
        }

        return (

            <div className={classes.ProgessbarContainer} >

                <InputRange
                    //type="range"
                    formatLabel={value => format(value)}
                    value={value}
                    minValue={0}
                    maxValue={this.props.duration}
                    onChange={this.handleChange}
                    onChangeComplete={this.handleSubmit}
                    onChangeStart={this.startChange}
                />

                <span className={classes.DurationDiv}>{duration}</span>
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