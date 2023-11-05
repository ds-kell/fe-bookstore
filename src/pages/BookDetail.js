import React from 'react';

import GetBookDetail from '../components/Book/GetBookDetail';
import './style.css'

class BookDetail extends React.Component {
  render() {
    return (
      <div className='body'>
        <GetBookDetail />
      </div>
    )
  }
}

export default BookDetail;
