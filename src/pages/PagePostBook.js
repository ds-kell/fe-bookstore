import React from 'react';

import PostBook from '../components/Book/PostBook';
import './style.css'

class PagePostBook extends React.Component {
  render() {
    return (
      <div className='body'>
        <PostBook />
      </div>
    )
  }
}

export default PagePostBook;
