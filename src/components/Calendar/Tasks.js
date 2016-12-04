import React, {Component} from 'react';
import './Tasks.css';
import {Link} from 'react-router';
import TaskControls from './TaskControls'
import {loadDayTasks} from "../../models/task";
import {removeTask} from "../../models/task";
import {loadCategories} from '../../models/category';

export default class Tasks extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedDayTasks: []
        };

        this.createRender = this.createRender.bind(this);
        this.onDelete = this.onDelete.bind(this);
    }

    componentDidMount() {
        let day = Number(this.props.params.day);
        let dateId = '' + this.props.params.year + this.props.params.month;
        loadDayTasks(day, dateId, this.createRender);
    }

    createRender(tasks) {
        loadCategories((categories) => {
            let cats = {};
            for (let category of categories) {
                cats[category._id] = category;
            }

            let elements = [];
            for (let entry of tasks) {
                let catStyle = {
                    background: '#' + cats[entry.categoryId].color
                };

                let element = (
                    <li key={entry._id} className="list-group-item">
                        <p className="task-title h4">
                            <span style={catStyle}> </span>
                            {entry.title}
                        </p>
                        <div>
                            <hr/>
                            {entry.body}
                            <div className="task-category h4">
                                <span className="label label-default">Category: {cats[entry.categoryId].title}</span>
                            </div>
                            <div className="task-administration text-right h4">
                                <TaskControls taskId={entry._id} onDelete={this.onDelete}/>
                            </div>
                        </div>
                        <br/>
                    </li>
                );

                elements.push(element);
            }

            this.setState({
                selectedDayTasks: elements
            });
        });
    }

    onDelete(id) {
        removeTask(id);
        console.log(this.state.selectedDayTasks);
        this.setState({
            selectedDayTasks: this.state.selectedDayTasks.filter(e => e.key !== id)
        })
    }

    render() {
        return (
            <div className="row">
                <div className="col-md-4">
                    <div
                        className="h3">Selected
                        date: {this.props.params.day}.{Number(this.props.params.month) + 1}.{this.props.params.year}</div>
                    <hr/>
                    <Link className="btn btn-success btn-lg btn-block"
                          to={'/create/' + this.props.params.year + '/' + this.props.params.month + '/' + this.props.params.day }>
                        Add new task
                    </Link>
                </div>
                <div className="col-md-8">
                    <div className="h3">Tasks:</div>
                    <hr/>
                    <ul className="list-group">
                        {this.state.selectedDayTasks}
                    </ul>
                </div>
            </div>
        )
    }
}