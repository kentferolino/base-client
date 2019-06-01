import React, { Component } from 'react';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import ShoppingList from './ShoppingList';
import ItemModal from './ItemModal';

import { addItem } from '../actions/itemActions';

class Shopping extends Component {
  static propTypes = {
    auth: PropTypes.shape({
      token: PropTypes.string,
      isAuthenticated: PropTypes.bool,
      isLoading: PropTypes.bool,
      user: PropTypes.instanceOf(Object),
    }),
    addItemAction: PropTypes.func.isRequired,
  };

  static defaultProps = {
    auth: {
      token: null,
      isAuthenticated: null,
      isLoading: null,
      user: null,
    },
  };

  state = {
    itemModal: false,
  };

  toggle = () => {
    const { itemModal } = this.state;
    this.setState({ itemModal: !itemModal });
  };

  render() {
    const { auth, addItemAction } = this.props;
    const { isAuthenticated } = auth;
    const { itemModal } = this.state;

    return (
      <div>
        {isAuthenticated ? (
          <Button onClick={this.toggle}>Add Items</Button>
        ) : (
          <h4 className="mb-3 ml-4">Please login to manage items</h4>
        )}
        <ItemModal visible={itemModal} toggle={this.toggle} addItem={addItemAction} />
        <ShoppingList />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
});

export default connect(
  mapStateToProps,
  { addItemAction: addItem },
)(Shopping);
