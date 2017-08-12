import React, {Component} from 'react';
import {Link} from 'react-router-dom'
import '../App.css';
import $ from 'jquery'

class Register extends Component {
    render() {
        return (
            <div className="col-md-4">
                <form onSubmit={this.onRegisterClick.bind(this)}>
                    <div className="modal-body">
                        <div className="form-group">
                            <input className="form-control" type="text"
                                   placeholder="Name" ref="reg_name" required/>
                        </div>
                        <div className="form-group">
                            <input className="form-control" type="email" placeholder="Email" ref="reg_email" required/>
                        </div>
                        <div className="form-group">
                            <input className="form-control" type="password" placeholder="Password" ref="reg_password"
                                   required/>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <div>
                            <button type="submit" className="btn btn-primary btn-lg btn-block">Register</button>
                        </div>
                        <div>
                            <Link to="login" type="button" className="btn btn-link">Login</Link>
                            <Link to="forgot-password" type="button" className="btn btn-link">Forgot password</Link>
                        </div>
                    </div>
                </form>
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


export default Register;
