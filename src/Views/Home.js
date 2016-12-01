import React, {Component} from 'react';
import Tasks from './Tasks';

import './Home.css';

export default class Home extends Component {
    constructor(props) {
        super(props);

        let now = new Date();
        this.state = {
            mothValue: 0,

            currentDay: now.getDate(),
            currentMonth: now.getMonth(),
            currentYear: now.getFullYear(),

            selectedDay: now.getDate(),
            selectedMonth: now.getMonth(),
            selectedYear: now.getFullYear(),
            dateId: now.getFullYear() + '' + now.getMonth()
        };

        console.log(this.state.dateId)
    }

    render() {
        return this.renderCalendar()
    }

    renderCalendar() {
        let monthNames = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];

        let currentDate = new Date();
        currentDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + this.state.mothValue, currentDate.getDate());

        let thisMonth = currentDate.getMonth();
        let thisYear = currentDate.getFullYear();

        let startDayOfWeek = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay() - 1;
        startDayOfWeek = startDayOfWeek < 0 ? 6 : startDayOfWeek; // fix for week starts on sunday

        let end = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();

        let rowKey = 0;
        let rows = [];
        let currentDay = 1;

        while (true) {
            if (currentDay >= end)
                break;

            let cols = [];
            let colKey = 0;

            for (let day = 0; day < 7; day++) {
                if (rowKey === 0) {
                    if (day >= startDayOfWeek) {
                        if (this.isToday(currentDay, thisMonth, thisYear)) {
                            cols.push(
                                <td className="today"
                                    onClick={this.setSelectedDate.bind(this, currentDay, thisMonth, thisYear)}
                                    key={colKey++}>
                                    <div className="current">TODAY</div>
                                    {currentDay++}
                                </td>);
                        } else {
                            cols.push(<td onClick={this.setSelectedDate.bind(this, currentDay, thisMonth, thisYear)}
                                          key={colKey++}>{currentDay++}</td>)
                        }
                    } else {
                        cols.push(<td className="inactive" key={colKey++}></td>)
                    }
                } else {
                    if (currentDay <= end) {
                        if (this.isToday(currentDay, thisMonth, thisYear)) {
                            cols.push(
                                <td className="today"
                                    onClick={this.setSelectedDate.bind(this, currentDay, thisMonth, thisYear)}
                                    key={colKey++}>
                                    <div className="current">TODAY</div>
                                    {currentDay++}
                                </td>);
                        } else {
                            cols.push(<td onClick={this.setSelectedDate.bind(this, currentDay, thisMonth, thisYear)}
                                          key={colKey++}>{currentDay++}</td>)
                        }
                    } else {
                        cols.push(<td className="inactive" key={colKey++}></td>)
                    }
                }
            }

            let row = <tr key={rowKey++}>{cols}</tr>;
            rows.push(row);
        }

        return (
            <div className="row marketing">
                <div className="col-lg-8 text-center">
                    <h4 className="text-left">{monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}</h4>
                    <hr/>
                    <table className="table table-bordered calendar">
                        <thead>
                        <tr>
                            <th>Mon</th>
                            <th>Tue</th>
                            <th>Wed</th>
                            <th>Thu</th>
                            <th>Fri</th>
                            <th>Sat</th>
                            <th>Sun</th>
                        </tr>
                        </thead>
                        <tbody>
                        {rows}
                        </tbody>
                    </table>
                    <div className="paging">
                        <div id="prev-month"><a href="#" onClick={this.decreaseMonth.bind(this)}>&lt;&lt; Previous</a>
                        </div>
                        <div id="next-month"><a href="#" onClick={this.increaseMonth.bind(this)}>Next &gt;&gt;</a></div>
                    </div>
                </div>
                <div className="col-lg-4" id="tasks">
                    <div className="add-new-task">
                        <h4>Tasks</h4>
                        <hr/>
                        <Tasks dateId="" day=""/>
                    </div>
                </div>
            </div>
        )
    }

    decreaseMonth() {
        this.setState({mothValue: this.state.mothValue - 1});
    }

    increaseMonth() {
        this.setState({mothValue: this.state.mothValue + 1});
    }

    isToday(day, month, year) {
        return day === this.state.currentDay &&
            month === this.state.currentMonth &&
            year === this.state.currentYear;
    }

    setSelectedDate(day, month, year) {
        this.setState({
            dateId: year + '' + month,
            selectedDay: day
        });
    }
}