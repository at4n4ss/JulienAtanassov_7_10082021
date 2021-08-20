import createHistory from 'history/createBrowserHistory';
import React, { Component } from 'react';
class RefreshPage extends Component {
  useEffect = () => {
    // Run! Like go get some data from an API.
    const history = createHistory();
    history.go(0);
  };
  return() {
    <div></div>;
  }
}
export default RefreshPage;
