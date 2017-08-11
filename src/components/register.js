import React, {Component} from 'react';
import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom'
import '../App.css';

class Register extends Component {
    render() {
        return (
            <div className="App">
                <p className="App-intro">
                    <form onSubmit={this.onSubmitClick.bind(this)}>
                        <input type="text" placeholder="Name" ref="name"/>
                        <input type="text" placeholder="Email" ref="email"/>
                        <input type="password" placeholder="Password" ref="password"/>
                        <button>Submit</button>
                    </form>
                </p>
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
