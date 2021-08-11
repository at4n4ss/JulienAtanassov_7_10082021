import React, { useState } from 'react';
import '../styles/style.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import axios from 'axios';

const LoginForm = () => {
  const [emailLog, setEmailLog] = useState('');
  const [passwordLog, setPasswordLog] = useState('');
  let URL = 'http://localhost:3002/api/users/login';
  let data = { email: emailLog, password: passwordLog };
  const login = e => {
    e.preventDefault();
    axios(URL, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      data: data
    })
      .then(response => {
        localStorage.setItem('token', 'bearer' + ' ' + response.data.token);
      })
      .catch(error => {
        console.log(error);
      });
  };
  return (
    <Form>
      <Form.Group className='mb-3' controlId='formBasicUsername'>
        <Form.Label>Email</Form.Label>
        <Form.Control
          type='email'
          onChange={e => {
            setEmailLog(e.target.value);
          }}
          placeholder='exemple@gmail.com'
        />
      </Form.Group>
      <Form.Group className='mb-3' controlId='formBasicPassword'>
        <Form.Label>Password</Form.Label>
        <Form.Control
          type='password'
          onChange={e => {
            setPasswordLog(e.target.value);
          }}
          placeholder='Password'
        />
      </Form.Group>

      <Button onClick={login} variant='primary' type='submit'>
        Se connecter
      </Button>
    </Form>
  );
};

export default LoginForm;
