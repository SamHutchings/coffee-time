import * as React from 'react';
import * as PropTypes from 'prop-types';
import { Link } from '@reach/router';

interface ListItemProps {
  id: string,
  name: string
};

export const ListItem = (props: ListItemProps) => {
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
