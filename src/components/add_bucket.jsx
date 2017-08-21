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
            <div className="modal fade" id="addBucketModal" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span
                                aria-hidden="true">&times;</span></button>
                            <h4 className="modal-title" id="myModalLabel">Add Bucket</h4>
                        </div>
                        <div className="modal-body">
                            {this.render_add_bucket_form()}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    render_add_bucket_form() {
        return (
            <form onSubmit={this.onAddBucketHandler.bind(this)}>
                <div className="modal-body">
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
                        <textarea
                            className="form-control"
                            type="text"
                            placeholder="Description"
                            ref="bucket_desc"
                            required
                        ></textarea>
                    </div>

                </div>
                <div className="modal-footer">
                    <div>
                        <button type="submit" className="btn btn-primary btn-lg btn-block">Add Bucket
                        </button>
                    </div>
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
