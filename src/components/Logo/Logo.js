import React from 'react';

import burgerLogo from '../../assets/Images/burger-logo.png'
import classes from './Logo.css'

const logo = (props) => (
    <div className={classes.Logo}>
        <img src={burgerLogo} alt="myBurger" />
        {props.children}
    </div>
);

export default logo;