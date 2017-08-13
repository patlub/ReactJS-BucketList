import React, {Component} from 'react';
import {Link} from 'react-router-dom'
import '../App.css';

class ForgotPassword extends Component {

    render() {
        return (
            <div className="container-fluid text-center ">
                <div className="col-md-4 col-md-offset-4 col-sm-9 auth-box" align="center">
                    <div className="panel panel-primary">
                        <div className="panel-heading">
                            <h4 class="panel-title">Login or Sign up</h4>
                        </div>
                        <div className="panel-body">
                            <form>
                                <div className="modal-body">
                                    <div className="form-group">

                                        <input className="form-control" type="text"
                                               placeholder="Email" required/>
                                    </div>

                                </div>
                                <div class="modal-footer">
                                    <div>
                                        <button type="submit" className="btn btn-primary btn-lg btn-block">Send</button>
                                    </div>
                                    <div>
                                        <Link to="login" type="button" className="btn btn-link">Login</Link>
                                        <Link to="register" type="button" className="btn btn-link">Register</Link>
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


export default ForgotPassword;
