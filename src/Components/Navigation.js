import React, {Component} from 'react';

export default class Navigation extends Component {
    render() {
        let menuItems = [];
        if (this.props.userLoggedIn) {
            menuItems = [
                <li key="logout" className="nav-item" onClick={this.props.logout}><a className="nav-link" href="#">Log-out</a></li>
            ]
        } else {
            menuItems = [
                <li key="register" className="nav-item" onClick={this.props.register}><a className="nav-link" href="#">Register</a></li>,
                <li key="login" className="nav-item" onClick={this.props.login}><a className="nav-link" href="#">Log-in</a></li>,
            ]
        }

        return (
            <nav>
                <ul className="nav nav-pills pull-right">
                    <li className="nav-item active" onClick={this.props.home}><a className="nav-link" href="#">Home</a></li>
                    {menuItems}
                </ul>

                <h1 className="h2 text-muted">Calendar+</h1>
            </nav>
        );
    }
}