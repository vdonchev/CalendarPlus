import React, {Component} from 'react';
import CreateForm from '../Edit/EditForm';
import {create} from '../../models/task';
import {loadCategories} from '../../models/category';
import observer from "../common/Infobox";

export default class CreatePage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            title: '',
            body: '',
            categoryId: '',
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

        // TODO validate data before creating
        if(this.state.categoryId === undefined){
            observer.showError("Category is not selected");
            return;
        }

        create(
            Number(this.props.params.day),
            '' + this.props.params.year + this.props.params.month,
            this.state.title,
            this.state.body,
            this.state.categoryId,
            this.onSubmitResponse
        );
    }

    onSubmitResponse(response) {
        if (response === true) {
            this.context.router.push('/calendar/' + this.props.params.year + '/' + this.props.params.month + '/' + this.props.params.day);
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
                <h1>Create new task</h1>
                <CreateForm
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

CreatePage.contextTypes = {
    router: React.PropTypes.object
};