import './App.css';
import Home from './pages/Home';
import Articles from './pages/Articles';
import Register from './pages/Register';
import Profile from './pages/Profile';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path='/' exact component={Home} />
        <Route path='/articles' exact component={Articles} />
        <Route path='/sinscrire' exact component={Register} />
        <Route path='/profile' exact component={Profile} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
