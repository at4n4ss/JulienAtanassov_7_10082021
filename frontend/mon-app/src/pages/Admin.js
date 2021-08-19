import Navigation from '../components/Navigation.';
import DisplayArticle from '../components/DisplayArticle';
import CreateComment from '../components/CreateComment';
import DisplayContent from '../components/DisplayComments';
import AdminContents from '../components/AdminContents';
import AdminComments from '../components/AdminComments';
import Container from 'react-bootstrap/Container';
// Page Articles
const Admin = () => {
  return (
    <div>
      <Navigation />
      <AdminContents />
      <AdminComments />
    </div>
  );
};
export default Admin;
