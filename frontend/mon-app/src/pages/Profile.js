// Imports
import Navigation from '../components/Navigation.';
import DisplayUser from '../components/DisplayUser';
import CreateArticle from '../components/CreateArticle';
import DisplayUserContents from '../components/DisplayUserContents';
import DisplayUserComments from '../components/DisplayUserComments';
import IsNotConnected from '../components/IsNotConnected';

import DeleteUser from '../components/DeleteUser';
import Container from 'react-bootstrap/Container';
// Page Profile
const Profile = () => {
  return (
    <div className='home'>
      <Navigation />
      <Container>
        <div className='componentsContainer'>
          <div className='profileTitles'>
            <h2>Profile</h2>
          </div>
          <DisplayUser />
          <DeleteUser />
        </div>
        <div className='componentsContainer'>
          <div className='profileTitles'>
            <h2>Rédiger un article</h2>
          </div>
          <CreateArticle />
        </div>
        <div className='componentsContainer'>
          <div className='profileTitles'>
            <h2>Mes articles</h2>
          </div>
          <DisplayUserContents />
        </div>
        <div className='componentsContainer'>
          <div className='profileTitles'>
            <h2>Mes commentaires</h2>
          </div>
          <DisplayUserComments />
        </div>
      </Container>
    </div>
  );
};

export default Profile;
