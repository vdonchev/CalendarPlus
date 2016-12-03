import React, {Component} from 'react';
import {Link} from 'react-router';
import './Tasks.css';

export default class Tasks extends Component {
    render() {
        return(
            <Link to={"/create/" + this.props.taskId} className="tasks-box">
                <span className="spanner">Task</span>
                <span className="title">{this.props.title}</span>
                <span className="spanner">Description</span>
                <p>{this.props.body || 'No description'}</p>
            </Link>
        )
    }
}