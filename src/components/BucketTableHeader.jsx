// styles
import '../App.css';

import React from 'react';

function BucketTableHeader() {
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

export default BucketTableHeader;
