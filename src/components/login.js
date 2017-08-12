import React, {Component} from 'react';
import '../App.css';
import {Link} from 'react-router-dom'
import $ from 'jquery'

class Login extends Component {
    render() {
        return (
            <div className="col-md-4">
                <form onSubmit={this.onLoginHandler.bind(this)}>
                    <div className="modal-body">
                        <div className="form-group">
                            <input className="form-control" type="email"
                                   placeholder="email" ref="login_email" required/>
                        </div>
                        <div className="form-group">
                            <input className="form-control" type="password" placeholder="Password"
                                   ref="login_password" required/>
                        </div>

                    </div>
                    <div class="modal-footer">
                        <div>
                            <button type="submit" className="btn btn-primary btn-lg btn-block">Login</button>
                        </div>

                        <div>
                            <Link to="register" type="button" className="btn btn-link">Register</Link>
                            <Link to="forgot-password" type="button" className="btn btn-link">Forgot password</Link>
                        </div>
                    </div>
                </form>
            </div>

        );
    }

    onLoginHandler(event) {
        event.preventDefault();
        const email = this.refs.login_email.value;
        const password = this.refs.login_password.value;

        $.ajax({
            type: "POST",
            url: 'https://patrickluboobi-bucket-list-api.herokuapp.com/auth/login',
            dataType: 'json',
            contentType: 'application/json; charset=utf-8',
            async: false,
            data: JSON.stringify({email: email, password: password}),
            success: function (response) {
                console.log(response['id']);
                window.location = '/buckets';
            }
        })

    }

}
export default Login;
