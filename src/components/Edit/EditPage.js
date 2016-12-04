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
            category: '',
            categories: [<option key='0' value=''>---Choose---</option>],
            submitDisabled: false
        };

        //this should fill the fields of the state when being routed.
        getTaskById(this.props.params.taskId, this.changeState);
        this.bindEventHandlers();
    }

    bindEventHandlers() {
        this.changeState = this.changeState.bind(this);
        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.onSubmitHandler = this.onSubmitHandler.bind(this);
        this.onSubmitResponse = this.onSubmitResponse.bind(this);
        this.onLoadSuccess = this.onLoadSuccess.bind(this);
    }

    changeState(data) {
        this.setState({
            title: data.title,
            body: data.body,
            category: data.category,
        });
    }

    onChangeHandler(event) {
        switch (event.target.name) {
            case 'title':
                this.setState({title: event.target.value});
                break;
            case 'body':
                this.setState({body: event.target.value});
                break;
            case 'category':
                this.setState({category: event.target.value});
                break;
            default:
                break;
        }
    }

    onSubmitHandler(event) {
        event.preventDefault();
        this.setState({submitDisabled: true});

        edit(
            Number(this.props.params.day),
            '' + this.props.params.year + this.props.params.month,
            this.state.title,
            this.state.body,
            this.state.category,
            this.onSubmitResponse
        );
    }

    onSubmitResponse(response) {
        if (response === true) {
            this.context.router.push('/calendar');
        } else {
            this.setState({submitDisabled: true});
        }
    }

    onLoadSuccess(categories) {
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
                    category={this.state.category}
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