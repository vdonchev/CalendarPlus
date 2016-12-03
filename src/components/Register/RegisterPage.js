import React, {Component} from 'react';
import RegisterForm from './RegisterForm';
import {register} from '../../models/user';
import observer from '../../models/observer';

export default class RegisterPage extends Component {
    constructor(props) {
        super(props);
        this.state = {username: '', password: '', repeat: '', submitDisabled: false};
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
            case 'repeat':
                this.setState({repeat: event.target.value});
                break;
            default:
                break;
        }
    }

    onSubmitHandler(event) {
        event.preventDefault();
        if (this.state.password !== this.state.repeat) {
            observer.showError("The passwords provided do not match");
            return;
        }

        if(this.state.username.length <= 3){
            observer.showError("Usernames have to be more than 3 characters");
            return;
        }

        if(this.state.password.length <= 3){
            observer.showError("Passwords have to be more than 3 characters");
            return;
        }

        this.setState({submitDisabled: true});
        register(this.state.username, this.state.password, this.onSubmitResponse);
    }

    onSubmitResponse(response) {
        if (response === true) {
            // Navigate away from register page
            this.context.router.push('/');
        } else {
            // Something went wrong, let the user try again
            this.setState({submitDisabled: false});
        }
    }

    render() {
        if (sessionStorage.getItem('username'))
            return null;

        return (
            <div>
                <h1>Login Page</h1>
                <RegisterForm
                    username={this.state.username}
                    password={this.state.password}
                    repeat={this.state.repeat}
                    submitDisabled={this.state.submitDisabled}
                    onChangeHandler={this.onChangeHandler}
                    onSubmitHandler={this.onSubmitHandler}
                />
            </div>
        )
    }
}

RegisterPage.contextTypes = {
    router: React.PropTypes.object
};