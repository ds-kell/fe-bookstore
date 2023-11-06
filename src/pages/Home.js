import React from 'react';

import { GetBook } from '../components/Book/GetBook';
import './style.css'

class Home extends React.Component {
  render() {
    return (
      <div className='body'>
        <GetBook />
      </div>
    )
  }
}

export default Home;
