import React from 'react';

import { GetAllBook } from '../components/Book/GetAllBook';
import './style.css'
import TabMenuBook from './TabMenuBook';
class AllBook extends React.Component {
  render() {
    return (
      <div className='body'>
        <TabMenuBook/>
        <GetAllBook />
      </div>
    )
  }
}

export default AllBook;
