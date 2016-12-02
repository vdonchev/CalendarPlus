import React, {Component} from 'react';

import './Calendar.css';

export default class Calendar extends Component {
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
    }

    render() {
        console.log(this.props.tasks);
        return this.renderCalendar();
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
                <div className="col-md-12 text-center">
                    <h2 className="h1">{monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}</h2>
                    <p>Choose a day to add/view Tasks</p>
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
                    <nav className="paging" aria-label="Page navigation">
                        <ul className="pager">
                            <li className="previous"><a href="#" onClick={this.decreaseMonth.bind(this)}><span
                                aria-hidden="true">&larr;</span> Previous</a></li>
                            <li className="next"><a href="#" onClick={this.increaseMonth.bind(this)}>Next <span
                                aria-hidden="true">&rarr;</span></a></li>
                        </ul>
                    </nav>
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