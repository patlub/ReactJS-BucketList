import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Route} from 'react-router-dom';
import './index.css';
import App from './App';
import Login from './components/login';
import Register from './components/register';
import Buckets from './components/buckets';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
    <BrowserRouter>
        <div>
            {/*<Route path='/' component={App}/>*/}
            <Route path='/buckets' component={Buckets}/>
            <Route path='/login' component={Login}/>
            <Route path='/register' component={Register}/>
        </div>
    </BrowserRouter>

    , document.getElementById('root'));
registerServiceWorker();
