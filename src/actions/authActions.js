import axios from 'axios';
import { returnErrors } from './errorActions';
import {
  USER_LOADING,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  UPDATE_USER_FAIL,
  UPDATE_USER_SUCCESS
} from './types';

// Setup config/headers and token
export const tokenConfig = getState => {
  // Get token from localstorage
  const { token } = getState().auth;

  // Headers
  const config = {
    headers: {
      'Content-type': 'application/json',
    },
  };

  // If token, add to headers.
  if (token) {
    config.headers['x-auth-token'] = token;
  }
  return config;
};

// Check token and load user
export const loadUser = () => (dispatch, getState) => {
  dispatch({ type: USER_LOADING });

  const config = tokenConfig(getState);

  axios
    .get('/api/auth/user', config)
    .then(res =>
      dispatch({
        type: USER_LOADED,
        payload: res.data,
      }),
    )
    .catch(err => {
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({
        type: AUTH_ERROR,
      });
    });
};

// Register user
export const register = ({ name, email, password }) => dispatch => {
  // Headers
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  // Request body
  const body = JSON.stringify({ name, email, password });

  axios
    .post('/api/users', body, config)
    .then(res =>
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data,
      }),
    )
    .catch(err => {
      dispatch(returnErrors(err.response.data, err.response.status, 'REGISTER_FAIL'));
      dispatch({
        type: REGISTER_FAIL,
      });
    });
};

// Login User
export const login = ({ email, password }) => dispatch => {
  // Headers
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  // Request body
  const body = JSON.stringify({ email, password });

  axios
    .post('/api/auth', body, config)
    .then(res =>
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data,
      }),
    )
    .catch(err => {
      dispatch(returnErrors(err.response.data, err.response.status, 'LOGIN_FAIL'));
      dispatch({
        type: LOGIN_FAIL,
      });
    });
};

// Update user
export const updateUserInfo = ({ name, email }) => (dispatch, getState) => {
  // Headers
  const config = tokenConfig(getState);

  // Request body
  const body = JSON.stringify({ name, email });

  axios
    .put('/api/users/updateInfo', body, config)
    .then(res =>
      dispatch({
        type: UPDATE_USER_SUCCESS,
        payload: res.data,
      }),
    )
    .catch(err => {
      dispatch(returnErrors(err.response.data, err.response.status, 'UPDATE_USER_FAIL'));
      dispatch({
        type: UPDATE_USER_FAIL,
      });
    });
};

// Logout user
export const logout = () => {
  return {
    type: LOGOUT_SUCCESS,
  };
};
