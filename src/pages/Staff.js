import React from 'react';

import GetStaff from '../components/Staff/GetStaff';
import './style.css'

class Staff extends React.Component {
  render() {
    return (
      <div className='body'>
        <GetStaff />
      </div>
    )
  }
}

export default Staff;
