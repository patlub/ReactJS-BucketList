import React, {Component} from 'react';
import {Link} from 'react-router-dom'
import '../App.css';

class Register extends Component {
    render() {
        return (
            <div className="col-md-4">
                <form>
                    <div className="modal-body">
                        <div className="form-group">
                            <input className="form-control" type="text"
                                   placeholder="Name" required/>
                        </div>
                        <div className="form-group">
                            <input className="form-control" type="email" placeholder="Email" required/>
                        </div>
                        <div className="form-group">
                            <input className="form-control" type="password" placeholder="Password"
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

    onSubmitClick(event) {
        event.preventDefault();
        const name = this.refs.name.value;
        const email = this.refs.email.value;

        console.log(name);
        console.log(email);
    }

}


export default Register;
