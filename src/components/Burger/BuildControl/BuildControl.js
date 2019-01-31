import React from 'react';
import BuildController from './BuildController/BuildController'
import classes from './BuildControl.css'

const controls = [
    { label: 'Salad', type: 'salad' },
    { label: 'Bacon', type: 'bacon' },
    { label: 'Meat', type: 'meat' },
    { label: 'Cheese', type: 'cheese' }
]

const BuildControl = (props) => (
    <div className={classes.BuildControl}>
        {/* <p>count:{props.ingCount[1]}</p> */}
        <p>Current price:{props.price.toFixed(2)}</p>
        {/* <p>{props.ingCount}</p> */}
        {
            controls.map(ctrl => (
                <BuildController
                    key={ctrl.label}
                    label={ctrl.label + ": " + props.ingCount[ctrl.type]}
                    added={() => props.addIngredients(ctrl.type)}
                    removed={() => props.removeIngredients(ctrl.type)}
                // disabled={props.disabled}
                />
            ))}

        <button
            className={classes.OrderButton}
            onClick={props.ordered}
        >Order</button>
    </div >
);

// disabled={props.disabled[ctrl.type]}
export default BuildControl;