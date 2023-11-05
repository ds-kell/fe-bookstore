import React from 'react';

import { GetBranch } from '../components/Branch/GetBranch';
import './style.css'

class Branch extends React.Component {
  render() {
    return (
      <div className='body'>
        <GetBranch />
      </div>
    )
  }
}

export default Branch;
