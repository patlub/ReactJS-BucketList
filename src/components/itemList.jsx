import React, {Component} from 'react';
import '../App.css';
import axiosInstance from './config';


class ItemList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isEditing: false
        };
    }

    renderActions() {
        if (this.state.isEditing) {
            return (
                <td>
                    <button onClick={this.onSaveClick.bind(this)} className="btn btn-sm btn-success action-btn">Save
                    </button>
                    <button onClick={this.onCancelClick.bind(this)} className="btn btn-sm btn-default">Cancel</button>
                </td>
            );
        }
        return (
            <td>
                <button onClick={this.onEditClick.bind(this)} className="btn btn-sm btn-primary action-btn">Edit
                </button>
                <button onClick={this.onDeleteClick.bind(this)} className="btn btn-sm btn-danger">Delete</button>
            </td>
        );
    }

    render_items() {
        if (this.state.isEditing) {
            return (
                <tr>
                    <td><input type="text" defaultValue={this.props.name} ref="editItemName"/></td>
                    <td><input type="text" defaultValue={this.props.status} ref="editItemStatus"/></td>
                    <td>{this.props.date_added}</td>
                    {this.renderActions()}
                </tr>
            );
        }
        return (
            <tr>
                <td>{this.props.name}</td>
                <td>{this.props.status}</td>
                <td>{this.props.date_added}</td>
                {this.renderActions()}
            </tr>
        );
    }

    render() {
        return this.render_items();

    }

    onEditClick() {
        this.setState({isEditing: true})
    }

    onCancelClick() {
        this.setState({isEditing: false})
    }

    onSaveClick(event) {
        event.preventDefault();
        const item = this.refs.editItemName.value;
        const status = this.refs.editItemStatus.value;

        axiosInstance.put(`/buckets/${this.props.bucket_id}/items/${this.props.id}`,
            {
                item,
                status
            })
            .then((response) => {
                this.setState({isEditing: false});
                this.props.updateItems(response.data, this.props.id);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    onDeleteClick(event) {
        event.preventDefault();
        axiosInstance.delete(`/buckets/${this.props.bucket_id}/items/${this.props.id}`)
            .then((response) => {
                this.setState({isEditing: false});
                this.props.deleteItem(this.props.id);
            })
            .catch((error) => {
                console.log(error);
            });
    }

}

export default ItemList;
