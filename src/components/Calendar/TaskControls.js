import React, {Component} from 'react';
import {Link} from 'react-router';

export default class TaskControls extends Component {
    render() {return (
            <div>
                <Link to={"/edit/" + this.props.taskId} className="btn btn-default">Edit task</Link>
                <a href="" className="btn btn-default" onClick={this.props.onDel}>Delete task</a>
            </div>
        )
    }
}