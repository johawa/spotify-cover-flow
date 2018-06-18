import React from 'react';

import classes from './Modal.css';
import Aux from '../../../hoc/Auxilary'
import Backdrop from '../Backdrop/Backdrop';

const modal = (props) => (
    <Aux>
    {/*     <Backdrop show={props.show} modalClosed={props.modalClosed} /> */}
        <div
            className={classes.Modal}
            style={{
                transform: props.show ? 'scale(1)' : 'scale(0)',
                opacity: props.show ? '1' : '0',
            }}>
            {props.children}
            <h2> TEST</h2>
        </div>
    </Aux>
);

export default modal 