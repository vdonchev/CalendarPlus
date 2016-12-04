import React, {Component} from 'react';


export default class EditForm extends Component {
    render() {
        return (
            <form onSubmit={this.props.onSubmitHandler}>
                <div className="form-group">
                    <label>Title:</label>
                    <input
                        className="form-control"
                        type="text"
                        name="title"
                        value={this.props.title}
                        disabled={this.props.submitDisabled}
                        onChange={this.props.onChangeHandler}
                    />
                </div>
                <div className="form-group">
                    <label>Body:</label>
                    <textarea
                        className="form-control"
                        name="body"
                        value={this.props.body}
                        disabled={this.props.submitDisabled}
                        onChange={this.props.onChangeHandler}
                    />
                </div>
                <div className="form-group">
                    <label>Category:</label>
                    <select
                        className="form-control"
                        name="category"
                        value={this.props.category}
                        disabled={this.props.submitDisabled}
                        onChange={this.props.onChangeHandler}
                    >
                        {this.props.options}
                    </select>

                </div>
                <input className="btn btn-default" type="submit" value="Submit" disabled={this.props.submitDisabled}/>
            </form>
        );
    }
}