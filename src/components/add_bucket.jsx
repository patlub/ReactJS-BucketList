import React, {Component} from 'react';
import '../App.css';
import axiosInstance from './config';

class AddBucket extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loggedIn: localStorage.getItem('token'),
        };
    }

    render() {
        return (
            <form className="form-inline" onSubmit={this.onAddBucketHandler.bind(this)}>
                    <div className="form-group">
                        <input
                            className="form-control"
                            type="text"
                            placeholder="Bucket name"
                            ref="bucket_name"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <input
                            className="form-control"
                            type="text"
                            placeholder="Description"
                            ref="bucket_desc"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <button type="submit" className="btn btn-primary">Add Bucket
                        </button>
                    </div>
            </form>
        );
    }

    onAddBucketHandler(event) {
        event.preventDefault();
        const bucket = this.refs.bucket_name.value;
        const desc = this.refs.bucket_desc.value;

        axiosInstance.post('/buckets',
            {
                bucket,
                desc
            })
            .then((response) => {
                this.props.addBucket(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }
}
export default AddBucket;
