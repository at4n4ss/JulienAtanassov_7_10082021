// Imports
import React from 'react';
import '../styles/style.css';
import RegisterForm from '../components/RegisterForm';
import Navigation from '../components/Navigation.';

// Page Inscription
const Register = () => {
  return (
    <div>
      <Navigation />
      <RegisterForm />
    </div>
  );
};

export default Register;
