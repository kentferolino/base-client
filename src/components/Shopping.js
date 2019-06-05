import React, { useState } from 'react';

import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import ShoppingList from './ShoppingList';
import ItemModal from './ItemModal';

const Shopping = ({ auth, addItemAction }) => {
  const [itemModal, setItemModal] = useState(false);

  const { isAuthenticated } = auth;

  const toggle = () => {
    setItemModal(!itemModal);
  };

  return (
    <div>
      {isAuthenticated ? (
        <Button variant="contained" onClick={toggle} color="primary">
          Add Items
        </Button>
      ) : (
        <h4 className="mb-3 ml-4">Please login to manage items</h4>
      )}
      <ItemModal visible={itemModal} toggle={toggle} action={addItemAction} operation="add" />
      <ShoppingList isAuthenticated={isAuthenticated} />
    </div>
  );
};

Shopping.propTypes = {
  auth: PropTypes.shape({
    token: PropTypes.string,
    isAuthenticated: PropTypes.bool,
    isLoading: PropTypes.bool,
    user: PropTypes.instanceOf(Object),
  }),
  addItemAction: PropTypes.func.isRequired,
};

Shopping.defaultProps = {
  auth: {
    token: null,
    isAuthenticated: null,
    isLoading: null,
    user: null,
  },
};

export default Shopping;
