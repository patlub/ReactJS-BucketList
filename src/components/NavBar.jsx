import React from 'react';
import {Link} from 'react-router-dom';
import '../App.css';


const NavBar = () => (
    <div className="row app-nav">
        <div className="col-md-8 col-sm-8 pull-left">
            <h3 id="app-title">BucketList</h3>
        </div>
        <div className="col-md-2 col-sm-2 nav-tab text-center">
            <a href="#" data-toggle="modal" data-target="#addBucketModal">
                Add Bucket
            </a>

        </div>
        <div className="col-md-2 col-sm-2 nav-tab text-center">
            <Link to="logout">Logout</Link>
        </div>
    </div>
);
export default NavBar;
