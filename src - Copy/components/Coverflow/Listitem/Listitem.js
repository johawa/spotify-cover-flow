import React, { Component } from 'react';

import classes from './Listitem.css'
import { Front, Back } from './FrontAndBack/FrontAndBack';

class Listitem extends Component {
    state = {
        active: false,
        target: null
    }

    li = (e) => {
        console.log('clicked')
        const target = e.target.alt
        this.setState({ active: !this.state.active })
    }


    render() {


        return (

            <li {...this.props}
                className={classes.Listitem}
                //onClick={(e) => this.li(e)}
            >

                <div>

                    <Front active={this.state.active}>
                        {this.props.children}
                    </Front>

                    <Back active={this.state.active}>
                        
                    </Back>

                </div>

            </li>

        );
    }
}

export default Listitem;


