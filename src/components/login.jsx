import React, {Component} from 'react';
import {Link, Redirect} from 'react-router-dom';

// Styles
import '../App.css';

// configs
import axiosInstance from './config';


class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loggedIn: localStorage.getItem('token'),
            email: '',
            password: '',
        };

    }

    onInputChanged = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    };

    onLoginHandler = (event) => {
        event.preventDefault();
        axiosInstance.post(`/auth/login`,
            {
                email: this.state.email,
                password: this.state.password
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

    };

    render() {
        if (this.state.loggedIn) {
            return <Redirect to="/"/>
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
    }
}

export default Login;
