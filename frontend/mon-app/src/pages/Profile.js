import Navigation from '../components/Navigation.';
import DisplayUser from '../components/DisplayUser';
import CreateArticle from '../components/CreateArticle';
import DisplayUserContents from '../components/DisplayUserContents';
const Profile = () => {
  return (
    <div className='home'>
      <Navigation />
      <h1>Profile</h1>
      <DisplayUser />
      <h1>Rédiger un article</h1>
      <CreateArticle />
      <h1>Mes articles</h1>
      <DisplayUserContents />
    </div>
  );
};

export default Profile;
