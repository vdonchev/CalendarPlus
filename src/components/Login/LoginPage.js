import React, {Component} from 'react';
import LoginForm from './LoginForm';
import {login} from '../../models/user';

export default class LoginPage extends Component {
    constructor(props) {
        super(props);
        this.state = {username: '', password: '', submitDisabled: false};
        this.bindEventHandlers();
    }

    bindEventHandlers() {
        // Make sure event handlers have the correct context
        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.onSubmitHandler = this.onSubmitHandler.bind(this);
        this.onSubmitResponse = this.onSubmitResponse.bind(this);
    }

    onChangeHandler(event) {
        switch (event.target.name) {
            case 'username':
                this.setState({username: event.target.value});
                break;
            case 'password':
                this.setState({password: event.target.value});
                break;
            default:
                break;
        }
    }

    onSubmitHandler(event) {
        event.preventDefault();
        this.setState({submitDisabled: true});
        login(this.state.username, this.state.password, this.onSubmitResponse);
    }

    onSubmitResponse(response) {
        if (response === true) {
            this.context.router.push('/');
        } else {
            this.setState({submitDisabled: false});
        }
    }

    render() {
        return (
            <div className="clearfix">
                <div className="col-md-offset-4 col-md-4">
                    <h1>Login</h1>
                    <hr/>
                    <LoginForm
                        username={this.state.username}
                        password={this.state.password}
                        submitDisabled={this.state.submitDisabled}
                        onChangeHandler={this.onChangeHandler}
                        onSubmitHandler={this.onSubmitHandler}
                    />
                </div>
            </div>
        );
    }
}
//attach the React router
LoginPage.contextTypes = {
    router: React.PropTypes.object
};