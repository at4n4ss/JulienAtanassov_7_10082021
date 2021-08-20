// Imports
import React, { useState, useEffect } from 'react';
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

// Composant barre de navigation

const Navigation = () => {
  const params = new URLSearchParams();
  params.append('userData', localStorage.getItem('userId'));
  let [isAuth, setIsAuth] = useState('');
  const history = useHistory();

  const getUser = async () => {
    console.log(params.UserData);
    let data = await api.post('/', params).then(({ data }) => data);
    console.log(data.isAdmin);
    setIsAuth(data.isAdmin);
  };
  useEffect(() => {
    console.log('isAuth updated', isAuth);
  }, [isAuth]);
  useEffect(() => {
    getUser();
  }, [history]);

  const isUserAuth = () => {
    if (isAuth === 2) {
      console.log(isAuth);
      return true;
    } else {
      return false;
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
          <div className='containerNavButtons'>
            <Nav.Item>
              <Nav.Link className='navButtons' href='/articles'>
                Articles
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link href='/profile'>Profile</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              {isUserAuth() === true && (
                <Nav.Link href='/admin'>Admin</Nav.Link>
              )}
            </Nav.Item>
            <div className='disconnectContainer'>
              <div className='buttonContainer'>
                <button onClick={disconnectUser} className='btn btn-primary'>
                  Déconnexion
                </button>
              </div>
            </div>
          </div>
        </Nav>
      </Container>
    </div>
  );
};

export default Navigation;
