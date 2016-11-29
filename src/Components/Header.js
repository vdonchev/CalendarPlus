import React, {Component} from 'react';
import Navigation from './Navigation';

import './Header.css';

export default class Header extends Component {
    render() {
        return (
            <header className="header clearfix">
                <Navigation
                    userLoggedIn={this.props.userLoggedIn}
                    home={this.props.homeClick}
                    register={this.props.registerClick}
                    login={this.props.loginClick}
                    logout={this.props.logoutClick}
                />
            </header>
        );
    }
}