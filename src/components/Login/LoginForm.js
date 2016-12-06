import React, {Component} from 'react';

export default class LoginForm extends Component {
    render() {
        return (
            <form onSubmit={this.props.onSubmitHandler}>
                <div className="form-group">
                    <label>Username:</label>
                    <input
                        style={this.props.userValidation}
                        className="form-control"
                        type="text"
                        name="username"
                        value={this.props.username}
                        disabled={this.props.submitDisabled}
                        onChange={this.props.onChangeHandler}
                        placeholder="Username"
                    />
                </div>
                <div className="form-group">
                    <label>Password:</label>
                    <input
                        style={this.props.passValidation}
                        className="form-control"
                        type="password"
                        name="password"
                        value={this.props.password}
                        disabled={this.props.submitDisabled}
                        onChange={this.props.onChangeHandler}
                        placeholder="Password"
                    />
                </div>
                <input className="btn btn-block btn-primary" type="submit" value="Login"
                       disabled={this.props.submitDisabled}/>
            </form>
        );
    }
}