/* eslint-disable no-underscore-dangle */
import React, { useEffect, useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { getItems, deleteItem, updateItem } from '../actions/itemActions';
import ItemModal from './ItemModal';

const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
});

const ShoppingList = ({
  getItemsAction,
  items,
  isAuthenticated,
  deleteItemAction,
  editItemAction,
}) => {
  const [itemModal, setItemModal] = useState(false);
  const [toUpdateItem, setToUpdateItem] = useState({});

  const toggle = item => {
    setItemModal(!itemModal);
    setToUpdateItem(item);
  };

  const onDeleteClick = id => {
    deleteItemAction(id);
  };

  // const onEditClick = id => {
  //   editItemAction(id);
  // };

  useEffect(() => {
    getItemsAction();
  }, []);

  return (
    <div>
      <ItemModal
        visible={itemModal}
        toggle={toggle}
        action={editItemAction}
        operation="edit"
        item={toUpdateItem}
      />
      <List component="nav">
        <TransitionGroup className="shopping-list">
          {items.map(item => (
            <CSSTransition key={item._id} timeout={500} classNames="fade">
              <ListItem button>
                <ListItemIcon>
                  {isAuthenticated && (
                    <>
                      <DeleteIcon color="secondary" onClick={() => onDeleteClick(item._id)} />
                      <EditIcon color="secondary" onClick={() => toggle(item)} />
                    </>
                  )}
                </ListItemIcon>
                <ListItemText primary={item.name} />
              </ListItem>
            </CSSTransition>
          ))}
        </TransitionGroup>
      </List>
    </div>
  );
};

ShoppingList.propTypes = {
  getItemsAction: PropTypes.func.isRequired,
  deleteItemAction: PropTypes.func.isRequired,
  editItemAction: PropTypes.func.isRequired,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string,
      name: PropTypes.string,
    }),
  ).isRequired,
  isAuthenticated: PropTypes.bool,
};

ShoppingList.defaultProps = {
  isAuthenticated: false,
};

const mapStateToProps = state => ({
  items: state.items.items,
  auth: state.auth,
});

export default connect(
  mapStateToProps,
  { getItemsAction: getItems, deleteItemAction: deleteItem, editItemAction: updateItem },
)(withStyles(styles)(ShoppingList));
