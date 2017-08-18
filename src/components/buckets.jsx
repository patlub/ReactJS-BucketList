import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
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
            this.getBuckets();
            return <h1>Buckets</h1>
        } else {
            return <Redirect to="/login"/>
        }
    }

    getBuckets() {
        axiosInstance.get('/buckets')
            .then(function (response) {
                console.log(response)
            }.bind(this))
            .catch(function (error) {
                console.log(error);
            });
    }
}


export default Buckets;
