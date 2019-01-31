import React from 'react';

import classes from './BuildController.css'

const buildController = (props) => (
    <div className={classes.BuildController}>
        <div className={classes.Label}>{props.label}</div>
        <button className={classes.Less}
            onClick={props.removed}
            disabled={props.disabled}
        >Less</button>
        <button className={classes.More} onClick={props.added}>More</button>
    </div>
);

// disabled={props.disabled}

export default buildController;