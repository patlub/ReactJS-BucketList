// Styles
import '../App.css';

import React, {Component} from 'react';
import {Link, Redirect} from 'react-router-dom';

// configs
import {baseURL} from '../configs/config';

// Third party
import axios from 'axios'
import {NotificationContainer, NotificationManager} from 'react-notifications';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loggedIn: localStorage.getItem('token'),
            email: '',
            password: '',
        };

    }

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
     * This method handles user login
     * @param {event} event event triggering login action.
     */
    onLoginHandler = (event) => {
        event.preventDefault();
        axios.post(`${baseURL}/auth/login`,
            {
                email: this.state.email,
                password: this.state.password
            })
            .then((response) => {
                localStorage.setItem('token', response.data.token);
                this.setState({loggedIn: response.data.token});
            })
            .catch(() => {
                NotificationManager.error(`Invalid username or password`);
            });

    };

    render() {
        if (this.state.loggedIn) {
            return <Redirect to="/buckets"/>
        }
        else {
            return (
                <div className="container-fluid text-center ">
                    <div className="col-md-4 col-md-offset-4 col-sm-9 auth-box">
                        <div className="panel panel-primary">
                            <div className="panel-heading">
                                <h4 className="panel-title">Login</h4>
                            </div>
                            <div className="panel-body">
                                <form onSubmit={this.onLoginHandler}>
                                    <div className="modal-body">
                                        <div className="form-group">
                                            <input
                                                className="form-control"
                                                type="email"
                                                placeholder="Email"
                                                required
                                                name="email"
                                                value={this.state.email}
                                                onChange={this.onInputChanged}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <input
                                                className="form-control"
                                                type="password"
                                                placeholder="Password"
                                                name="password"
                                                value={this.state.password}
                                                onChange={this.onInputChanged}
                                                required
                                            />
                                        </div>

                                    </div>
                                    <div className="modal-footer">
                                        <div>
                                            <button
                                                type="submit"
                                                className="btn btn-primary btn-lg btn-block">Login
                                            </button>
                                        </div>
                                        <div>
                                            <Link to="register" className="btn btn-link">Register</Link>
                                        </div>
                                    </div>
                                </form>

                            </div>
                        </div>
                    </div>
                    <NotificationContainer/>
                </div>
            );
        }
    }
}

export default Login;
