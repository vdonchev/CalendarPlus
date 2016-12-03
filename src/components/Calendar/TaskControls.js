import React, {Component} from 'react';
import {Link} from 'react-router';

export default class TaskControls extends Component {
    render() {
        let edit = null;
        let del = null;

        if (this.props.ownTask) {
            edit = <Link to={"/edit/" + this.props.taskId} className="btn btn-default">Edit task</Link>;
            del = <a href="" className="btn btn-default" onClick={this.props.onDel}>Delete task</a>;
        }

        return (
            <div>
                {edit}
                {del}
            </div>
        )
    }
}