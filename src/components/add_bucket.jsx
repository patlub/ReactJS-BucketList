import React, {Component} from 'react';
import '../App.css';
import {Link, Redirect} from 'react-router-dom';
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
                            {AddBucket.render_form()}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    static render_form() {
        return (
            <form onSubmit="">
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
                            ref="desc"
                            required
                        >Description</textarea>
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
        const email = this.refs.login_email.value;
        const password = this.refs.login_password.value;

        axiosInstance.post('/auth/login',
            {
                email,
                password,
            })
            .then((response) => {
                if (response.status === 201) {
                    localStorage.setItem('token', response.data.id);
                    this.setState({loggedIn: response.data.id});
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }
}
export default AddBucket;
