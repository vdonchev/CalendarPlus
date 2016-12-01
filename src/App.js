import React, {Component} from 'react';
import ReactDOM from 'react-dom';

import Header from './Components/Header';
import Footer from './Components/Footer';

import Request from './Core/Request';

import Calendar from './Views/Calendar';
import HomeGuest from './Views/HomeGuest';
import Register from './Views/Register';
import Login from './Views/Login';

import './App.css';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: sessionStorage.getItem("username"),
            userId: sessionStorage.getItem("userId"),
            userToken: sessionStorage.getItem("userToken")
        }
    }

    render() {
        return (
            <div className="container">
                <Header
                    userLoggedIn={this.userIsLoggedIn()}
                    homeClick={this.renderHome.bind(this)}
                    registerClick={this.renderRegister.bind(this)}
                    loginClick={this.renderLogin.bind(this)}
                    logoutClick={this.logout.bind(this)}
                />
                <div id="view"></div>
                <Footer/>
            </div>
        );
    }

    componentDidMount() {
        this.renderHome();
    }

    // Views
    renderView(component) {
        ReactDOM.render(component, document.getElementById('view'));
    }

    renderHome() {
        if (this.userIsLoggedIn()) {
            this.renderView(<Calendar/>);
        } else {
            this.renderView(<HomeGuest
                registerClick={this.renderRegister.bind(this)}
                loginClick={this.renderLogin.bind(this)}
            />);
        }
    }

    renderRegister() {
        this.renderView(<Register submit={this.register.bind(this)}/>);
    }

    renderLogin() {
        this.renderView(<Login submit={this.login.bind(this)}/>);
    }

    // Actions
    login(username, password) {
        Request.login(username, password)
            .then((data) => {
                this.saveAuthorizationData(data);
                this.renderHome();
            });
    }

    register(username, password) {
        Request.register(username, password)
            .then((userData) => {
                this.saveAuthorizationData(userData);
                this.renderHome();
            });
    }

    logout() {
        Request.logout()
            .then(() => {
                sessionStorage.clear();

                this.setState({
                    username: null,
                    userId: null,
                    userToken: null
                });

                this.renderHome();
            })
    }

// Helpers
    saveAuthorizationData(data) {
        sessionStorage.setItem('username', data.username);
        sessionStorage.setItem('userId', data._id);
        sessionStorage.setItem('userToken', data._kmd.authtoken);

        this.setState({
            username: data.username,
            userId: data._id,
            userToken: data._kmd.authtoken
        })
    }

    userIsLoggedIn() {
        return (
            this.state.username != null &&
            this.state.userId != null &&
            this.state.userToken != null
        );
    }
}

export default App