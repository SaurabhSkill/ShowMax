import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT
} from '../types';
import { isLoggedIn, getUser } from '../../utils';

const initialState = {
  token: localStorage.getItem('jwtToken'),
  isAuthenticated: isLoggedIn(),
  loading: true,
  user: getUser()
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: payload.user
      };
    
    case LOGIN_SUCCESS:
      localStorage.setItem('jwtToken', payload.token);
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
        loading: false
      };

    // On successful REGISTER, the user is NOT authenticated yet.
    // We simply acknowledge the action was successful and stop loading.
    // The key is NOT to touch isAuthenticated or try to get a token from the payload.
    case REGISTER_SUCCESS:
      return {
        ...state,
        isAuthenticated: false, // Explicitly false
        loading: false
      };

    // Clear authentication state on failure or logout
    case REGISTER_FAIL:
    case AUTH_ERROR:
    case LOGIN_FAIL:
    case LOGOUT:
      localStorage.removeItem('jwtToken');
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        user: null
      };
      
    default:
      return state;
  }
}
