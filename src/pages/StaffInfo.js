import React from 'react';

import GetStaffInfo from '../components/Staff/GetStaffInfo';
import './style.css'

class Staff extends React.Component {
  render() {
    return (
      <div className='body'>
        <GetStaffInfo />
      </div>
    )
  }
}

export default Staff;
