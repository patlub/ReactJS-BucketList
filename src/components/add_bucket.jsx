import React, {Component} from 'react';
import '../App.css';
import {Link, Redirect} from 'react-router-dom';
import axiosInstance from './config';

class AddBucket extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loggedIn: localStorage.getItem('token')
        };
    }

    render() {
        return (
            <div className="container-fluid text-center ">
                <div className="col-md-4 col-md-offset-4 col-sm-9 auth-box">
                    <div className="panel panel-primary">
                        <div className="panel-heading">
                            <h4 className="panel-title">Login</h4>
                        </div>
                        <div className="panel-body">
                            <form onSubmit={this.onAddBucketHandler.bind(this)}>
                                <div className="modal-body">
                                    <div className="form-group">
                                        <input className="form-control" type="email"
                                               placeholder="Email" ref="login_email" required/>
                                    </div>
                                    <div className="form-group">
                                        <input className="form-control" type="password" placeholder="Password"
                                               ref="login_password" required/>
                                    </div>

                                </div>
                                <div className="modal-footer">
                                    <div>
                                        <button type="submit" className="btn btn-primary btn-lg btn-block">Login
                                        </button>
                                    </div>
                                    <div>
                                        <Link to="register" className="btn btn-link">Register</Link>
                                        <Link to="forgot_password" className="btn btn-link">Forgot Password</Link>
                                    </div>
                                </div>
                            </form>

                        </div>
                    </div>
                </div>
            </div>
        );
    }

    onAddBucketHandler(event) {
        event.preventDefault();
        const email = this.refs.login_email.value;
        const password = this.refs.login_password.value;

        axiosInstance.post('/auth/login',
            {
                email: email,
                password: password
            })
            .then(function (response) {
                if (response.status === 201) {
                    localStorage.setItem('token', response.data.id);
                    this.setState({loggedIn: response.data.id});
                }
            }.bind(this))
            .catch(function (error) {
                console.log(error);
            });
    }
}
export default AddBucket;
