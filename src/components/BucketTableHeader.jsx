import React from 'react';

// styles
import '../App.css';

function BucketTableHeader() {
  return (
    <thead>
      <tr>
        <th>Bucket name</th>
        <th>Description</th>
        <th>Date Added</th>
        <th width="70">Action</th>
      </tr>
    </thead>
  );
}

export default BucketTableHeader;
