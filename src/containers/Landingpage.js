import React, { Component } from 'react';

import Aux from '../hoc/Auxilary';
import Coverflow from '../components/Coverflow/Coverflow';
import Tracklist from '../components/Tracklist/Tracklist';
import Searchform from '../components/UI/Searchform/Searchform';

class Landingpage extends Component {
    state = {
        query: '',
        searched: false
    }

    submitform = (event) => {
        event.preventDefault();
        let query = event.target.value;
        this.setState({ query: query });
        this.setState({ searched: true });
    }

    render() {
        let coverflow = <div>Please Search for an Artist</div>

        if (this.state.searched && this.state.query.length >= 1) {
            coverflow = <Coverflow query={this.state.query}/>
        }
        
        return (
            <Aux>
                <Searchform submit={this.submitform} />
                {coverflow}
                <Tracklist />
            </Aux>
        );
    }
}


export default Landingpage;