import { useState, useEffect } from 'react';
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

const IsConnected = () => {
  useEffect(() => {
    getUser();
  });
  let [isAuth, setIsAuth] = useState('');
  const params = new URLSearchParams();
  params.append('userData', localStorage.getItem('userId'));
  let userId = localStorage.getItem('userId');
  const getUser = async () => {
    const data = await api.post('/', params).then(({ data }) => data);
    console.log(data.id.toString());
    console.log(userId);
    if (data.id.toString() === userId) {
      setIsAuth(true);
    }
  };

  const isUserAuth = () => {
    if (isAuth === true) {
      return true;
    } else {
      return false;
    }
  };

  return <div>{isUserAuth() === true && <Redirect to='/articles' />}</div>;
};

export default IsConnected;
