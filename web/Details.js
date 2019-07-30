import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from '@reach/router';
import shortid from 'shortid';

class Details extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      setup: '',
      method: [],
      coffeeGramsPerCup: null,
      saveSuccess: null,
      isLoaded: false,
    };
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleCoffeeGramsPerCupChange = this.handleCoffeeGramsPerCupChange.bind(this);
    this.handleSetupChange = this.handleSetupChange.bind(this);

    this.handleSaveClick = this.handleSaveClick.bind(this);
  }

  componentDidMount() {
    const { id } = this.props;

    fetch(`http://localhost:3000/api/v1/recipes/${id}`)
      .then(res => res.json())
      .then(res => {
        this.setState({
          isLoaded: true,
          saveSuccess: null,
          name: res.recipeName,
          setup: res.setup,
          coffeeGramsPerCup: res.coffeeGramsPerCup,
          method: res.method || [],
        });
      });
  }

  handleNameChange(event) {
    this.setState({ name: event.target.value });
  }

  handleCoffeeGramsPerCupChange(event) {
    this.setState({ coffeeGramsPerCup: event.target.value });
  }

  handleSetupChange(event) {
    this.setState({ setup: event.target.value });
  }

  handleSaveClick() {
    const { name, setup, method, coffeeGramsPerCup } = this.state;
    const { id } = this.props;

    const data = { recipeName: name, setup, method, coffeeGramsPerCup };

    fetch(`http://localhost.:3000/api/v1/recipes/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data)
    })
      .then(this.setState({ saveSuccess: true }))
      .catch(err => {
        console.log(err);
        this.setState({ saveSuccess: false });
      });
  }

  renderRedirect() {
    const { saveSuccess } = this.state;

    if (saveSuccess === true) {
      return <Redirect to="/" />;
    }

    return null;
  }

  render() {
    const { isLoaded, name, setup, method, coffeeGramsPerCup } = this.state;

    if (!isLoaded) {
      return null;
    }

    return (
      <div className="recipe-details">
      {this.renderRedirect()}

        <label htmlFor="name">
          Name
          <input type="text" id="name" value={name} onChange={this.handleNameChange} />
        </label>

        <label htmlFor="coffee">
          Coffee (grams per cup)
          <input type="text" id="coffee" value={coffeeGramsPerCup} onChange={this.handleCoffeeGramsPerCupChange} />
        </label>

        <label htmlFor="setup">
          Setup
          <input type="text" id="setup" value={setup} onChange={this.handleSetupChange} />
        </label>

        {method.map(m => (
          <p key={shortid.generate()}>
            {m.details}
            {m.time}
          </p>
        ))}
        <button className="Button" type="submit" onClick={this.handleSaveClick}>Save</button>
      </div>
    );
  }
}

Details.propTypes = {
  id: PropTypes.string,
};

export default Details;
