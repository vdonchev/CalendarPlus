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

    componentDidMount() {
        loadTodayTasks()
            .then(res => {
                this.setState({
                    tasks: res.length || 0
                })
            });
    }

    buildTodaysLink() {
        let date = new Date();
        let link = '/calendar/' + date.getFullYear() + '/' + date.getMonth() + '/' + date.getDate();
        return (
            <Link to={link} activeClassName="btn btn-primary active">
                <div className="h4"><a href="">Click here to see them.</a></div>
            </Link>
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
                    {this.buildTodaysLink()}
                </div>
            )
        }

        return homeScreen;
    }
}