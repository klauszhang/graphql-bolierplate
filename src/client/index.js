import React from 'react';
import ProductPage from './components/ProductPage';
import GraphiQL from './components/GraphiQL';
import {
  BrowserRouter,
  Route,
  Link
} from 'react-router-dom';
class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            height: '100%'
          }}
        >
          <nav style={{ padding: 8 }}>
            <Link to="/">App</Link>
            {' | '}
            <Link to="/graphql">GraphiQL</Link>
          </nav>
          <hr />
          <Route
            exact
            path="/"
            component={ProductPage}
          />
          <Route
            path="/graphql"
            component={GraphiQL}
          />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
