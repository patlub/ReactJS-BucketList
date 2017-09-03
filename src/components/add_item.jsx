import React, {Component} from 'react';
import '../App.css';
import axiosInstance from './config';

class AddItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loggedIn: localStorage.getItem('token'),
        };
    }

    render() {
        return (
            <form className="form-inline" onSubmit={this.onAddItemHandler.bind(this)}>
                    <div className="form-group">
                        <input
                            className="form-control"
                            type="text"
                            placeholder="item name"
                            ref="item_name"
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

    onAddItemHandler(event) {
        event.preventDefault();
        const item = this.refs.item_name.value;

        axiosInstance.post('/buckets/' + this.props.bucket_id + '/items',
            {
                item
            })
            .then((response) => {
                this.props.addItem(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }
}
export default AddItem;
