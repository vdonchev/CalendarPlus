import React, {Component} from 'react';
import $ from 'jquery';

import './Tasks.css';

export default class Tasks extends Component {
    componentDidMount() {
        $('li.list-group-item').on('click', function () {
            $('li').find('div').hide();
            $(this).find('div').toggle();
        })
    }

    render() {
        return (
            <ul className="list-group">
                <li className="list-group-item">
                    <span className="task-category task-personal"> </span>
                    <span className="task-title">Test title</span>
                    <div className="task-content">
                        <hr/>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam aliquid aut dolor ex
                        laborum
                        placeat quam voluptates! Aliquam al iquid dicta dolorem enim expedita hic illo maiores nobis
                        numquam voluptas? Molestiae?

                        <div className="task-category h6">Category: Personal</div>
                        <div className="task-administration text-right">
                            <a href="#" className="edit-task text-warning">Edit</a>&nbsp;
                            <a href="#" className="delete-task text-danger">Delete</a>
                        </div>
                    </div>
                </li>
                <li className="list-group-item">
                    <span className="task-category task-personal"> </span>
                    <span className="task-title">Test title</span>
                    <div className="task-content">
                        <hr/>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam aliquid aut dolor ex
                        laborum
                        placeat quam voluptates! Aliquam aliquid dicta dolorem enim expedita hic illo maiores nobis
                        numquam voluptas? Molestiae?

                        <div className="task-category h6">Category: Personal</div>
                        <div className="task-administration text-right">
                            <a href="#" className="edit-task text-warning">Edit</a>&nbsp;
                            <a href="#" className="delete-task text-danger">Delete</a>
                        </div>
                    </div>
                </li>
            </ul>
        );
    }
}