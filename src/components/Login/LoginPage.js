import React, {Component} from 'react';
import LoginForm from './LoginForm';
import {login} from '../../models/user';
import {validateString} from "../common/validator";

export default class LoginPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            submitDisabled: false,
            userValidation: {'border': ''},
            passValidation: {'border': ''}
        };
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

        if (validateString(this.state.username)) {
            this.setState({
                submitDisabled: false,
                userValidation: {'border': '3px solid red'},
                passValidation: {'border': ''}
            });
            return;
        }

        if (validateString(this.state.password)) {
            this.setState({
                submitDisabled: false,
                passValidation: {'border': '3px solid red'},
                userValidation: {'border': ''}
            });
            return;
        }

        this.setState({
            submitDisabled: true,
            userValidation: {'border': ''},
            passValidation: {'border': ''}
        });

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
                        passValidation={this.state.passValidation}
                        userValidation={this.state.userValidation}
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