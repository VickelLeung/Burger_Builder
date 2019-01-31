import React from 'react';
import classes from './Modal.css'

import Aux from '../../../hoc/Aux'
import Backdrop from '../Backdrop/Backdrop'

const modal = (props) => (
    <Aux>
        <Backdrop show={props.show} clickOut={props.modalClosed} />
        <div
            className={classes.Modal}
            style={{                    //show true else slide outside with -100
                transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
                opacity: props.show ? '1' : '0'
            }}>
            {props.children}
        </div>
    </Aux>
);

export default modal;