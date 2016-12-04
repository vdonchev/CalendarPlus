import React, {Component} from 'react';
import {Link} from 'react-router';
import {removeTask} from "../../models/task";

export default class TaskControls extends Component {

    onDelete() {
        // TO DO does not refresh after delete
        removeTask(this.props.taskId);
    }

    render() {
        return (
            <div>
                <Link to={"/edit/" + this.props.taskId} className="btn btn-default">Edit task</Link>
                <button className="btn btn-default" onClick={this.onDelete.bind(this)}>Delete task</button>
            </div>
        )
    }
}
