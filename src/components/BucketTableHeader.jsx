import React, {Component} from 'react';
import '../App.css';

class BucketListItem extends Component {
    render() {
        return (
            <tr>
                <td>{this.props.name}</td>
            </tr>
        );
    }
}
export default BucketListItem;
