import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar/Navbar'

import Home from './pages/Home';
import Branch from './pages/Branch';
import BookDetail from './pages/BookDetail';
import Login from './components/Login/Login';
import SignUp from './components/Login/SignUp';
import useToken from './components/Login/useToken';

function App() {
  const { setToken, tokenStorage, token } = useToken();

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/book" element={<Home />} />
        <Route path="/book/:bookId" element={<BookDetail />} />
        <Route path="/branch" element={<Branch />} />
        
        <Route path="/login" element={<Login setToken={setToken} />} />
        <Route path='/signup' element={<SignUp setToken={setToken} />} />
      </Routes>
    </>
  );
}


export default App;
