import React, {Component} from 'react';
import EditForm from '../Edit/EditForm';
import {edit, getTaskById} from '../../models/task';
import {loadCategories} from '../../models/category';

export default class EditPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            title: this.props,
            body: '',
            categoryId: '',
            categories: [<option key='0' value=''>---Choose---</option>],
            submitDisabled: false
        };

        //this should fill the fields of the state when being routed.
        this.bindEventHandlers();

        getTaskById(this.props.params.taskId, this.changeState);
    }

    bindEventHandlers() {
        this.changeState = this.changeState.bind(this);
        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.onSubmitHandler = this.onSubmitHandler.bind(this);
        this.onSubmitResponse = this.onSubmitResponse.bind(this);
        this.onLoadSuccess = this.onLoadSuccess.bind(this);
    }

    changeState(data) {
        let entry = data[0];

        this.setState({
            title: entry.title,
            body: entry.body,
            categoryId: entry.categoryId,
            taskId: entry._id,
            day: entry.day,
            dateId: entry.dateId
        });

        console.log(this.state.categoryId)
    }

    onChangeHandler(event) {
        console.log(event.target.name);
        switch (event.target.name) {
            case 'title':
                this.setState({title: event.target.value});
                break;
            case 'body':
                this.setState({body: event.target.value});
                break;
            case 'categoryId':
                this.setState({categoryId: event.target.value});
                break;
            default:
                break;
        }
    }

    onSubmitHandler(event) {
        event.preventDefault();
        this.setState({submitDisabled: true});

        //load the data for the edit
        let data = {
            title: this.state.title,
            body: this.state.body,
            categoryId: this.state.categoryId,
            day: this.state.day,
            dateId: this.state.dateId
        };
        console.log(this.state.categoryId)
        edit(this.state.taskId, data, this.onSubmitResponse);
    }

    onSubmitResponse(response) {
        if (response) {
            this.context.router.push('/calendar');
        } else {
            this.setState({submitDisabled: false});
        }
    }

    onLoadSuccess(categories) {
        this.setState({
            categories: []
        });

        categories.forEach(cat => {
            this.state.categories.push(<option key={cat._id} value={cat._id}>{cat.title}</option>);
        });

        this.forceUpdate(); // update number of tasks when ready
    }

    componentDidMount() {
        loadCategories(this.onLoadSuccess);
    }

    render() {
        return (
            <div>
                <h1>Edit Task</h1>
                <EditForm
                    title={this.state.title}
                    body={this.state.body}
                    categoryId={this.state.categoryId}
                    submitDisabled={this.state.submitDisabled}
                    onChangeHandler={this.onChangeHandler}
                    onSubmitHandler={this.onSubmitHandler}
                    options={this.state.categories}
                />
            </div>
        );
    }
}

EditPage.contextTypes = {
    router: React.PropTypes.object
};