// Imports
import React from 'react';
import '../styles/style.css';
import Nav from 'react-bootstrap/Nav';

// Composant barre de navigation
const Navigation = () => {
  return (
    <div className='nav'>
      <Nav>
        <Nav.Item>
          <Nav.Link href='/'>Acceuil</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link href='/articles'>Articles</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link href='/profile'>Profile</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link href='/sinscrire'>S'inscrire</Nav.Link>
        </Nav.Item>
      </Nav>
    </div>
  );
};

export default Navigation;
