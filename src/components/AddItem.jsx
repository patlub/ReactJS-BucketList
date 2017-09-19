import React, {Component} from 'react';

// styles
import '../App.css';

// helpers
import axiosInstance from './config';

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
        axiosInstance.post(`/buckets/${this.props.bucketId}/items`,
            {
                item: this.state.item,
            })
            .then((response) => {
                this.props.addItem(response.data);
                this.resetState();
            })
            .catch((error) => {
                console.log(error);
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
            </form>
        );
    }
}

export default AddItem;
