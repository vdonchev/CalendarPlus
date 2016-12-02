import React, {Component} from 'react';
import {Link} from 'react-router';
import './Tasks.css';

export default class Tasks extends Component {
    render() {
        return(
            <Link to={"/create/" + this.props.id} className="tasks-box">
                <span className="spanner">Task</span>
                <span className="title">{this.props.name}</span>
                <span className="spanner">Description</span>
                <p>{this.props.description || 'No description'}</p>
            </Link>
        )
    }
}