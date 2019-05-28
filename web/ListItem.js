import React from 'react';
import { Link } from '@reach/router';
import PropTypes from 'prop-types';

export const ListItem = (props) => {
  const { id, name } = props;
  return (
    <tr>
      <td>{name}</td>
      <td><Link to={`/details/${id}`}>Edit</Link></td>
    </tr>
  );
};

ListItem.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired
};

export default ListItem;
