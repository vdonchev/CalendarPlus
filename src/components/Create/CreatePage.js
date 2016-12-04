import React, {Component} from 'react';
import CreateForm from '../Edit/EditForm';
import {create} from '../../models/task';

export default class CreatePage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            title: '',
            body: '',
            submitDisabled: false
        };

        this.bindEventHandlers();
    }

    bindEventHandlers() {
        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.onSubmitHandler = this.onSubmitHandler.bind(this);
        this.onSubmitResponse = this.onSubmitResponse.bind(this);
    }

    onChangeHandler(event) {
        switch (event.target.name) {
            case 'title':
                this.setState({title: event.target.value});
                break;
            case 'body':
                this.setState({body: event.target.value});
                break;
            default:
                break;
        }
    }

    onSubmitHandler(event) {
        event.preventDefault();
        this.setState({submitDisabled: true});

        create(
            Number(this.props.params.day),
            '' + this.props.params.year  + this.props.params.month,
            this.state.title,
            this.state.body,
            this.onSubmitResponse
        );
    }

    onSubmitResponse(response) {
        if (response === true) {
            this.context.router.push('/calendar');
        } else {
            this.setState({submitDisabled: true});
        }
    }

    render() {
        return (
            <div>
                <h1>Create new Task</h1>
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