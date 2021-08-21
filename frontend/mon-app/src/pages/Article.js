// Imports
import Navigation from '../components/Navigation.';
import DisplayArticle from '../components/DisplayArticle';
import CreateComment from '../components/CreateComment';
import DisplayComments from '../components/DisplayComments';
import IsNotConnected from '../components/IsNotConnected';
import Container from 'react-bootstrap/Container';
// Page Articles
const Article = () => {
  return (
    <div className='DisplayArticle'>
      <IsNotConnected />
      <Navigation />
      <Container>
        <div className='containerArticle'>
          <div className='containerArticleContent'>
            <DisplayArticle />
          </div>
          <div className='containerComments'>
            <CreateComment />
            <DisplayComments />
          </div>
        </div>
      </Container>
    </div>
  );
};
export default Article;
