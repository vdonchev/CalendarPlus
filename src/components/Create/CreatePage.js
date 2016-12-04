import React, {Component} from 'react';
import CreateForm from '../Edit/EditForm';
import {create} from '../../models/task';
import {loadCategories} from '../../models/category';

export default class CreatePage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            title: '',
            body: '',
            category: '',
            categories: [<option key='0' value=''>---Choose---</option>],
            submitDisabled: false
        };

        this.bindEventHandlers();
    }

    bindEventHandlers() {
        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.onSubmitHandler = this.onSubmitHandler.bind(this);
        this.onSubmitResponse = this.onSubmitResponse.bind(this);
        this.onLoadSuccess = this.onLoadSuccess.bind(this);
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

        create(
            Number(this.props.params.day),
            '' + this.props.params.year  + this.props.params.month,
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
        console.log(categories)
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
                <h1>Create new Task</h1>
                <CreateForm
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

CreatePage.contextTypes = {
    router: React.PropTypes.object
};