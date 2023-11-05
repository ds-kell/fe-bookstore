import React from 'react';

import Navbar from '../components/Navbar/Navbar'
import { GetBook } from '../components/Book/GetBook';

class Home extends React.Component {
  render() {
    return (
      <div>
        <GetBook />
      </div>
    )
  }
}

export default Home;
