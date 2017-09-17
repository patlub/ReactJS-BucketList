import React, {Component} from 'react';

// styles
import '../App.css';

// helpers
import axiosInstance from './config';

class AddItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loggedIn: localStorage.getItem('token'),
            item: '',
        };

        this.handleInput = this.handleInput.bind(this);
    }

    render() {
        return (
            <form className="form-inline" onSubmit={this.handleInput}>
                <div className="form-group">
                    <input
                        className="form-control"
                        type="text"
                        placeholder="item name"
                        ref="itemName"
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

    handleInput(event) {
        event.preventDefault();
        this.setState({item: this.refs.itemName.value}, () => {
            axiosInstance.post(`/buckets/${this.props.bucket_id}/items`,
                {
                    item: this.state.item,
                })
                .then((response) => {
                    this.props.addItem(response.data);
                })
                .catch((error) => {
                    console.log(error);
                });
        });

    }
}

export default AddItem;
