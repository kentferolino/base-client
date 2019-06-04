/* eslint-disable no-underscore-dangle */
import React, { useEffect } from 'react';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import DeleteIcon from '@material-ui/icons/Delete';
import { getItems, deleteItem } from '../actions/itemActions';

const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
});

const ShoppingList = ({
  getItems: getItemsAction,
  items,
  isAuthenticated,
  deleteItem: deleteItemAction,
}) => {
  const onDeleteClick = id => {
    deleteItemAction(id);
  };

  useEffect(() => {
    getItemsAction();
  }, []);

  return (
    <div>
      <List component="nav">
        <TransitionGroup className="shopping-list">
          {items.map(item => (
            <CSSTransition key={item._id} timeout={500} classNames="fade">
              <ListItem button>
                <ListItemIcon>
                  {isAuthenticated && (
                    <DeleteIcon color="secondary" onClick={() => onDeleteClick(item._id)} />
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
  getItems: PropTypes.func.isRequired,
  deleteItem: PropTypes.func.isRequired,
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
  { getItems, deleteItem },
)(withStyles(styles)(ShoppingList));
