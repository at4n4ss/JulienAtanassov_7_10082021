import { useEffect, useState } from 'react';
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

const IsNotConnected = () => {
  useEffect(() => {
    getUser();
  });

  let [isNotAuth, setIsNotAuth] = useState('');
  const params = new URLSearchParams();
  params.append('userData', localStorage.getItem('userId'));

  const getUser = async () => {
    const data = localStorage.getItem('userId');
    console.log(data);
    if (data) {
      setIsNotAuth(false);
    } else {
      setIsNotAuth(true);
    }
  };

  const isUserNotAuth = () => {
    if (isNotAuth === true) {
      return true;
    } else {
      return false;
    }
  };

  return <div>{isUserNotAuth() === true && <Redirect to='/' />}</div>;
};

export default IsNotConnected;
