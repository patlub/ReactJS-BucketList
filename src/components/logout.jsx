import React, {Component} from 'react';
import '../App.css';
import {Redirect} from 'react-router-dom';


class Logout extends Component {
    constructor(props) {
        super(props);
        localStorage.removeItem('token')
    }

    render() {
        return window.location = '/login';
        // return <Redirect to="/login"/>
    }
}
export default Logout;