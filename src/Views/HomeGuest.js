import React, {Component} from 'react';

import './HomeGuest.css';

export default class HomeGuest extends Component {
    render() {
        return (
            <div className="jumbotron">
                <h1 className="display-3">Calendar+</h1>
                <p className="lead">Simple. User friendly. Available on the web. That's calendar+!</p>
                <p className="">The next generation task manager.</p>
                <p>
                    <a className="btn btn-lg btn-success" href="#" role="button" onClick={this.props.registerClick}>Sign up today</a>
                    <a className="btn btn-lg" href="#" onClick={this.props.loginClick}>Log-in</a>
                </p>
            </div>
        );
    }
}