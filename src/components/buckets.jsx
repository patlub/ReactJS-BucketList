import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import AddBucket from './add_bucket'
import '../App.css';
import NavBar from './navbar'
import axiosInstance from './config';
import _ from 'lodash'

const bucketLists = [];

class Buckets extends Component {
    constructor(props) {
        super(props);
        this.state = {
            token: localStorage.getItem('token'),
            buckets: false
        };
    }

    render() {
        if (!this.state.buckets) {
            this.getBuckets();
        }
        if (this.state.token) {
            return (
                <div>
                    <NavBar/>
                    <AddBucket buckets={this.state.buckets} addBucket={this.addBucket.bind(this)}/>
                </div>

            );
        } else {
            return <Redirect to="/login"/>
        }
    }

    getBuckets() {
        axiosInstance.get('/buckets')
            .then(function (response) {
                _.forEach(response.data, function (value) {
                    bucketLists.push(value);
                });
                this.setState({buckets: bucketLists});
            }.bind(this))
            .catch(function (error) {
                console.log(error);
            });
    }

    addBucket(bucket) {
        console.log(this.state.buckets);
        bucketLists.push(bucket);
        this.setState({bucket: bucketLists})
    }

    render_buckets(buckets) {
        return (
            <div className="panel panel-primary">
                <div className="panel-heading">
                    <h4 className="panel-title">Login</h4>
                </div>
                <div className="panel-body">
                    <form onSubmit={this.onLoginHandler.bind(this)}>
                        <div className="modal-body">
                            <div className="form-group">
                                <input
                                    className="form-control"
                                    type="email"
                                    placeholder="Email"
                                    ref="login_email"
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <input
                                    className="form-control"
                                    type="password"
                                    placeholder="Password"
                                    ref="login_password"
                                    required
                                />
                            </div>

                        </div>
                        <div className="modal-footer">
                            <div>
                                <button type="submit" className="btn btn-primary btn-lg btn-block">Login
                                </button>
                            </div>
                        </div>
                    </form>

                </div>
            </div>
        );
    }
}


export default Buckets;
