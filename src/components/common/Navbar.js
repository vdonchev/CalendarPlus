import React, {Component} from 'react';

export default class Navbar extends Component {
    render() {
        return (
            <ul className="nav nav-pills pull-right">
                {this.props.children}
            </ul>
        );
    }
}