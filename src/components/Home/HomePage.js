import React, {Component} from 'react';
import {Link} from 'react-router';
import {loadTodayTasks} from "../../models/task";

export default class HomePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tasks: 0
        };
    }

    componentWillMount() {
        if (sessionStorage.getItem('username')) {
            loadTodayTasks()
                .then(res => {
                    this.setState({
                        tasks: res.length || 0
                    })
                });
        }
    }

    buildTodaysLink() {
        let date = new Date();
        let link = '/calendar/' + date.getFullYear() + '/' + date.getMonth() + '/' + date.getDate();
        return (
            <div>
                <Link to={link} activeClassName="btn btn-primary active">
                    <span className="a-like">Click here to see today's tasks.</span>
                </Link>
            </div>
        );
    }

    render() {
        let homeScreen = (
            <div className="jumbotron">
                <h1 className="display-3">Calendar+</h1>
                <p className="lead">Simple. User friendly. Available on the web. That's calendar+!</p>
                <p className="">The next generation task manager.</p>
                <p>
                    <Link to="/register" className="btn btn-lg btn-success">Sign up today</Link>
                    <Link to="/login" className="btn btn-lg">Log-in</Link>
                </p>
            </div>
        );

        if (sessionStorage.getItem('username')) {
            homeScreen = (
                <div className="jumbotron text-center">
                    <p>You have <strong>{this.state.tasks}</strong> tasks scheduled for today!</p>
                    {this.buildTodaysLink()} or Use the <Link to="/calendar"><span
                    className="a-like"><strong>Calendar</strong></span></Link> to add new tasks.
                </div>
            )
        }

        return homeScreen;
    }
}