import React, {Component} from 'react';

// styles
import '../App.css';

// configs
import {baseURL} from '../configs/config';

// Third party
import axios from 'axios'
import {NotificationContainer, NotificationManager} from 'react-notifications';


const initialState = {
    item: ''
};

class AddItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loggedIn: localStorage.getItem('token'),
            item: '',
        };

    }

    resetState = () => {
        this.setState(initialState);
    };

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
     * This method handles adding an item
     * @param {event} event when triggering addItem action.
     */
    addItem = (event) => {
        event.preventDefault();
        axios.defaults.headers.common['Authorization'] = localStorage.getItem('token');
        axios.post(`${baseURL}/buckets/${this.props.bucketId}/items`,
            {
                item: this.state.item,
            })
            .then((response) => {
                this.props.addItem(response.data);
                NotificationManager.success(`Item ${this.state.item} has been created`, `Success`);
                this.resetState();
            })
            .catch((error) => {
                NotificationManager.error(`Item ${this.state.item} already exists`, `Error`);
            });

    };

    render() {
        return (
            <form className="form-inline" onSubmit={this.addItem}>
                <div className="form-group">
                    <input
                        className="form-control"
                        type="text"
                        name="item"
                        value={this.state.item}
                        placeholder="item name"
                        onChange={this.onInputChanged}
                        required
                    />
                </div>
                <div className="form-group">
                    <button type="submit" className="btn btn-primary">Add Item
                    </button>
                </div>
                <NotificationContainer/>
            </form>
        );
    }
}

export default AddItem;
