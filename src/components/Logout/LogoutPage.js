import React, {Component} from 'react';
import {logout} from '../../models/user';

export default class LogoutPage extends Component {
    componentDidMount() {
        this.logout();
    }

    logout() {
        logout(this.onSubmitResponse.bind(this));
    }

    onSubmitResponse() {
        this.context.router.push('/');
    }

    render() {
        return (
            <div>
                <span>Logout Page</span>
            </div>
        );
    }
}

LogoutPage.contextTypes = {
    router: React.PropTypes.object
};