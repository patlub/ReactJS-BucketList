import React, {Component} from 'react';
import {Link, Redirect} from 'react-router-dom'
import '../App.css';
import axiosInstance from './config';

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loggedIn: localStorage.getItem('token')
        };
    }

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
                            <form onSubmit={this.onRegisterClick.bind(this)}>
                                <div className="modal-body">
                                    <div className="form-group">
                                        <input className="form-control" type="text"
                                               placeholder="Name" ref="reg_name" required/>
                                    </div>
                                    <div className="form-group">
                                        <input className="form-control" type="email" placeholder="Email"
                                               ref="reg_email"
                                               required/>
                                    </div>
                                    <div className="form-group">
                                        <input className="form-control" type="password" placeholder="Password"
                                               ref="reg_password"
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

    onRegisterClick(event) {
        event.preventDefault();
        const name = this.refs.reg_name.value;
        const email = this.refs.reg_email.value;
        const password = this.refs.reg_password.value;

        axiosInstance.post('/auth/register',
            {
                name: name,
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


export default Register;
