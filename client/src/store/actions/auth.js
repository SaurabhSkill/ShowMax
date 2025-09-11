import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT
} from '../types';
import { setAlert } from './alert';
// History will be passed via props in components 
import { setAuthHeaders, setUser, removeUser, isLoggedIn } from '../../utils';


export const register = (userData, history) => async dispatch => {
  try {
    const url = '/users/register';
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData)
    });

    // Some backends return 201/204 without a body. Safely parse only if present.
    const text = await response.text();
    const responseData = text ? JSON.parse(text) : {};

    if (response.ok) {
      dispatch({ type: REGISTER_SUCCESS });
      dispatch(setAlert('Registration successful! Please check your email.', 'success', 5000));
      history.push(`/verify-otp?email=${encodeURIComponent(userData.email)}`);
      return Promise.resolve();
    } else {
      dispatch({ type: REGISTER_FAIL });
      dispatch(setAlert(responseData.message || 'An error occurred during registration.', 'error', 5000));
      return Promise.reject();
    }
  } catch (error) {
    dispatch({ type: REGISTER_FAIL });
    dispatch(setAlert(error.message, 'error', 5000));
    return Promise.reject();
  }
};


export const verifyOtp = ({ email, otp }, history) => async dispatch => {
  try {
    const url = '/users/verify-otp';
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, otp })
    });
    const responseData = await response.json();

    if (response.ok) {
      dispatch({ type: LOGIN_SUCCESS, payload: responseData });
      setUser(responseData.user);
      dispatch(setAlert(`Welcome ${responseData.user.name}! Your account is verified.`, 'success', 5000));
      history.push('/'); 
    } else {
      dispatch({ type: LOGIN_FAIL });
      dispatch(setAlert(responseData.message, 'error', 5000));
    }
  } catch (error) {
    dispatch({ type: LOGIN_FAIL });
    dispatch(setAlert(error.message, 'error', 5000));
  }
};

export const forgotPassword = ({ email }) => async dispatch => {
  try {
    const url = '/users/forgot-password';
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email })
    });
    const responseData = await response.json();

    if (response.ok) {
      dispatch(setAlert('Password reset OTP sent! Please check your email.', 'success', 5000));
    } else {
      dispatch(setAlert(responseData.message || 'An error occurred.', 'error', 5000));
    }
  } catch (error) {
    dispatch(setAlert(error.message, 'error', 5000));
  }
};

export const resetPassword = ({ email, otp, password }, history) => async dispatch => {
  try {
    const url = '/users/reset-password';
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, otp, password })
    });
    const responseData = await response.json();

    if (response.ok) {
      const { user } = responseData;
      user && setUser(user);
      dispatch({ type: LOGIN_SUCCESS, payload: responseData });
      dispatch(setAlert('Password reset successfully. You are now logged in.', 'success', 5000));
      history.push('/');
    } else {
      dispatch({ type: LOGIN_FAIL });
      dispatch(setAlert(responseData.message || 'Password reset failed.', 'error', 5000));
    }
  } catch (error) {
    dispatch({ type: LOGIN_FAIL });
    dispatch(setAlert(error.message, 'error', 5000));
  }
};

export const googleLogin = ({ tokenId }, history) => async dispatch => {
  try {
    const url = '/users/google-login';
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ tokenId })
    });
    const responseData = await response.json();

    if (response.ok) {
      const { user } = responseData;
      user && setUser(user);
      dispatch({ type: LOGIN_SUCCESS, payload: responseData });
      dispatch(setAlert(`Welcome ${user.name}`, 'success', 5000));
      history.push('/');
    } else {
      dispatch({ type: LOGIN_FAIL });
      dispatch(setAlert(responseData.message || 'Google login failed.', 'error', 5000));
    }
  } catch (error) {
    dispatch({ type: LOGIN_FAIL });
    dispatch(setAlert(error.message, 'error', 5000));
  }
};


export const login = (username, password, history) => async dispatch => {
  try {
    const url = '/users/login';
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });
    const responseData = await response.json();
    if (response.ok) {
      const { user } = responseData;
      user && setUser(user);
      dispatch({ type: LOGIN_SUCCESS, payload: responseData });
      dispatch(setAlert(`Welcome ${user.name}`, 'success', 5000));
      history.push('/');
    } else {
      dispatch({ type: LOGIN_FAIL });
      dispatch(setAlert(responseData.message || 'Login failed', 'error', 5000));
    }
  } catch (error) {
    dispatch({ type: LOGIN_FAIL });
    dispatch(setAlert(error.message, 'error', 5000));
  }
};

export const loadUser = () => async dispatch => {
  if (!isLoggedIn()) return;
  try {
    const url = '/users/me';
    const response = await fetch(url, {
      method: 'GET',
      headers: setAuthHeaders()
    });
    const responseData = await response.json();
    if (response.ok) {
      const { user } = responseData;
      user && setUser(user);
      dispatch({ type: USER_LOADED, payload: responseData });
    } else {
      dispatch({ type: AUTH_ERROR });
    }
  } catch (error) {
    dispatch({ type: AUTH_ERROR });
  }
};

export const logout = (history) => async dispatch => {
  removeUser();
  dispatch({ type: LOGOUT });
  dispatch(setAlert('You have been logged out.', 'success', 5000));
  history.push('/login');
};

