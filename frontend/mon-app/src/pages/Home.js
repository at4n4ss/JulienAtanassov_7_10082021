// Imports
import Navigation from '../components/Navigation.';
import LoginForm from '../components/LoginForm';

// Page acceuil
const Home = () => {
  return (
    <div className='home'>
      <Navigation />
      <LoginForm />
      <h1>Home</h1>
    </div>
  );
};
export default Home;
