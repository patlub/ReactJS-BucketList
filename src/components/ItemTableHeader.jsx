import React, {Component} from 'react';
import '../App.css';

class ItemTableHeader extends Component {
    render() {
        return (
            <thead>
            <tr>
                <th>Bucket name</th>
                <th>Date Added</th>
                <th>Action</th>
            </tr>
            </thead>
        );
    }

}
export default ItemTableHeader;
