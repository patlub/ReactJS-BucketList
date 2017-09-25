// styles
import '../App.css';

import React from 'react';
import { Link } from 'react-router-dom';

function NavBar() {
  return (
    <div className="row app-nav">
      <div className="col-md-8 col-sm-8 pull-left">
        <h3 id="app-title">BucketList</h3>
      </div>
      <div className="col-md-2 col-sm-2 nav-tab text-center">
        <Link to="logout">Logout</Link>
      </div>
    </div>
  );
}

export default NavBar;
