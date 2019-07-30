import * as React from 'react';
import ListItem from './ListItem';

interface ListState {
  isLoaded: boolean,
  methods: Method[];
};

interface Method {
  id: string,
  recipeName: string
};

export default class List extends React.Component<{}, ListState> {
  constructor(props) {
    super(props);

    this.state = {
      isLoaded: false,
      methods: []
    };
  }

  componentDidMount() {
    fetch('http://localhost:3000/api/v1/recipes')
      .then(res => res.json())
      .then(res => {
        this.setState({
          isLoaded: true,
          methods: res
        });
      });
  }

  render() {
    const { isLoaded, methods } = this.state;

    if (!isLoaded) {
      return <h1>Loading</h1>;
    }
    return (
      <React.Fragment>
        <table className="standard">
          <thead>
            <th>Name</th>
            <th />
          </thead>
          <tbody>
            {methods.map(x => <ListItem name={x.recipeName} id={x.id} />)}
          </tbody>
        </table>
      </React.Fragment>
    );
  }
}
