import React, {Component} from 'react';
import {Link} from 'react-router-dom'
import '../App.css';
import $ from 'jquery'
import Login from "./login";
import Bucket from "./buckets";
class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loggedIn: false
        };
    }

    render() {

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

        $.ajax({
            type: "POST",
            url: 'https://patrickluboobi-bucket-list-api.herokuapp.com/auth/register',
            dataType: 'json',
            contentType: 'application/json; charset=utf-8',
            async: false,
            data: JSON.stringify({name: name, email: email, password: password}),
            success: function (response) {
                console.log(response['id']);
                window.location = '/buckets';
            }
        })

    }

}


export
default
Register;
