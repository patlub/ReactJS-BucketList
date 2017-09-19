import React, {Component} from 'react';
import '../App.css';
import axiosInstance from './config';


class ItemList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isEditing: false,
            name: this.props.name,
            status: this.props.status,
        };
    }

    onInputChanged = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    };

    renderActions = () => {
        if (this.state.isEditing) {
            return (
                <td>
                    <button onClick={this.onSaveClick} className="btn btn-sm btn-success action-btn">Save
                    </button>
                    <button onClick={this.onCancelClick} className="btn btn-sm btn-default">Cancel</button>
                </td>
            );
        }
        return (
            <td>
                <button onClick={this.onEditClick} className="btn btn-sm btn-primary action-btn">Edit
                </button>
                <button onClick={this.onDeleteClick} className="btn btn-sm btn-danger">Delete</button>
            </td>
        );
    };

    render_items = () => {
        if (this.state.isEditing) {
            return (
                <tr>
                    <td>
                        <input
                            type="text"
                            name="name"
                            defaultValue={this.state.name}
                            value={this.state.name}
                            onChange={this.onInputChanged}/>
                    </td>
                    <td>
                        <input
                            type="text"
                            name="status"
                            defaultValue={this.state.status}
                            value={this.state.status}
                            onChange={this.onInputChanged}/>
                    </td>
                    <td>{this.props.date_added}</td>
                    {this.renderActions()}
                </tr>
            );
        }
        return (
            <tr>
                <td>{this.state.name}</td>
                <td>{this.state.status}</td>
                <td>{this.props.date_added}</td>
                {this.renderActions()}
            </tr>
        );
    };

    render() {
        return this.render_items();

    }

    onEditClick = () => {
        this.setState({isEditing: true})
    };

    onCancelClick = () => {
        this.setState({isEditing: false})
    };

    onSaveClick = (event) => {
        event.preventDefault();
        axiosInstance.put(`/buckets/${this.props.bucket_id}/items/${this.props.id}`,
            {
                item: this.state.name,
                status: this.state.status,
            })
            .then((response) => {
                this.setState({isEditing: false});
                this.props.updateItems(response.data, this.props.id);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    onDeleteClick = (event) => {
        event.preventDefault();
        axiosInstance.delete(`/buckets/${this.props.bucket_id}/items/${this.props.id}`)
            .then(() => {
                this.setState({isEditing: false});
                this.props.deleteItem(this.props.id);
            })
            .catch((error) => {
                console.log(error);
            });
    }

}

export default ItemList;
