import React, {Component} from 'react';

// styles
import '../App.css';

// configs
import {baseURL} from '../configs/config';

// Third party
import axios from 'axios'
import {NotificationContainer, NotificationManager} from 'react-notifications';

class ItemList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isEditing: false,
            name: this.props.name,
            status: this.props.status,
        };
    }

    resetState = () => {
        this.setState({
            isEditing: false,
            name: this.props.name,
            status: this.props.status,
        })
    };

    onInputChanged = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    };

    /*
    * Updates a bucket
    * @param {event} event fired when updating bucket
    * */
    onSaveClick = (event) => {
        event.preventDefault();
        axios.defaults.headers.common['Authorization'] = localStorage.getItem('token');
        axios.put(`${baseURL}/buckets/${this.props.bucket_id}/items/${this.props.id}`,
            {
                item: this.state.name,
                status: this.state.status,
            })
            .then((response) => {
                this.setState({isEditing: false});
                this.props.updateItems(response.data, this.props.id);
                NotificationManager.success(`Item updated`, `Success`);
            })
            .catch((error) => {
                NotificationManager.error(`Item ${this.state.name} already exists`, `Error`);
            });
    };

    /*
    * Changes bucket status
    * @param {event} event fired when changing bucket status
    * */
    changeStatus = (event) => {
        event.preventDefault();
        let newStatus = "false";
        if (this.state.status === "false") {
            newStatus = "true"
        }
        this.setState({status: newStatus}, () => {
            axios.defaults.headers.common['Authorization'] = localStorage.getItem('token');
            axios.put(`${baseURL}/buckets/${this.props.bucket_id}/items/${this.props.id}`,
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

        })
    };

    /*
    * Deletes a bucket
    * @param {event} event fired when deleting a bucket
    * */
    onDeleteClick = (event) => {
        event.preventDefault();
        //eslint-disable-next-line
        if (confirm(`Are you sure you want to delete item ${this.state.name}`)) {
            axios.defaults.headers.common['Authorization'] = localStorage.getItem('token');
            axios.delete(`${baseURL}/items/${this.props.id}`)
                .then(() => {
                    this.setState({isEditing: false});
                    this.props.deleteItem(this.props.id);
                    NotificationManager.success(`Item Deleted`, `Deleted`);
                })
                .catch(() => {
                    NotificationManager.error(`Could not delete item`, `Error`);
                });
        }
    };

    onEditClick = () => {
        this.setState({isEditing: true})
    };

    onCancelClick = () => {
        this.resetState();
    };

    /*
    * Edit, Delete, actions section
    * */
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

    /*
     *Displays items table row depending on isEditing state
    * */
    render_items = () => {
        if (this.state.isEditing) {
            return this.editItemSection();
        }
        return this.sectionForItem();
    };

    /*
    * Rendered when bucket item is being edited
    * */
    editItemSection = () => (
        <tr>
            <td>
                <input
                    type="text"
                    name="name"
                    value={this.state.name}
                    onChange={this.onInputChanged}/>
            </td>
            {this.itemStatus()}
            <td>{this.props.date_added}</td>
            {this.renderActions()}
        </tr>
    );

    /*
    * Section for displaying an item
    * */
    sectionForItem = () => (
        <tr>
            <td onClick={this.changeStatus} className="main-name">
                {this.state.name}
            </td>
            {this.itemStatus()}
            <td>{this.props.date_added}</td>
            {this.renderActions()}
            <NotificationContainer/>
        </tr>
    );

    /*
    * Return glyph if item status is true
    * */
    itemStatus = () => {
        if (this.state.status === "true") {
            return (
                <td><span className="glyphicon glyphicon-ok done"></span></td>
            );
        }
        return (<td></td>);
    };

    render() {
        return this.render_items();
    }
}

export default ItemList;
