import React, {Component} from 'react';
import TaskControls from './TaskControls';
import './Details.css';
import {deleteTask} from "../../models/user";

export default class Details extends Component {
    constructor(props) {
        super(props);
        this.state = {
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
        //perform something after deletion?
        // TO DO: perform routing, ?
        this.context.router.push('/');
    }

    componentDidMount() {
        // TO DO: find a way to pass the specific day / id for the task here
        //when you click on edit on a specific task

        //loadDayTask(this.onLoadSuccess);
    }

    onLoadSuccess(response) {
        let newState = {
            title: response.title,
            body: response.body
        };
        if (response._acl.creator === sessionStorage.getItem('userId')) {
            newState.canEdit = true;
        }

        this.setState(newState);
    }

    onUsersSuccess(response) {
        let temp = [];
        for(let entry of response){
            if(entry._acl.creator === sessionStorage.getItem()){
                temp.push(entry);
            }
        }

        this.setState({
            tasks: temp
        });
    }

    render() {
        let title = 'Task details';
        if (this.state.title !== '') {
            title = this.state.title + ' details';
        }

        //add task details

        return (
            <div className="details-box">
                {this.props.params.year}
                <span className="titlebar">{title}</span>
                <span className="spanner">Tasks</span>
                {this.state.tasks}
                <span className="spanner">Description</span>
                <p>{this.state.body || 'No description'}</p>
                <span className="spanner">Task management</span>
                <TaskControls canEdit={this.state.canEdit}
                />
            </div>
        )
    }
}

Details.contextTypes = {
    router: React.PropTypes.object
};