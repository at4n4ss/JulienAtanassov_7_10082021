// Imports

import LoginForm from '../components/LoginForm';
import IsConnected from '../components/IsConnected';
import Container from 'react-bootstrap/Container';
import { useHistory } from 'react-router-dom';
// Page acceuil
const Home = () => {
  IsConnected();
  return (
    <div className='home'>
      <Container>
        <Container>
          <div className='loginTitle'>
            <h1> Bienvenue sur le réseau social de Groupomania!</h1>
          </div>
          <div className='containerLogin'>
            <div className='loginFormTitle'>
              <h3> Veuillez vous connecter ou vous inscrire</h3>
            </div>
            <div className='loginForm'>
              <LoginForm />
            </div>
          </div>
        </Container>
      </Container>
    </div>
  );
};
export default Home;
