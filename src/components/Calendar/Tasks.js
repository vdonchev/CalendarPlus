import React, {Component} from 'react';
import './Tasks.css';
import {Link} from 'react-router';

export default class Tasks extends Component {
    render() {
        return (
            <div className="row">
                <div className="col-md-4">
                    <div
                        className="h3">Selected date: {this.props.params.day}.{Number(this.props.params.month) + 1}.{this.props.params.year}</div>
                    <hr/>
                    <Link className="btn btn-success btn-lg"
                          to={'/create/' + this.props.params.year + '/' + this.props.params.month + '/' + this.props.params.day }>
                        Add new task
                    </Link>
                </div>
                <div className="col-md-8">
                    <div className="h3">Tasks:</div>
                    <hr/>
                    <ul className="list-group">
                        <li className="list-group-item">
                            <span className="task-title h3">Cras justo odio</span>
                            <div>
                                <hr/>
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam aliquid aut dolor ex
                                laborum
                                placeat quam voluptates! Aliquam aliquid dicta dolorem enim expedita hic illo maiores
                                nobis
                                numquam voluptas? Molestiae?

                                <div className="task-category h6">Category: Personal</div>
                                <div className="task-administration text-right h4">
                                    <a href="#" className="edit-task text-warning">Edit</a>&nbsp;
                                    <a href="#" className="delete-task text-danger">Delete</a>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        )
    }
}