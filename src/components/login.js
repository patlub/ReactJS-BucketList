import React, {Component} from 'react';
import '../App.css';

class Login extends Component {

    render() {
        return (

            <form onSubmit={this.onSubmitClick.bind(this)}>
                <input type="email" placeholder="Email" ref="email"/>
                <input type="password" placeholder="Password"/>
                <button>Submit</button>
            </form>
        );
    }

    onSubmitClick(event) {
        event.preventDefault();
        this.props.checkValule(this.refs.email.value);
        console.log(this.refs.email.value);
    }

}


export default Login;
