import React, { Component } from 'react';
import '../App.css';
import axiosInstance from './config';
import _ from 'lodash';

const bucketListItems = []

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
        console.log('final render');
        if (this.state.isEditing) {
            return (
                <tr>
                    <td><input type="text" defaultValue={this.props.name} ref="editItemName"/></td>
                    <td><input type="text" defaultValue={this.props.status} ref="editStatus"/></td>
                    <td>{this.props.date_added}</td>
                    <input type="hidden" value={this.props.id} ref="id"/>
                    {this.renderActions()}
                </tr>
            );
        }
        return (
            <tr>
                <td>{this.props.name}</td>
                <td>{this.props.status}</td>
                <td>{this.props.date_added}</td>
                <input type="hidden" value={this.props.id} ref="id" />
                {this.renderActions()}
            </tr>
        );
    }

    render() {
        console.log('this is render')
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
        const bucket = this.refs.editBucketName.value;
        const desc = this.refs.editDesc.value;
        const id = this.refs.id.value;

        axiosInstance.put('/buckets/' + id,
            {
                bucket,
                desc
            })
            .then((response) => {
                this.props.unSetBuckets();
                this.setState({isEditing: false});
                this.props.getBuckets();
            })
            .catch((error) => {
                console.log(error);
            });
    }

    onDeleteClick(event) {
        event.preventDefault();
        const id = this.refs.id.value;

        axiosInstance.delete('/buckets/' + id)
            .then((response) => {
                this.props.unSetBuckets();
                this.setState({isEditing: false});
                this.props.getBuckets();
            })
            .catch((error) => {
                console.log(error);
            });
    }

}
export default ItemList;
