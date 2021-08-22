// Imports
import React from 'react';
import '../styles/style.css';
import RegisterForm from '../components/RegisterForm';
import Container from 'react-bootstrap/Container';
// Page Inscription
const Register = () => {
  return (
    <div className='home'>
      <Container>
        <Container>
          <div className='loginTitle'>
            <h2>Encore une petite étape avant d'accéder aux forums...</h2>
          </div>
          <div className='containerLogin'>
            <div className='loginFormTitle'>
              <h3>Remplissez ce formulaire pour vous inscrire</h3>
            </div>
            <div className='loginForm'>
              <RegisterForm />
            </div>
          </div>
        </Container>
      </Container>
    </div>
  );
};

export default Register;

<div className='home'>
  <Container>
    <Container>
      <div className='loginTitle'>
        <h1>Bienvenue sur Groupomania</h1>
      </div>
      <div className='containerLogin'>
        <div className='loginFormTitle'>
          <h3> Veuillez vous connecter ou vous inscrire</h3>
        </div>
        <div className='loginForm'>
          <RegisterForm />
        </div>
      </div>
    </Container>
  </Container>
</div>;
