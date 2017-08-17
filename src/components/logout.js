import React, {Component} from 'react';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';

class NavBar extends Component {
    render() {
        return (
            <div className="row app-nav">
                <div className="col-md-9 pull-left">
                    <h2 id="app-title">BucketList</h2>
                </div>

            </div>
        );
    }
}
export default NavBar;
