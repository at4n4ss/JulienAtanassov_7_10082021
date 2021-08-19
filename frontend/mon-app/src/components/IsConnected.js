import { useState } from 'react';
import { Redirect } from 'react-router-dom';
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

const IsConnected = () => {
  let [isAuth, setIsAuth] = useState('');

  const getUser = async () => {
    api.post('/', params).then(({ data }) => data);
  };

  const isUserAuth = () => {
    if (getUser()) {
      return true;
    }
  };

  return <div>{isUserAuth() === false && <Redirect to='/articles' />}</div>;
};

export default IsConnected;
