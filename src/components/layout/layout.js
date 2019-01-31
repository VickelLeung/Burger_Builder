import React, { Component } from 'react';

import Aux from '../../hoc/Aux'
import classes from './Layout.css'
import Toolbar from '../Navigation/Toolbar/Toolbar'
import SideDrawer from '../Navigation/SideDrawer/SideDrawer'


class Layout extends Component {

    state = {
        showSideDrawer: true
    }

    SideDrawerCloseHandler = () => {
        this.setState({ showSideDrawer: false });
    }

    SideDrawerToggleHandler = () => {

        this.setState((prevState) => {
            console.log({ prevState });
            return { showSideDrawer: !prevState.showSideDrawer }
        })
    }

    render() {
        return (
            <Aux>
                {/* <div>
            Toolbar, Sidebar, Backdrop
    </div> */}
                <Toolbar DrawerToggleClick={this.SideDrawerToggleHandler} />
                <SideDrawer opened={this.state.showSideDrawer} closed={this.SideDrawerCloseHandler} />
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Aux>

        )
    }
}

export default Layout;