import { Link } from 'react-router-dom';
import React from 'react';

// styles
import '../App.css';

function NavBar() {
  return (
    <div className="row app-nav">
      <div className="col-md-10 col-sm-10 pull-left">
        <h3 id="app-title">BucketList</h3>
      </div>
      <div className="col-md-2 col-sm-2 nav-tab text-center">
        <Link to="logout">Logout</Link>
      </div>
    </div>
  );
}

export default NavBar;
