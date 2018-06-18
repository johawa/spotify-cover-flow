import React, { Component } from 'react';
import { connect } from 'react-redux';

import Aux from '../../hoc/Auxilary';
import classes from './Layout.css';
import Player from '../../components/Player/Player';
import NavigationItems from '../../components/Navigation/NavigationItems';

class Layout extends Component {

    render() {
        return (
            <Aux>
                <div>Menu<NavigationItems/></div>

                <main className={classes.Main}>
                    Main
                    {this.props.children}
                </main>

                <div>
                    Player:
                    <Player />
                </div>

                <footer className={classes.Footer}>Footer</footer>
            </Aux>
        )
    }
}

const mapStateToProps = state => {
    return {
        access_token: state.access_token
    };
}

export default connect(mapStateToProps)(Layout);
