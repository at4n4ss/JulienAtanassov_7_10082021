// Imports
import React, { useState } from 'react';
import '../styles/style.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';

// Composant formulaire d'inscription
const RegisterForm = () => {
  const [emailReg, setEmailReg] = useState('');
  const [usernameReg, setUsernameReg] = useState('');
  const [passwordReg, setPasswordReg] = useState('');
  let URL = 'http://localhost:3002/api/users/register';
  let data = { username: usernameReg, password: passwordReg, email: emailReg };
  const register = e => {
    e.preventDefault();
    axios(URL, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      data: JSON.stringify(data)
    })
      .then(response => {
        alert('Compte créé');
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      });
  };
  return (
    <Form>
      <Form.Group className='mb-3' controlId='formBasicEmail'>
        <Form.Label>Email address</Form.Label>
        <Form.Control
          type='email'
          onChange={e => {
            setEmailReg(e.target.value);
          }}
          placeholder='Email'
        />
      </Form.Group>
      <Form.Group className='mb-3' controlId='formBasicUsername'>
        <Form.Label>Username</Form.Label>
        <Form.Control
          type='text'
          onChange={e => {
            setUsernameReg(e.target.value);
          }}
          placeholder='Username'
        />
      </Form.Group>
      <Form.Group className='mb-3' controlId='formBasicPassword'>
        <Form.Label>Password</Form.Label>
        <Form.Control
          type='password'
          onChange={e => {
            setPasswordReg(e.target.value);
          }}
          placeholder='Password'
        />
      </Form.Group>

      <Button onClick={register} variant='primary' type='submit'>
        S'inscrire
      </Button>
    </Form>
  );
};

export default RegisterForm;
