import React, {Component} from 'react';

export default class HomePage extends Component {
    render() {
        let message = <p>You are currently not logged in. Please, log in or register to review your tasks.</p>;

        if (sessionStorage.getItem('username')) {
            // TO DO: implement todayTasks
                message = <p>You have {this.props.todayTasks} tasks assigned for today!</p>
        }
        return (
            <div className="clearfix">
                <h1>Home Page</h1>
                {message}
            </div>
        );
    }
}