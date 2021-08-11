import './App.css';
import Home from './pages/Home';
import Articles from './pages/Articles';
import Register from './pages/Register';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path='/' exact component={Home} />
        <Route path='/articles' exact component={Articles} />
        <Route path='/sinscrire' exact component={Register} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
