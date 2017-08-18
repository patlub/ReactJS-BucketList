import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Route, Redirect} from 'react-router-dom';
import './index.css';
import App from './App';
import Login from './components/login';
import Logout from './components/logout';
import Register from './components/register';
import ForgotPassword from './components/forgot_password';
import Buckets from './components/buckets';
import registerServiceWorker from './registerServiceWorker';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';

ReactDOM.render(<BrowserRouter>
        <div>
            <Route path='/' component={Buckets} />
            <Route path='/login' component={Login} />
            <Route path='/register' component={Register} />
            <Route path='/forgot_password' component={ForgotPassword}/>
            <Route path='/logout' component={Logout}/>
        </div>
    </BrowserRouter>, document.getElementById('root'));
registerServiceWorker();
