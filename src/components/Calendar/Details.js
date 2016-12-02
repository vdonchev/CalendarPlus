import React, {Component} from 'react';
import {loadTasks, loadTaskDetails} from '../../models/task';
import TaskControls from './TaskControls';
import './Details.css';
import {deleteTask} from "../../models/user";

export default class Details extends Component {
    constructor(props) {
        super(props);
        this.state ={
            name: '',
            description: '',
            tasks: [],
            canEdit: false
        };

        this.bindEventHandlers();
    }

    bindEventHandlers() {
        this.onLoadSuccess = this.onLoadSuccess.bind(this);
        this.onUsersSuccess = this.onUsersSuccess.bind(this);
        this.onDel = this.onDel.bind(this);
        this.statusChange = this.statusChange.bind(this);
    }


    onDel(event) {
        event.preventDefault();
        deleteTask(this.statusChange);
    }

    statusChange(response) {
        this.context.router.push('/');
    }

    componentDidMount() {
        loadTasks(this.onLoadSuccess);
    }

    onLoadSuccess(response) {
        let newState = {
            name: response.name,
            description: response.comment
        };
        if (response._acl.creator === sessionStorage.getItem('userId')) {
            newState.canEdit = true;
        }
        this.setState(newState);
    }

    onUsersSuccess(response) {
        this.setState({
            tasks: response
        });
    }

    render() {
        let title = 'Task details';
        if (this.state.name !== '') {
            title = this.state.name + ' details';
        }

        //add task details

        return (
            <div className="details-box">
                <span className="titlebar">{title}</span>
                <span className="spanner">Tasks</span>
                {this.state.tasks}
                <span className="spanner">Description</span>
                <p>{this.state.description || 'No description'}</p>
                <span className="spanner">Task management</span>
                <TaskControls
                    canEdit={this.state.canEdit}
                />
            </div>
        )
    }
}

Details.contextTypes = {
    router: React.PropTypes.object
};