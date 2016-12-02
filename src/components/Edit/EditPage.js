import React, {Component} from 'react';
import EditForm from './EditForm';
import {loadTaskDetails, edit} from '../../models/task';

export default class EditPage extends Component {
    constructor(props) {
        super(props);
        this.state = {name: '', description: '', submitDisabled: true};
        this.bindEventHandlers();
    }

    componentDidMount() {
        // Populate form
        loadTeamDetails(this.props.params.teamId, this.onLoadSuccess);
    }

    bindEventHandlers() {
        // Make sure event handlers have the correct context
        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.onSubmitHandler = this.onSubmitHandler.bind(this);
        this.onSubmitResponse = this.onSubmitResponse.bind(this);
        this.onLoadSuccess = this.onLoadSuccess.bind(this);
    }

    onLoadSuccess(response) {
        this.setState({
            name: response.name,
            description: response.comment,
            submitDisabled: false
        });
    }

    onChangeHandler(event) {
        event.preventDefault();
        let newState = {};
        newState[event.target.name] = event.target.value;

        //TO DO perform validation!!

        this.setState(newState);

    }

    onSubmitHandler(event) {
        event.preventDefault();

        //TO DO perform validation! Task name/description


        edit(this.props.params.dateId, this.state.name, this.state.description, this.onSubmitResponse);
    }

    onSubmitResponse(response) {
        if (response === true) {
            // Navigate away from login page
            this.context.router.push('/');
        } else {
            // Something went wrong, let the user try again
            this.setState({submitDisabled: false});
        }
    }

    render() {
        return (
            <div>
                <h1>Edit Page</h1>
                <EditForm
                    name={this.state.name}
                    description={this.state.description}
                    submitDisabled={this.state.submitDisabled}
                    onChangeHandler={this.onChangeHandler}
                    onSubmitHandler={this.onSubmitHandler}
                />
            </div>
        );
    }
}

EditPage.contextTypes = {
    router: React.PropTypes.object
};