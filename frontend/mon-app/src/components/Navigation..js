// Imports
import React, { useState } from 'react';
import '../styles/style.css';
import Nav from 'react-bootstrap/Nav';
import { useHistory } from 'react-router-dom';
import logo from '../logos/icon-left-font.png';
import Container from 'react-bootstrap/Container';
// Composant barre de navigation
const Navigation = () => {
  const history = useHistory();
  const user = { id: 1, isAdmin: 0 };

  const isAuth = () => {
    if (user.isAdmin === 1) {
      return true;
    }
  };

  const disconnectUser = () => {
    localStorage.clear();
    history.push('/');
  };
  return (
    <div className='nav'>
      <Container>
        <Nav>
          <div className='containerLogo'>
            <img className='logoNav' src={logo} alt='logo' />
          </div>
          <Nav.Item>
            <Nav.Link className='navButtons' href='/articles'>
              Articles
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href='/profile'>Profile</Nav.Link>
          </Nav.Item>

          <div className='disconnectContainer'>
            <button onClick={disconnectUser} className='btn btn-primary'>
              Déconnexion
            </button>
          </div>
          <Nav.Item>
            {isAuth() === true && <Nav.Link href='/admin'>Admin</Nav.Link>}
          </Nav.Item>
        </Nav>
      </Container>
    </div>
  );
};

export default Navigation;
