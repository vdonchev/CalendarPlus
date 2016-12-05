import React, {Component} from 'react';
import {Link} from 'react-router';
import {loadTodayTasks} from "../../models/task";

export default class HomePage extends Component {
    render() {
        let homeScreen = (
            <div className="jumbotron">
                <h1 className="display-3">Calendar+</h1>
                <p className="lead">Simple. User friendly. Available on the web. That's calendar+!</p>
                <p className="">The next generation task manager.</p>
                <p>
                    <Link to="/register" className="btn btn-lg btn-success">Sign up today</Link>
                    <Link to="/login" className="btn btn-lg">Log-in</Link>
                </p>
            </div>
        );

        //fetching the data
        let tasks = loadTodayTasks();

        if (sessionStorage.getItem('username')) {
            homeScreen = (
                <div className="jumbotron">
                    <p>Your tasks for today:</p>
                    <div>{tasks}</div>
                </div>
            )
        }

        return homeScreen;
    }
}