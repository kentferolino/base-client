import React, { Component } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import PropTypes from "prop-types";
import ItemForm from "./ItemForm";

class ItemModal extends Component {
  static propTypes = {};

  render() {
    const { visible, toggle, addItem } = this.props;
    return (
      <div>
        <Dialog open={visible} onClose={toggle}>
          <DialogTitle onClose={toggle} id="add-shopping-title">
            Add To Shopping List
          </DialogTitle>
          <DialogContent>
            <ItemForm addItem={addItem} toggle={toggle} />
          </DialogContent>
        </Dialog>
      </div>
    );
  }
}

export default ItemModal;
