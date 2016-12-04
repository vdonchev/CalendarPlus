import React, {Component} from 'react';
import Greeting from '../common/Greeting';
import './Navbar.css';

export default class Navbar extends Component {
    render() {
        return (
            <ul className="nav nav-pills pull-right">
                <li className="nav-item disabled-text"><Greeting/></li>
                {this.props.children}
            </ul>
        );
    }
}