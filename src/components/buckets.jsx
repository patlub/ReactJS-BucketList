import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import AddBucket from './add_bucket'
import '../App.css';
import NavBar from './navbar'
import axiosInstance from './config';
import _ from 'lodash'
import BucketList from './BucketList';
import BucketTableHeader from './BucketTableHeader';

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
                <div className="container-fluid">
                    <NavBar/>
                    <AddBucket buckets={this.state.buckets} addBucket={this.addBucket.bind(this)}/>
                    <div className="col-sm-7">
                        <table className="table table-responsive table-striped">
                            <BucketTableHeader/>
                            <tbody>
                            {this.render_buckets()}
                            </tbody>
                        </table>
                    </div>
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
        bucketLists.push(bucket);
        this.setState({bucket: bucketLists})
    }

    render_buckets() {
        return _.map(bucketLists, (bucket, index) => <BucketList key={index}{...bucket}
                                                                 getBuckets={this.getBuckets.bind(this)}
                                                                 unSetBuckets={this.unSetBuckets.bind(this)}/>)
    }

    unSetBuckets() {
        bucketLists.length = 0;
        this.setState({buckets: bucketLists});
    }
}


export default Buckets;
