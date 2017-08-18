import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import AddBucket from './add_bucket'
import '../App.css';
import NavBar from './navbar'
import axiosInstance from './config';


class Buckets extends Component {
    constructor(props) {
        super(props);
        this.state = {
            token: localStorage.getItem('token')
        };
    }

    render() {
        console.log(localStorage.getItem('token'));
        if (this.state.token) {
            return (
                <div>
                    <NavBar/>
                    <AddBucket/>
                </div>
            );
        } else {
            return <Redirect to="/login"/>
        }
    }

    getBuckets() {
        axiosInstance.get('/buckets')
            .then(function (response) {
                console.log(response)
            })
            .catch(function (error) {
                console.log(error);
            });
    }
}


export default Buckets;
