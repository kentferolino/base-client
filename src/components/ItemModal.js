import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import PropTypes from 'prop-types';
import ItemForm from './ItemForm';

const ItemModal = ({ visible, toggle, action, operation, item }) => {
  return (
    <div>
      <Dialog open={visible} onClose={toggle}>
        <DialogTitle onClose={toggle} id="add-shopping-title">
          {operation === 'add' && 'Add To Shopping List'}
          {operation === 'edit' && 'Update Item'}
        </DialogTitle>
        <DialogContent>
          <ItemForm action={action} toggle={toggle} item={item} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

ItemModal.propTypes = {
  action: PropTypes.func.isRequired,
  toggle: PropTypes.func.isRequired,
  visible: PropTypes.bool.isRequired,
  operation: PropTypes.string.isRequired,
  item: PropTypes.shape({ _id: PropTypes.string, name: PropTypes.string }),
};

ItemModal.defaultProps = {
  item: { _id: null, name: null },
};

export default ItemModal;
