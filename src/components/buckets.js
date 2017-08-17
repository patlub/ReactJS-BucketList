import React, {Component} from 'react';
import {BrowserRouter, Route, Redirect} from 'react-router-dom';
import '../App.css';
import NavBar from './navbar'
import Login from './login'


class Buckets extends Component {
    constructor(props) {
        super(props);
        this.state = {
            token: null
        };
    }
    render() {
        if (this.props.auth) {
            return (
                <NavBar/>
            );
        } else {
            return <Redirect to="/login"/>
        }
    }
}


export default Buckets;
