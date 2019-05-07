import React from "react";
import ListItem from "./ListItem";

class List extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoaded: false,
      methods: []
    };
  }
  componentDidMount() {
    fetch("http://localhost:3000/api/v1/recipes")
      .then(res => res.json())
      .then(res => {
        debugger;
        this.setState({
          isLoaded: true,
          methods: res
        });
      });
  }
  render() {
    if (!this.state.isLoaded) {
      return <h1>Loading</h1>;
    }
    return (
      <React.Fragment>
        {this.state.methods.map(x => {
          return <ListItem name={x.recipeName} id={x.id} />;
        })}
      </React.Fragment>
    );
  }
}

export default List;
