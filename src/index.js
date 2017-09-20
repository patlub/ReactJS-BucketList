import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Route} from 'react-router-dom';
import './index.css';
import Login from './components/Login';
import Logout from './components/Logout';
import Register from './components/Register';
import ForgotPassword from './components/ForgotPassword';
import Buckets from './components/Buckets';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<BrowserRouter>
        <div>
            <Route path='/buckets' component={Buckets} />
            <Route path='/login' component={Login} />
            <Route path='/register' component={Register} />
            <Route path='/forgot_password' component={ForgotPassword}/>
            <Route path='/logout' component={Logout}/>
        </div>
    </BrowserRouter>, document.getElementById('root'));
registerServiceWorker();
