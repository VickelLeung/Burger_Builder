import React from 'react';

import Burger from '../../Burger/Burger'
import Button from '../../UI/Button/Button'
import classes from './CheckOutSummary.css'

const CheckOutSummary = (props) => {

    return (
        <div className={classes.CheckOutSummary}>
            <h1>Please click continue to finish your order!</h1>
            <div style={{ width: '100%', margin: "auto" }}>

                <Burger ingredient={props.ingredients} />
            </div>
            <Button btnType="Danger" clicked={props.checkoutCancel}>CANCEL</Button>
            <Button btnType="Success" clicked={props.checkoutContinue}>Continue</Button>
        </div>
    )
}

export default CheckOutSummary;