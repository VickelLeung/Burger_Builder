import React from 'react'
import classes from './Order.css'

const Order = (props) => {

    const ingredients = [];

    for (let ingredientName in props.ingredients) {
        ingredients.push({
            name: ingredientName,
            amount: props.ingredients[ingredientName]
        });
    }

    const ingredientOutput = ingredients.map(ig => {
        return <span
            key={ig.name}
            style={{
                textTransform: 'capitalize',
                display: 'inline-bloc',
                margin: '0 8px',
                border: '1px solid gray'
            }}
        >{ig.name}({ig.amount})
        </span>
    })

    return (
        <div className={classes.Order}>
            <p>Ingredients: {ingredientOutput}</p>
            <p>Price:{Number.parseFloat(props.price)}</p>
        </div>
    )
};

export default Order;