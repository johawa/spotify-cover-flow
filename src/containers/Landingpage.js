import React, { Component } from 'react';



import Aux from '../hoc/Auxilary';
import Tracklist from '../components/Tracklist/Tracklist';
import Searchform from '../components/UI/Searchform/Searchform';

class Landingpage extends Component {
    state = {

    }

    render() {
        return (
            <Aux>               
                <Searchform />
                <Tracklist />
            </Aux>
        );
    }
}


export default Landingpage;