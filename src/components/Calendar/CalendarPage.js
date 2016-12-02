import React, {Component} from 'react';
import Task from './Tasks';
import {loadTasks} from '../../models/task';
import {Link} from 'react-router';

export default class CalendarPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            teams: []
        };
        this.bindEventHandlers();
    }

    bindEventHandlers() {
        this.onLoadSuccess = this.onLoadSuccess.bind(this);
    }

    onLoadSuccess(response) {
        // Display teams
        this.setState({teams: response})
    }

    componentDidMount() {
        // Request list of teams from the server
        loadTasks(this.onLoadSuccess);
    }

    render() {
        let createLink = null;
        if (!sessionStorage.getItem('authToken')) {
            createLink = <Link to="/create" className="btn btn-default">Create team</Link>
        }

        return (
            <div>
                <h1>Calendar Page</h1>
                {createLink}
                <div>
                    /*print Calendar*/
                </div>
            </div>
        );
    }
}