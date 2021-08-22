// Imports
import LoginForm from '../components/LoginForm';
import IsConnected from '../components/IsConnected';
import Container from 'react-bootstrap/Container';
import logo from '../logos/icon-left-font.png';
// Page acceuil
const Home = () => {
  return (
    <div className='home'>
      <IsConnected />
      <Container>
        <Container>
          <div className='homeImgContainer'>
            <img className='logoNav' src={logo} alt='logo' />
          </div>
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
