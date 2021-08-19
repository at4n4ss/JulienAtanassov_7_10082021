// Imports
import './App.css';
import Home from './pages/Home';
import Articles from './pages/Articles';
import Article from './pages/Article';
import Register from './pages/Register';
import Profile from './pages/Profile';
import Admin from './pages/Admin';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/style.css';
// React router
function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path='/' exact component={Home} />
        <Route path='/articles' exact component={Articles} />
        <Route path='/sinscrire' exact component={Register} />
        <Route path='/profile' exact component={Profile} />
        <Route path='/article/:id' exact component={Article} />
        <Route path='/admin' exact component={Admin} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
