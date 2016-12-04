import React, {Component} from 'react';
import './Tasks.css';
import {Link} from 'react-router';
import TaskControls from './TaskControls'
import {loadDayTasks} from "../../models/task";

export default class Tasks extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedDayTasks: null
        };

        this.createRender = this.createRender.bind(this);
        let day = Number(this.props.params.day);
        let dateId = '' + this.props.params.year + this.props.params.month;
        loadDayTasks(day, dateId, this.createRender);
    }

    createRender(tasks) {
        let elements = [];
        for (let entry of tasks) {
            let element = <li key={entry._id} className="list-group-item">
                <span className="task-title h3">{entry.title}</span>
                <div>
                    <hr/>
                    {entry.body}
                    <div className="task-category h6">Category: Personal</div>
                    <div className="task-administration text-right h4">
                        <TaskControls taskId={entry._id}/>
                    </div>
                </div>
                <br/>
            </li>

            elements.push(element);
        }

        this.setState({
            selectedDayTasks: elements
        });
    }

    render() {
        return (
            <div className="row">
                <div className="col-md-4">
                    <div
                        className="h3">Selected
                        date: {this.props.params.day}.{Number(this.props.params.month) + 1}.{this.props.params.year}</div>
                    <hr/>
                    <Link className="btn btn-success btn-lg"
                          to={'/create/' + this.props.params.year + '/' + this.props.params.month + '/' + this.props.params.day }>
                        Add new task
                    </Link>
                    <div className="col-md-8">
                        <div className="h3">Tasks:</div>
                        <hr/>
                        <ul className="list-group">
                            {this.state.selectedDayTasks}
                        </ul>
                    </div>
                    ;
                </div>
            </div>
        )
    }
}