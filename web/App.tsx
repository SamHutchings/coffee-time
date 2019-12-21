import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Router } from '@reach/router';

import List from './src/components/List';
import Details from './src/components/Details';

export const App = () => (
  <div>
    <Router>
      <List path="/" />
      <Details path="/details/:id" />
    </Router>
  </div>
);

ReactDOM.render(<App />, document.getElementById('root'));
