import React from 'react';

import classes from '../Burger/Burger.css';
import BurgerIngredient from './BurgerIngredients/BurgerIngredients';

const Burger = (props) => {

    //Object.keys take obj as arg and return an array of string 

    let transformingBurger = Object.keys(props.ingredient)
        .map(igkey => {
            return [...Array(props.ingredient[igkey])].map((_, i) => {

                return <BurgerIngredient key={igkey + i} type={igkey} />;
            });
            //reduce allow to transfert array into something else
        }).reduce((arr, el) => {
            //return the updated value (take the given el in looping then add it)
            return arr.concat(el);
        }, []);

    //if lenght is zero then allow to start adding
    if (transformingBurger.length === 0) {
        transformingBurger = <p>Please start adding ingredients</p>
    }

    return (
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top" />
            {transformingBurger}
            <BurgerIngredient type="bread-bottom" />
        </div>
    );

};

export default Burger;