import React from "react";

class ListItem extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <tr>
        <td>{this.props.name}</td>
      </tr>
    );
  }
}

export default ListItem;