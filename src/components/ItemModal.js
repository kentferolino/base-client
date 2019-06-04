import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import PropTypes from 'prop-types';
import ItemForm from './ItemForm';

const ItemModal = ({ visible, toggle, addItem }) => {
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
};

ItemModal.propTypes = {
  addItem: PropTypes.func.isRequired,
  toggle: PropTypes.func.isRequired,
  visible: PropTypes.bool.isRequired,
};

export default ItemModal;
