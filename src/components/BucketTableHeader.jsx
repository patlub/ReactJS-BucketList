import React, {Component} from 'react';
import '../App.css';

class BucketTableHeader extends Component {
    render() {
        return (
            <thead>
            <tr>
                <th>Bucket name</th>
                <th>Description</th>
                <th>Date Added</th>
                <th>Action</th>
            </tr>
            </thead>
        );
    }

}
export default BucketTableHeader;
