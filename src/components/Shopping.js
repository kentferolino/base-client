import React, { Component } from "react";

import PropTypes from "prop-types";
import ShoppingList from "./ShoppingList";
import ItemModal from "./ItemModal";

import { connect } from "react-redux";
import { addItem } from "../actions/itemActions";
import Button from "@material-ui/core/Button";

class Shopping extends Component {
  state = {
    itemModal: false
  };

  toggle = () => {
    this.setState({ itemModal: !this.state.itemModal });
  };

  render() {
    const { auth, addItem } = this.props;
    const { isAuthenticated } = auth;
    const { itemModal } = this.state;

    return (
      <div>
        {isAuthenticated ? (
          <Button onClick={this.toggle}>Add Items</Button>
        ) : (
          <h4 className="mb-3 ml-4">Please login to manage items</h4>
        )}
        <ItemModal visible={itemModal} toggle={this.toggle} addItem={addItem} />
        <ShoppingList />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { addItem }
)(Shopping);
