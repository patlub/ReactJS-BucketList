import React from 'react';
import '../App.css';

function ItemTableHeader() {
    return (
        <thead>
        <tr>
            <th>Item</th>
            <th>status</th>
            <th>Date Added</th>
            <th>Action</th>
        </tr>
        </thead>
    );
}

export default ItemTableHeader;
