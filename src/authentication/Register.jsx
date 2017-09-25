// styles
import '../App.css';

import React, {Component} from 'react';
import {Link, Redirect} from 'react-router-dom';

// configs
import {baseURL} from '../configs/config';

// Third party
import axios from 'axios'

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loggedIn: localStorage.getItem('token'),
            name: '',
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
     * This method handles user registration
     * @param {event} event when triggering register action.
     */
    onRegisterClick = (event) => {
        console.log(this.state);
        event.preventDefault();
        axios.post(`${baseURL}/auth/register`,
            {
                name: this.state.name,
                email: this.state.email,
                password: this.state.password
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
    };

    render() {
        if (this.state.loggedIn) {
            return <Redirect to="/buckets"/>
        }

        return (
            <div className="container-fluid text-center ">
                <div className="col-md-4 col-md-offset-4 col-sm-9 auth-box">
                    <div className="panel panel-primary">
                        <div className="panel-heading">
                            <h4 className="panel-title">Sign up</h4>
                        </div>
                        <div className="panel-body">
                            <form onSubmit={this.onRegisterClick}>
                                <div className="modal-body">
                                    <div className="form-group">
                                        <input
                                            className="form-control"
                                            type="text"
                                            name="name"
                                            value={this.state.name}
                                            onChange={this.onInputChanged}
                                            placeholder="Name"
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <input
                                            className="form-control"
                                            type="email"
                                            name="email"
                                            value={this.state.email}
                                            onChange={this.onInputChanged}
                                            placeholder="Email"
                                            required/>
                                    </div>
                                    <div className="form-group">
                                        <input
                                            className="form-control"
                                            type="password"
                                            name="password"
                                            value={this.state.password}
                                            onChange={this.onInputChanged}
                                            placeholder="Password"
                                            required/>
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <div>
                                        <button type="submit" className="btn btn-primary btn-lg btn-block">Register
                                        </button>
                                    </div>
                                    <div>
                                        <Link to="login" className="btn btn-link">Login</Link>
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


export default Register;
