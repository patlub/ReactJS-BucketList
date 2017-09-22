import React, {Component} from 'react';

// styles
import '../App.css';

// configs
import {baseURL} from './config';

// Third party
import axios from 'axios'
import {NotificationContainer, NotificationManager} from 'react-notifications';
import 'react-notifications/lib/notifications.css';

const initialState = {
    bucket: '',
    desc: '',
};

class AddBucket extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loggedIn: localStorage.getItem('token'),
            bucket: '',
            desc: '',
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
     * This method handles adding a bucket
     * @param {event} event when triggering addBucket action.
     */
    onAddBucketHandler = (event) => {
        event.preventDefault();

        axios.defaults.headers.common['Authorization'] = localStorage.getItem('token');
        axios.post(`${baseURL}/buckets`,
            {
                bucket: this.state.bucket,
                desc: this.state.desc
            })
            .then((response) => {
                this.props.addBucket(response.data);
                NotificationManager.success(`Bucket ${this.state.bucket} has been created`, `Success`);
                // Empty state
                this.resetState()
            })
            .catch((error) => {
                NotificationManager.error(`Bucket ${this.state.bucket} already exists`, `Error`);
            });
    };

    render() {
        return (
            <form className="form-inline" onSubmit={this.onAddBucketHandler}>
                <div className="form-group">
                    <input
                        className="form-control"
                        type="text"
                        name="bucket"
                        value={this.state.bucket}
                        onChange={this.onInputChanged}
                        placeholder="Bucket name"
                        required
                    />
                </div>
                <div className="form-group">
                    <input
                        className="form-control"
                        type="text"
                        name="desc"
                        value={this.state.desc}
                        onChange={this.onInputChanged}
                        placeholder="Description"
                        required
                    />
                </div>
                <div className="form-group">
                    <button type="submit" className="btn btn-primary">Add Bucket
                    </button>
                </div>
                <NotificationContainer/>
            </form>
        );
    }
}

export default AddBucket;
