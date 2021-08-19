// Imports
import React, { useState } from 'react';
import '../styles/style.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

// Fonction permettant de gérer le formulaire de connexion
const LoginForm = () => {
  const history = useHistory();
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
        localStorage.setItem('userId', response.data.userId);
        localStorage.setItem('token', 'bearer' + ' ' + response.data.token);
        history.push('/articles');
      })
      .catch(error => {
        console.log(error);
      });
  };
  const redirect = () => {
    history.push('/sinscrire');
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
      <Button onClick={redirect} className='registerBtn' variant='primary'>
        S'inscrire
      </Button>
    </Form>
  );
};

export default LoginForm;
