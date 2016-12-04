import React, {Component} from 'react';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import Navbar from './components/common/Navbar';
import Infobox from  './components/common/Infobox';
import {Link} from 'react-router';
import observer from './models/observer';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {loggedIn: false, username: ''};
        observer.onSessionUpdate = this.onSessionUpdate.bind(this);
    }

    componentDidMount() {
        this.onSessionUpdate();
    }

    onSessionUpdate() {
        let name = sessionStorage.getItem("username");
        if (name) {
            this.setState({loggedIn: true, username: sessionStorage.getItem("username")});
        } else {
            this.setState({loggedIn: false, username: ''});
        }
    }

    render() {
        let navbar = {};
        if (!this.state.loggedIn) {
            navbar = (
                <Navbar>
                    <li className="nav-item">
                        <Link to="/" activeClassName="btn btn-primary active" onlyActiveOnIndex={true}>Home</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/login" activeClassName="btn btn-primary active">Login</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/register" activeClassName="btn btn-primary active">Register</Link>
                    </li>
                </Navbar>
            );
        } else {
            navbar = (
                <Navbar>
                    <li className="nav-item">
                        <Link to="/" activeClassName="btn btn-primary active"
                              onlyActiveOnIndex={true}>Home</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/calendar" activeClassName="btn btn-primary active">Calendar</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/logout" activeClassName="btn btn-primary active">Logout</Link>
                    </li>
                </Navbar>
            );
        }

        return (
            <div className="container">
                <Header loggedIn={this.state.loggedIn} user={this.state.username}>
                    {navbar}
                </Header>
                <Infobox/>
                {this.props.children}
                <hr/>
                <Footer/>
            </div>
        )
    }
}

export default App;