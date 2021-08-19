import { useHistory } from 'react-router-dom';

const IsConnected = () => {
  const history = useHistory();
  const getUser = () => {
    let userId = localStorage.getItem('userId');
    if (userId === 13) {
      history.push('/');
    }
    getUser();
  };
  return null;
};

export default IsConnected;
