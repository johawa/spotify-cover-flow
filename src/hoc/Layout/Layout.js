import React, { Component } from 'react';
import { connect } from 'react-redux';

import Aux from '../../hoc/Auxilary';
import classes from './Layout.css';
import Player from '../../components/Player/Player';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import Modal from '../../components/UI/Modal/Modal';

class Layout extends Component {
    render() {

        return (

            <div className={classes.Container}>
                <header className={classes.Header}>
                    <Toolbar />
                </header>
                <main className={classes.Main}>
                    {this.props.children}

                   {/*  <Modal show={false}>
                        {this.props.tracklistProp}
                    </Modal> */}
                </main>
                <div className={classes.Player}>
                    <Player />
                </div>
            </div>

        )
    }
}

const mapStateToProps = state => {
    return {
        access_token: state.access_token
    };
}

export default connect(mapStateToProps)(Layout);
