import React, {Component} from 'react';
import Logo from './logo.png';
import './Header.css';

export default class Header extends Component {
    render() {
        return (
            <div className="header clearfix">
                <nav>
                    {this.props.children}
                </nav>
                <img src={Logo} className="logo" alt="Calendar"/>
                <hr/>
            </div>
        );
    }
}