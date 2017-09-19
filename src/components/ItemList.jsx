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

    /*
    * Updates a bucket
    * @param {event} event fired when updating bucket
    * */
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

        })
    };

    /*
    * Deletes a bucket
    * @param {event} event fired when deleting a bucket
    * */
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
    };

    onEditClick = () => {
        this.setState({isEditing: true})
    };

    onCancelClick = () => {
        this.setState({isEditing: false})
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
        if (this.state.status === "true") {
            return this.sectionForItemStatusTrue();
        }
        return this.sectionForItemStatusFalse();
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
            <td>{this.props.date_added}</td>
            {this.renderActions()}
        </tr>
    );

    /*
    * Rendered when bucket item is set to completed
    * */
    sectionForItemStatusTrue = () => (
        <tr>
            <td onClick={this.changeStatus}>
                {this.state.name}
            </td>
            <td><span className="glyphicon glyphicon-ok done"></span></td>
            <td>{this.props.date_added}</td>
            {this.renderActions()}
        </tr>
    );

    /*
    * Rendered when bucket item is not completed
    * */
    sectionForItemStatusFalse = () => (
        <tr>
            <td onClick={this.changeStatus}>
                {this.state.name}
            </td>
            <td></td>
            <td>{this.props.date_added}</td>
            {this.renderActions()}
        </tr>
    );

    render() {
        return this.render_items();
    }
}

export default ItemList;
