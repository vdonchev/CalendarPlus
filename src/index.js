import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import {IndexRoute, Router, Route, browserHistory, hashHistory} from 'react-router';
import HomePage from './components/Home/HomePage';
import CalendarPage from './components/Calendar/CalendarPage';
import Login from './components/Login/LoginPage';
import Register from './components/Register/RegisterPage';
import Logout from './components/Logout/LogoutPage';
import Tasks from './components/Calendar/Tasks';
import Edit from './components/Edit/EditPage';
import Create from './components/Create/CreatePage';

ReactDOM.render(
    <Router history={browserHistory}>
        <Route path="/" component={App}>
            <IndexRoute component={HomePage}/>
            <Route path="Calendar">
                <IndexRoute component={CalendarPage}/>
                <Route path=":year/:month/:day" component={Tasks}/>
            </Route>
            <Route path="login" component={Login}/>
            <Route path="register" component={Register}/>
            <Route path="logout" component={Logout}/>
            <Route path="edit/:taskId" component={Edit}/>
            <Route path="create/:year/:month/:day" component={Create}/>
        </Route>
    </Router>,
    document.getElementById('root')
);
