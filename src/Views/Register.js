import React, {Component} from 'react';
import './Register.css';

export default class Register extends Component {
    render() {
        return (
            <div className="row">
                <div className="col-md-5">
                    <form onSubmit={this.processRegister.bind(this)}>
                        <h1>Register</h1>
                        <label htmlFor="registerUsername">Username</label>
                        <input type="text" className="form-control" id="registerUsername" name="username" required
                               ref={(val) => this.username = val} defaultValue=""/>
                        <div className="form-group">
                            <label htmlFor="registerPassword">Password</label>
                            <input type="password" className="form-control" id="registerPassword" name="password"
                                   required
                                   ref={(val) => this.password = val} defaultValue=""/>
                        </div>
                        <button type="submit" className="btn btn-default">Register</button>
                    </form>
                </div>
            </div>
        );
    }

    processRegister(event) {
        event.preventDefault();
        this.props.submit(
            this.username.value, this.password.value);
    }
}