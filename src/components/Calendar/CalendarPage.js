import React, {Component} from 'react';
import {loadMonthTasks} from '../../models/task';
import Calendar from './Calendar'

export default class CalendarPage extends Component {
    constructor(props) {
        super(props);

        let date = new Date();
        this.state = {
            tasks: '0'.repeat(32).split('').map(Number),
            dateId: '' + date.getFullYear() + date.getMonth()
        };

        this.bindEventHandlers();
    }

    bindEventHandlers() {
        this.onLoadSuccess = this.onLoadSuccess.bind(this);
        this.updateTasks = this.updateTasks.bind(this);
    }

    onLoadSuccess(response) {
        for (let task of response) {
            this.state.tasks[task.day]++;
        }

        this.forceUpdate(); // update number of tasks when ready
    }

    //this is a hook which triggers on component creation
    componentDidMount() {
        loadMonthTasks(this.state.dateId, this.onLoadSuccess);
    }

    updateTasks(day) {
        let year = Number(this.state.dateId.substr(0, 4));
        let month = Number(this.state.dateId.substr(4));
        month += day;
        if (month < 0) {
            month = 11;
            year--;
        }

        if (month > 11) {
            month = 0;
            year++;
        }

        let newDateId = '' + year + month;
        this.setState({
            tasks: '0'.repeat(32).split('').map(Number),
            dateId: newDateId
        });

        loadMonthTasks(newDateId, this.onLoadSuccess);
    }

    render() {
        return (
            <div>
                <div>
                    <Calendar tasks={this.state.tasks} onMonthChange={this.updateTasks}/>
                </div>
            </div>
        );
    }
}