import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from '@reach/router';

import List from './List.tsx';
import Details from './Details';

export const App = () => (
  <div>
    <Router>
      <List path="/" />
      <Details path="/details/:id" />
    </Router>
  </div>
);

ReactDOM.render(<App />, document.getElementById('root'));
