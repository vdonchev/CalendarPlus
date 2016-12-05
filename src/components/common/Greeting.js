import React, {Component} from 'react';

export default class Greeting extends Component {
    render() {
        let username = sessionStorage.getItem('username');
        if (username === null || username === '' || username === undefined) {
            return null;
        } else {
            return (
                <a className="btn disabled-text">Hi, <strong>{username}</strong>!</a>
            );
        }
    }
}