// Imports
import React, { useState, useEffect } from 'react';
import Navigation from '../components/Navigation.';
import AdminContents from '../components/AdminContents';
import AdminComments from '../components/AdminComments';
import IsNotConnected from '../components/IsNotConnected';
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
// Page Articles
const Admin = () => {
  // Composant barre de navigation
  const params = new URLSearchParams();
  params.append('userData', localStorage.getItem('userId'));
  let [isAuth, setIsAuth] = useState('');
  useEffect(() => {
    getUser();
  });
  const getUser = async () => {
    console.log(params.UserData);
    let data = await api.post('/', params).then(({ data }) => data);
    console.log(data.isAdmin);
    setIsAuth(data.isAdmin);
  };
  const isUserAuth = () => {
    if (isAuth === 2) {
      console.log(isAuth);
      return true;
    } else {
      return false;
    }
  };
  return (
    <div>
      <IsNotConnected />
      {isUserAuth() === true && (
        <div>
          <Navigation />
          <AdminContents />
          <AdminComments />
        </div>
      )}
      {isUserAuth() === false && (
        <div>
          <h1>Bien tenté</h1>
        </div>
      )}
    </div>
  );
};
export default Admin;
