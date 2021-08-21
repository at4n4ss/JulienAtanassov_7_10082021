import { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';

const IsNotConnected = () => {
  useEffect(() => {
    getUser();
  });

  let [isNotAuth, setIsNotAuth] = useState('');
  const params = new URLSearchParams();
  params.append('userData', localStorage.getItem('userId'));

  const getUser = async () => {
    const data = localStorage.getItem('userId');

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
