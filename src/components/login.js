import React, {Component} from 'react';
import '../App.css';
import {Link, Redirect} from 'react-router-dom'
import $ from 'jquery'
import Bucket from './buckets'


class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loggedIn: false
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
                            <h4 className="panel-title">Login</h4>
                        </div>
                        <div className="panel-body">
                            <form onSubmit={this.onLoginHandler.bind(this)}>
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

    onLoginHandler(event) {
        event.preventDefault();
        const email = this.refs.login_email.value;
        const password = this.refs.login_password.value;
        this.setState({loggedIn: true});

        // $.ajax({
        //     type: "POST",
        //     url: 'https://patrickluboobi-bucket-list-api.herokuapp.com/auth/login',
        //     dataType: 'json',
        //     contentType: 'application/json; charset=utf-8',
        //     async: false,
        //     data: JSON.stringify({email: email, password: password}),
        //     success: function (response) {
        //         this.setState({loggedIn: true});
        //         // window.location = '/buckets';
        //     }.bind(this)
        // })
    }

}
export default Login;
