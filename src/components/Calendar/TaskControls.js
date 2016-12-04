import React, {Component} from 'react';
import {Link} from 'react-router';

export default class TaskControls extends Component {
    render() {
        return (
            <div className="task-administration text-xs-right">
                <Link className="edit-task text-warning" to={"/edit/" + this.props.taskId}>Edit</Link>&nbsp;
                <a href="#" onClick={this.props.onDelete.bind(this, this.props.taskId)} className="delete-task text-danger">Delete</a>
            </div>
        )
    }
}
