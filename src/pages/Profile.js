import React from 'react';

import GetProfile from '../components/Profile/GetProfile';
import './style.css'

class Profile extends React.Component {
  render() {
    return (
      <div className='body'>
        <GetProfile />
      </div>
    )
  }
}

export default Profile;
