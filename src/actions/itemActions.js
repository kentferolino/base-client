/* eslint-disable no-underscore-dangle */
import axios from 'axios';
import { GET_ITEMS, ADD_ITEM, DELETE_ITEM, UPDATE_ITEM, ITEMS_LOADING } from './types';
import { tokenConfig } from './authActions';
import { returnErrors } from './errorActions';

export const setItemsLoading = () => {
  return {
    type: ITEMS_LOADING,
  };
};

export const getItems = () => dispatch => {
  dispatch(setItemsLoading());
  axios.get('/api/items').then(res =>
    dispatch({
      type: GET_ITEMS,
      payload: res.data,
    }),
  );
};

export const addItem = item => (dispatch, getState) => {
  dispatch(setItemsLoading());
  axios
    .post('/api/items', item, tokenConfig(getState))
    .then(res =>
      dispatch({
        type: ADD_ITEM,
        payload: res.data,
      }),
    )
    .catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
};

export const updateItem = item => (dispatch, getState) => {
  dispatch(setItemsLoading());
  axios
    .put(`/api/items/${item._id}`, item, tokenConfig(getState))
    .then(res =>
      dispatch({
        type: UPDATE_ITEM,
        payload: res.data,
      }),
    )
    .catch(err => {
      dispatch(returnErrors(err.response.data, err.response.status));
    });
};

export const deleteItem = id => (dispatch, getState) => {
  dispatch(setItemsLoading());
  axios
    .delete(`/api/items/${id}`, tokenConfig(getState))
    .then(() =>
      dispatch({
        type: DELETE_ITEM,
        payload: id,
      }),
    )
    .catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
};
