import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import Form from 'react-bootstrap/Form';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = (e) => {
    e.preventDefault();
    const apiUrl = 'http://127.0.0.1:8000/api/login/';

    axios
      .post(apiUrl, { username, password })
      .then((response) => {
        console.log('Login successful:', response.data);
        login(response.data);
        navigate('/Home');
      })
      .catch((error) => {
        console.error('Login failed:', error);
      });
  };

  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="col-6 offset-3 my-5 bg-light shadow p-3">
            <Form  onSubmit={handleLogin} >
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Username</Form.Label>
                <Form.Control type="text" placeholder="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlTextarea1"
              >
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="password"
                 value={password}
                 onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>
                <button  className='btn btn-primary'>Login</button>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
