import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';

function Registration() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegistration = (e) => {
    e.preventDefault(); 
    const apiUrl = 'http://127.0.0.1:8000/api/register/';

    const registrationData = {
      username: username,
      email: email,
      password: password,
    };
    axios
      .post(apiUrl, registrationData)
      .then((response) => {
        console.log('Registration successful:', response.data);
        navigate('/');
      })
      .catch((error) => {
        console.error('Registration failed:', error);
      });
  };
  return (
    <div>
      <h2>Registration</h2>
      <div className="container">
        <div className="row">
          <div className="col-6 offset-3 my-5 bg-light shadow p-3">
            <Form onSubmit={handleRegistration}>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>User Name</Form.Label>
                <Form.Control type="text" placeholder="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="email"
                 value={email}
                 onChange={(e) => setEmail(e.target.value)}
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
                <button className='btn btn-primary'>Register</button>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Registration;
