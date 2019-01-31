import React, { Component } from 'react';
import { Route } from 'react-router-dom'
import Layout from './components/layout/layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import Orders from './containers/Orders/Orders'
import AUth from './containers/Auth/Auth';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Layout>

          <Route path="/checkout" component={Checkout} />
          <Route path='/orders' component={Orders} />
          <Route path="/auth" />
          <Route path="/" exact component={BurgerBuilder} />

          {/* <BurgerBuilder /> */}
          {/* <Checkout /> */}
        </Layout>
      </div>
    );
  }
}

export default App;
