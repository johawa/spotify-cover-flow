import React, { Component } from 'react';

import Aux from '../../hoc/Auxilary';
import classes from './Layout.css';

class Layout extends Component {

    render() {
        return (
            <Aux>
                <div className={classes.Menu}>Menu</div>

                <main className={classes.Main}>
                    Main
                    {this.props.children}
                </main>

                <footer className={classes.Footer}>Footer</footer>



            </Aux>
        )
    }
}

export default Layout;
