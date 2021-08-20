// Imports
import React, { useState } from 'react';
import '../styles/style.css';
import Nav from 'react-bootstrap/Nav';
import { useHistory } from 'react-router-dom';
import logo from '../logos/icon-left-font.png';
import Container from 'react-bootstrap/Container';
import axios from 'axios';

// Création de l'instance axios
const api = axios.create({
  baseURL: 'http://localhost:3002/api/users/me',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    common: {
      Authorization: localStorage.getItem('token')
    }
  }
});

const params = new URLSearchParams();
params.append('userData', localStorage.getItem('userId'));
// Composant barre de navigation

const Navigation = () => {
  let [isAuth, setIsAuth] = useState('');
  const history = useHistory();

  const getUser = async () => {
    let data = await api.post('/', params).then(({ data }) => data);

    setIsAuth(data.isAdmin);
  };
  getUser();
  const isUserAuth = () => {
    if (isAuth === 2) {
      console.log(isAuth);
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
            <div className='buttonContainer'>
              <button onClick={disconnectUser} className='btn btn-primary'>
                Déconnexion
              </button>
            </div>
          </div>
          <Nav.Item>
            {isUserAuth() === true && <Nav.Link href='/admin'>Admin</Nav.Link>}
          </Nav.Item>
        </Nav>
      </Container>
    </div>
  );
};

export default Navigation;
