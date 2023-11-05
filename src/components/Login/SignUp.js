import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './login.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { loginUser } from './Login';

function SignUp({ setToken }) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [branchId, setBranchId] = useState('');
  const [role, setRole] = useState('');
  const [dob, setDob] = useState('');
  const [address, setAddress] = useState('');
  const [fullName, setFullname] = useState('');
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8088/api/public/user/create-user', {
        username,
        email,
        password,
        authorities: ['STAFF']
      });
      if (response.data.message === 'Created') {
        // Đăng nhập tự động
        const token = await loginUser({ username, password });
        if (token) {
          setToken(token);
          setShouldNavigate(true);
        }
      }
    } catch (error) {
      console.error(error);
    }
  }

  const navigate = useNavigate();
  const [shouldNavigate, setShouldNavigate] = useState(false);

  if (shouldNavigate) {
    navigate('/');
  }
  return (
    <div className='row'>
      <div className="col-md-4">
      </div>
      <div className="col-md-4">
        <div className='login_block'>
          <h4>
            Đăng ký
          </h4>
          <form onSubmit={handleSubmit}>
            <div className='row'>
              <div className='col-sm-12'>
                <input placeholder='Tên đăng nhập' className='username-input' type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
                <input placeholder='email' className='username-input' type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <input placeholder='Mật khẩu' className='username-input' type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
              </div>
            </div>
            <button type="submit" className='signup-btn'>Đăng ký</button>
          </form>
        </div>
      </div>
      <div className="col-md-4">
      </div>
    </div>
  )
}
export default SignUp;
