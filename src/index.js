import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import './index.css';
import Login from './authentication/Login';
import Logout from './authentication/Logout';
import Register from './authentication/Register';
import ForgotPassword from './components/ForgotPassword';
import Buckets from './buckets/Buckets';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<BrowserRouter>
  <div>
    <Route path="/buckets" component={Buckets} />
    <Route path="/login" component={Login} />
    <Route path="/register" component={Register} />
    <Route path="/forgot_password" component={ForgotPassword} />
    <Route path="/logout" component={Logout} />
  </div>
</BrowserRouter>, document.getElementById('root'));
registerServiceWorker();
