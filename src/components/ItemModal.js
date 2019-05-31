import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { connect } from "react-redux";
import { addItem } from "../actions/itemActions";
import PropTypes from "prop-types";
import ItemForm from "./ItemForm";

class ItemModal extends Component {
  static propTypes = {};

  state = {
    modal: false
  };

  toggle = () => {
    this.setState({ modal: !this.state.modal });
  };

  render() {
    const { isAuthenticated } = this.props.auth;
    return (
      <div>
        {isAuthenticated ? (
          <Button onClick={this.toggle}>Add Items</Button>
        ) : (
          <h4 className="mb-3 ml-4">Please login to manage items</h4>
        )}

        <Dialog open={this.state.modal} onClose={this.toggle}>
          <DialogTitle onClose={this.toggle} id="add-shopping-title">
            Add To Shopping List
          </DialogTitle>
          <DialogContent>
            <ItemForm addItem={this.props.addItem} />
          </DialogContent>
        </Dialog>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  item: state.item,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { addItem }
)(ItemModal);
