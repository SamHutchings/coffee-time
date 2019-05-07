import React from "react";
import ReactDOM from "react-dom";
import { Router } from "@reach/router";

import List from "./List";
import Details from "./Details";

class App extends React.Component {
  render() {
    return (
      <div>
        <Router>
          <List path="/" />
          <Details path="/details/:id" />
        </Router>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
