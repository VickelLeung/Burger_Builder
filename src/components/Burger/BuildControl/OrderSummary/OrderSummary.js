import React from 'react';

import Aux from '../../../../hoc/Aux'
import Button from '../../../UI/Button/Button'
const orderSummary = (props) => {

    const ingredientSummary = Object.keys(props.ingredient)
        .map(igKey => {
            return <li key={igKey}>
                <span style={{ transform: 'capitalize' }}>
                    {igKey}
                </span >
                : {props.ingredient[igKey]}
            </li >
        });

    //this is what we want
    //<li>Salad:1</li>

    return (
        <Aux>
            <div>
                <h3>Your order summary</h3>
                <p>A burger with the following ingredients</p>

                <ul>
                    {ingredientSummary}
                </ul>
                <p>Continue to checkout?</p>

                <p><strong>Your total price is: ${props.price.toFixed(2)}</strong></p>

                <Button btnType="Danger" clicked={props.purchaseCancel}>Cancel</Button>
                <Button btnType="Success" clicked={props.purchaseContinue}>Continue</Button>

            </div>
        </Aux>
    );
};

export default orderSummary;