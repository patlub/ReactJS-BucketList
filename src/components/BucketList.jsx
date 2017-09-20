import React, {Component} from 'react';
import '../App.css';
import {baseURL} from './config';
import axios from 'axios'

import _ from 'lodash';

class BucketList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isEditing: false,
            bucket: this.props.name,
            desc: this.props.desc,
        };
    }

    /*
    * Fired when input changes
    * @param (event) event when input changes
    * */
    onInputChanged = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    };

    /**
     * This method handles viewing a bucket.
     */
    onViewBucketClick = () => {
        const bucketListItems = [];
        axios.defaults.headers.common['Authorization'] = localStorage.getItem('token');
        axios.get(`${baseURL}/items/${this.props.id}`)
            .then(function (response) {
                if (response.status === 200) {
                    _.forEach(response.data, function (value) {
                        bucketListItems.push(value);
                    });
                    this.props.getItems(bucketListItems, this.props.id);
                }
            }.bind(this))
            .catch(function (error) {
                console.log(error);
            });
    };

    /**
     * This method handles saving an updated a bucket.
     * @param {event} event when triggering an onSaveClick action.
     */
    onSaveClick = (event) => {
        event.preventDefault();
        axios.defaults.headers.common['Authorization'] = localStorage.getItem('token');
        axios.put(`${baseURL}/buckets/${this.props.id}`,
            {
                bucket: this.state.bucket,
                desc: this.state.desc,
            })
            .then(() => {
                this.setState({isEditing: false});
                this.props.updateBuckets(this.props.id, this.state.bucket, this.state.desc);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    /**
     * This method handles deleting a bucket.
     */
    onDeleteClick = (event) => {
        event.preventDefault();
        axios.defaults.headers.common['Authorization'] = localStorage.getItem('token');
        axios.delete(`${baseURL}/buckets/${this.props.id}`)
            .then(() => {
                this.setState({isEditing: false});
                this.props.deleteBucket(this.props.id);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    onEditClick = () => {
        this.setState({isEditing: true})
    };

    onCancelClick = () => {
        this.setState({isEditing: false})
    };

    // Displays the actions operable on a bucket
    renderActions = () => {
        if (this.state.isEditing) {
            return (
                <td>
                    <span onClick={this.onSaveClick} className="glyphicon glyphicon-floppy-disk save"></span>
                    <span onClick={this.onCancelClick} className="glyphicon glyphicon-ban-circle cancel"></span>

                </td>
            );
        }
        return (
            <td>
                <span onClick={this.onEditClick} className="glyphicon glyphicon-pencil edit"></span>
                <span onClick={this.onDeleteClick} className="glyphicon glyphicon-trash remove"></span>
            </td>
        );
    };

    // Displays the buckets
    renderBuckets = () => {
        if (this.state.isEditing) {
            return this.editingState();
        }
        return (
            <tr>
                <td onClick={this.onViewBucketClick} className="bucket-name">{this.state.bucket}</td>
                <td>{this.state.desc}</td>
                <td>{this.props.date_added}</td>
                {this.renderActions()}
            </tr>
        );
    };

    // Rendered when state isEditing is true
    editingState = () => (
        <tr>
            <td>
                <input
                    type="text"
                    name="bucket"
                    value={this.state.bucket}
                    onChange={this.onInputChanged}/>
            </td>
            <td>
                <input
                    type="text"
                    name="desc"
                    value={this.state.desc}
                    onChange={this.onInputChanged}/>
            </td>
            <td>{this.props.date_added}</td>
            {this.renderActions()}
        </tr>
    );

    render() {
        return this.renderBuckets();
    }
}

export default BucketList;
