import React, { Component } from 'react';
import { connect } from 'react-redux'
import CheckOutSummary from '../../components/Order/CheckOutSummary/CheckOutSummary'

import { Route, Redirect } from 'react-router-dom'
import ContactData from './ContactData/ContactData'
import * as actions from '../../store/actions/index'

class Checkout extends Component {

    // componentDidMount() {
    //     this.props.onInitPurchase()
    // }

    //remove the stack and go back previous page
    checkOutCancelHandler = () => {
        this.props.history.goBack();
    }

    //replace the page and go to contact-data
    checkOutContinueHandler = () => {
        this.props.history.replace('/checkout/contact-data');
    }
    render() {

        let summary = <Redirect to="/" />

        if (this.props.ings) {
            const purchaseRedirect = this.props.purchased ? <Redirect to="/" /> : null

            summary = (
                <div>
                    {purchaseRedirect}
                    <CheckOutSummary
                        ingredients={this.props.ings}

                        checkoutCancel={this.checkOutCancelHandler}
                        checkoutContinue={this.checkOutContinueHandler}
                    />

                    <Route path={this.props.match.path + '/contact-data'}
                        //by using render, we can pass props
                        // render={(props) => (<ContactData ingredients={this.state.ingredients} price={this.state.totalPrice} {...props} />)} 
                        component={ContactData}
                    />
                </div>
            );
        }
        return summary
    }
}

const mapStateToProps = state => {

    return {
        //has to be the same as the reduce state
        ings: state.ingredients,
        price: state.totalPrice,
        purchased: state.order.purchased
    }
};

// const mapDispatchToProps = dispatch => {
//     return {
//         onInitPurchase: () => dispatch(actions.purchaseInit)
//     };
// };

//don't need dispatch, since we are not dispatching anything
// connect(null,dispatchToProps) -> if we don't have stateToProps (orders matters)

export default connect(mapStateToProps)(Checkout);