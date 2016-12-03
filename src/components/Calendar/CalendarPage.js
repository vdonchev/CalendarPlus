import React, {Component} from 'react';
import {loadAllTasks} from '../../models/task';
import {Link} from 'react-router';
import Calendar from './Calendar'

export default class CalendarPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tasks: []
        };

        this.bindEventHandlers();
    }

    bindEventHandlers() {
        this.onLoadSuccess = this.onLoadSuccess.bind(this);
    }

    onLoadSuccess(response) {
        // Display tasks
        this.setState({tasks: response})
    }

    //this is a hook which triggers on component creation
    componentDidMount() {
        // Request all tasks from the server
        loadAllTasks(this.onLoadSuccess);
    }

    render() {
        let createLink = null;
        if (sessionStorage.getItem('authToken')) {
            createLink = <Link to="/create" className="btn btn-default">Create a task</Link>
        }
        return (
            <div>
                <h1>Calendar Page</h1>
                {createLink}
                <div>
                    <Calendar/>
                </div>
            </div>
        );
    }
}