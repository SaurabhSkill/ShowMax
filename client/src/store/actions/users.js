import {
  GET_USERS,
  ADD_USER,
  UPDATE_USER,
  DELETE_USER,
  TOGGLE_USER_DIALOG,
  SELECT_USER,
  SELECT_ALL_USERS
} from '../types';
import { setAlert } from './alert';
import { loadUser } from './auth'; 

// Upload user profile image
export const uploadImage = (id, image) => async dispatch => {
  try {
    const token = localStorage.getItem('jwtToken');
    const data = new FormData();
    data.append('file', image);
    const url = '/users/photo/' + id;
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`
      },
      body: data
    });
    const responseData = await response.json();
    if (response.ok) {
      dispatch(setAlert('Image Uploaded', 'success', 5000));
      dispatch(loadUser()); // Refresh user data to show new image
    }
    if (responseData.error) {
      dispatch(setAlert(responseData.error.message, 'error', 5000));
    }
  } catch (error) {
    dispatch(setAlert(error.message, 'error', 5000));
  }
};

export const toggleUserDialog = () => ({ type: TOGGLE_USER_DIALOG });

export const selectUser = user => ({
  type: SELECT_USER,
  payload: user
});

export const selectAllUsers = () => ({ type: SELECT_ALL_USERS });

export const getUsers = () => async dispatch => {
  try {
    const token = localStorage.getItem('jwtToken');
    const url = '/users';
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    const text = await response.text();
    let users = [];
    try {
      users = text ? JSON.parse(text) : [];
    } catch (e) {
      throw new Error('Failed to parse server response for users');
    }
    if (!response.ok) {
      const message = (users && users.message) || 'Failed to load users';
      throw new Error(message);
    }
    dispatch({ type: GET_USERS, payload: users });
  } catch (error) {
    dispatch(setAlert(error.message, 'error', 5000));
  }
};

export const addUser = user => async dispatch => {
  try {
    const token = localStorage.getItem('jwtToken');
    const url = '/users/';
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    });
    const data = await response.json();
    const newUser = data.user;
    if (response.ok) {
      dispatch(setAlert('User Created', 'success', 5000));
      dispatch({ type: ADD_USER, payload: newUser });
      return { status: 'success', message: 'User Created' };
    } else {
      throw new Error(data._message);
    }
  } catch (error) {
    dispatch(setAlert(error.message, 'error', 5000));
    return {
      status: 'error',
      message: ' User have not been saved, try again.'
    };
  }
};

export const updateUser = (user, id) => async dispatch => {
  try {
    const token = localStorage.getItem('jwtToken');
    const url = '/users/' + id;
    const response = await fetch(url, {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    });
    const data = await response.json();
    const newUser = data.user;
    if (response.ok) {
      dispatch(setAlert('User Updated', 'success', 5000));
      dispatch({ type: UPDATE_USER, payload: newUser });
      return { status: 'success', message: 'User Updated' };
    } else {
      throw new Error(data._message);
    }
  } catch (error) {
    dispatch(setAlert(error.message, 'error', 5000));
    return {
      status: 'error',
      message: ' User have not been saved, try again.'
    };
  }
};

export const deleteUser = id => async dispatch => {
  try {
    const token = localStorage.getItem('jwtToken');
    const url = '/users/' + id;
    const response = await fetch(url, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    const data = await response.json();
    if (response.ok) {
      dispatch(setAlert('User Deleted', 'success', 5000));
      dispatch({ type: DELETE_USER, payload: id });
      return { status: 'success', message: 'User Removed' };
    } else {
      throw new Error(data._message);
    }
  } catch (error) {
    dispatch(setAlert(error.message, 'error', 5000));
    return {
      status: 'error',
      message: ' User have not been deleted, try again.'
    };
  }
};
