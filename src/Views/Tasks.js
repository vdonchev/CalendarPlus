import React, {Component} from 'react';
import Request from '../Core/Request';

import './Tasks.css';

export default class Tasks extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dateId: props.dateId,
            day: props.day
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            dateId: nextProps.dateId,
            day: nextProps.day
        });

        this.getTasks();
    }

    componentDidMount() {
        this.getTasks();
    }

    render() {
        console.log(this.state.tasks);
        return (
            <div>
                <h5 className="h4">Day: {this.state.day}</h5>
                <ul className="list-group">
                    {this.state.tasks}
                </ul>
            </div>
        );
    }

    getTasks() {
        let listOfTasks = [];
        Request.getTasksPerDay(this.state.dateId, this.state.day)
            .then((tasks) => {
                for (let task of tasks) {
                    listOfTasks.push(<li className="list-group-item" key={task._id}>
                            <span className="task-category task-personal"> </span>
                            <span className="task-title">{task.title}</span>
                            <div className="task-content">
                                <hr/>
                                {task.body}
                                <div className="task-category h6">Category: Personal</div>
                                <div className="task-administration text-right">
                                    <a href="#" className="edit-task text-warning">Edit</a>&nbsp;
                                    <a href="#" className="delete-task text-danger">Delete</a>
                                </div>
                            </div>
                        </li>
                    );
                }

                this.setState({tasks: listOfTasks});
            })
            .catch(err => {console.log(err)});
    }
}