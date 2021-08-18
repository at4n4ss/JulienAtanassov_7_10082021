import Navigation from '../components/Navigation.';
import DisplayArticle from '../components/DisplayArticle';
import CreateComment from '../components/CreateComment';
import DisplayComments from '../components/DisplayComments';
// Page Articles
const Article = () => {
  return (
    <div className='DisplayArticle'>
      <Navigation />
      <DisplayArticle />
      <CreateComment />
      <DisplayComments />
    </div>
  );
};
export default Article;
