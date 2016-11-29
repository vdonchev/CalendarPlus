import React, {Component} from 'react';

import './Login.css';

export default class Login extends Component {
    render() {
        return (
            <div className="row">
                <div className="col-md-5">
                    <form onSubmit={this.processLogin.bind(this)}>
                        <div className="form-group">
                            <label htmlFor="loginUsername">Username</label>
                            <input type="text" className="form-control" id="loginUsername" placeholder="Username"
                                   ref={(val) => this.username = val} defaultValue="user"/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="loginPassword">Password</label>
                            <input type="password" className="form-control" id="loginPassword" placeholder="Password"
                                   ref={(val) => this.password = val} defaultValue="pass"/>
                        </div>
                        <button type="submit" className="btn btn-default">Log-in</button>
                    </form>
                </div>
            </div>
        );
    }

    processLogin(event) {
        event.preventDefault();
        this.props.submit(this.username.value, this.password.value);
    }
}