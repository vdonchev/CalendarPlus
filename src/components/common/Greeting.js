import React, {Component} from 'react';

export default class Greeting extends Component {
    render() {
        if (this.props.user === '' || this.props.user === undefined) {
            return null;
        } else {
            return (
                <span>Welcome, <strong>{this.props.user}</strong>!</span>
            );
        }
    }
}