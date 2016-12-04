import React, {Component} from 'react';
import Greeting from '../common/Greeting';

export default class Header extends Component {
    render() {
        return (
            <div className="header clearfix">
                <nav>
                    {this.props.children}
                </nav>
                <h3 className="text-muted">Calendar+</h3>
                <div><Greeting user={this.props.user}/></div>
                <hr/>
            </div>
        );
    }
}