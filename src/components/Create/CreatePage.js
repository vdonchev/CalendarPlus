import React, {Component} from 'react';
import CreateForm from '../Edit/EditForm';
import {create} from '../../models/task';

export default class CreatePage extends Component {
    constructor(props) {
        super(props);
        this.state = {title: '', body: '', submitDisabled: false};
        this.bindEventHandlers();
    }

    bindEventHandlers() {
        // Make sure event handlers have the correct context
        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.onSubmitHandler = this.onSubmitHandler.bind(this);
        this.onSubmitResponse = this.onSubmitResponse.bind(this);
    }

    onChangeHandler(event) {
        event.preventDefault();
        let newState = {};
        newState[event.target.title] = event.target.value;

        //TO DO: stop users from accessing components directly and perform validation
        if(sessionStorage.getItem('authToken')){
            this.setState(newState);
        }

    }

    onSubmitHandler(event) {
        event.preventDefault();
        this.setState({submitDisabled: true});
        create(this.state.title, this.state.body, this.onSubmitResponse);
    }

    onSubmitResponse(response) {
        if (response === true) {
            // Navigate away from login page

            //TO DO , task id is the response._id here when created
            this.context.router.push('/');
        } else {
            this.setState({submitDisabled: true});
        }
    }

    render() {
        return (
            <div>
                <h1>Create Task</h1>
                <CreateForm
                    title={this.state.title}
                    body={this.state.body}
                    submitDisabled={this.state.submitDisabled}
                    onChangeHandler={this.onChangeHandler}
                    onSubmitHandler={this.onSubmitHandler}
                />
            </div>
        );
    }
}

CreatePage.contextTypes = {
    router: React.PropTypes.object
};