import React, { Component } from 'react';
import { connect } from 'react-redux'

import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControl/BuildControl'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/BuildControl/OrderSummary/OrderSummary'
import Spinner from '../../components/UI/Spinner/Spinner'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'

import * as burgerBuilderActions from '../../store/actions/burgerBuilder'
import axios from '../../axios-orders'


class BurgerBuilder extends Component {

    state = {
        ingredient_counter: {
            salad: 0,
            cheese: 0,
            meat: 0,
            bacon: 0
        },

        purchasable: false,
        purchasing: false,

    }

    componentDidMount() {

        this.props.onInitIngredients();

        // axios.get("https://react-my-burger-fbd05.firebaseio.com/ingredients.json")
        //     .then(response => {
        //         //response should contain ingredient offset
        //         this.setState({ ingredient: response.data })

        //     })
        //     .catch(error => {
        //         this.setState({ error: error })
        //     });

    }

    updatePurchaseState(ingredient) {
        // create a new object reference to ingredient
        // const ingredient = {
        //     ...this.props.ings
        // }
        // sum all the ingredient price using object key to map inside
        const sum = Object.keys(ingredient).map(igkey => {
            return ingredient[igkey];
            //use reduce to sum all element
        }).reduce((sum, el) => { return sum + el; }, 0);

        //set the state true or false
        return sum > 0;

        // const sum = Object.keys(ingredient)
        //     .map(igKey => {
        //         return ingredient[igKey];
        //     })
        //     .reduce((sum, el) => {
        //         return sum + el;
        //     }, 0);
        // return sum > 0;

    }


    purchaseCancelHandler = () => {
        console.log("cancelled")
        this.setState({ purchasing: false })
    }

    purchaseHandler = () => {
        this.setState({ purchasing: true })
    }

    purchaseContinueHandler = () => {

        // const queryParams = [];
        // for (let i in this.state.ingredient) {
        //     //property name = property value 
        //     queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredient[i]));
        // }
        // queryParams.push('price=' + this.state.totalPrice);
        // const queryString = queryParams.join('&');

        //switch page and push a new page to stack ->go to checkout
        this.props.onInitPurchase();
        this.props.history.push('/checkout');

    }

    render() {

        const disableInfo = {
            ...this.props.ings
        };
        for (let key in disableInfo) {
            disableInfo[key] = disableInfo[key] <= 0
        }
        let orderSummary = null;

        let burger = this.props.error ? <p>Error can't load ingredient</p> : <Spinner />

        if (this.props.ings) {

            burger = (
                <Aux>
                    <Burger ingredient={this.props.ings} />

                    <BuildControls
                        addIngredients={this.props.onIngredientsAdded}
                        removeIngredients={this.props.onIngredientsRemoved}
                        price={this.props.price}
                        ingCount={this.state.ingredient_counter}
                        disabled={this.disableInfo}
                        purchasable={this.updatePurchaseState(this.props.ings)}
                        ordered={this.purchaseHandler}
                    />

                </Aux>
            );

            orderSummary = <OrderSummary
                price={this.props.price}
                purchaseCancel={this.purchaseCancelHandler}
                purchaseContinue={this.purchaseContinueHandler}
                ingredient={this.props.ings} />
        }

        return (
            <Aux>
                {/* to show modals */}
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler} >

                    {orderSummary}
                    {/* <OrderSummary
                        price={this.state.totalPrice}
                        purchaseCancel={this.purchaseCancelHandler}
                        purchaseContinue={this.purchaseContinueHandler}
                        ingredient={this.state.ingredient} /> */}
                </Modal>
                {burger}

                {/* <p>{this.state.ingredient_counter['salad']}</p> */}

                {/* <Burger ingredient={this.state.ingredient} /> */}

                {/* control of apps i.e: add,remove,order */}
                {/* <BuildControls
                    addIngredients={this.addIngredientsHandler}
                    removeIngredients={this.removeIngredientHandler}
                    price={this.state.totalPrice}
                    disabled={this.disableInfo}
                    purchasable={this.state.purchasable}
                    ordered={this.purchaseHandler}
                /> */}
            </Aux>
        );
    }
}

const mapStateToProps = state => {
    return {
        ings: state.ingredients,
        price: state.totalPrice,
        error: state.error
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onIngredientsAdded: (ingName) => dispatch(burgerBuilderActions.addIngredient(ingName)),
        onIngredientsRemoved: (ingName) => dispatch(burgerBuilderActions.removeIngredient(ingName)),
        onInitIngredients: () => dispatch(burgerBuilderActions.initIngredients()),
        onInitPurchase: () => dispatch(burgerBuilderActions.purchaseInit())
    }
}


// disabled={this.disableInfo}
export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));