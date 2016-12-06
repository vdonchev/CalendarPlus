import React, {Component} from 'react';


export default class EditForm extends Component {
    render() {
        return (
            <form onSubmit={this.props.onSubmitHandler}>
                <div className="form-group">
                    <label>Title:</label>
                    <input style={this.props.titleValidation}
                           className="form-control"
                           type="text"
                           name="title"
                           value={this.props.title}
                           disabled={this.props.submitDisabled}
                           onChange={this.props.onChangeHandler}
                           placeholder="Title"
                    />
                </div>
                <div className="form-group">
                    <label>Body:</label>
                    <textarea style={this.props.bodyValidation}
                              className="form-control"
                              name="body"
                              value={this.props.body}
                              disabled={this.props.submitDisabled}
                              onChange={this.props.onChangeHandler}
                              placeholder="Body"
                    />
                </div>
                <div className="form-group">
                    <label >Category:</label>
                    <select style={this.props.categoryValidation}
                            className="form-control"
                            name="categoryId"
                            value={this.props.categoryId}
                            disabled={this.props.submitDisabled}
                            onChange={this.props.onChangeHandler}
                    >
                        {this.props.options}
                    </select>

                </div>
                <input className="btn btn-success btn-lg" type="submit" value="Submit task"
                       disabled={this.props.submitDisabled}/>
            </form>
        )
    }
}