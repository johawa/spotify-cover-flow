import React, { Component } from 'react';

import axios from '../../axios-query';


class Profile extends Component {
    state = {
        data: null
    }

    componentDidMount() {
        console.log(this.props.history)
        axios.get('/me').then(data => this.setState({ data: data.data.id }))
    }


    render() {
        return (
            <div>
                <h2>Profile Page</h2>
                <p>{this.state.data}</p>                
            </div>
        )
    }
}

export default Profile;