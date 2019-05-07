import React from "react";

class Details extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
        id: "",
        name: "",
        setup: "",
        recipe: [],
        coffeeGramsPerCup: null
    };
  }
}

export default Details;
