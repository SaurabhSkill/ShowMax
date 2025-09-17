import { setAlert } from './alert';
import setAuthHeaders from '../../utils/setAuthHeaders';

// Action Types
export const CINEMA_ACTIONS = {
  GET_CINEMAS: 'GET_CINEMAS',
  CREATE_CINEMA: 'CREATE_CINEMA',
  UPDATE_CINEMA: 'UPDATE_CINEMA',
  DELETE_CINEMA: 'DELETE_CINEMA',
  SET_LOADING: 'SET_LOADING',
  SET_ERROR: 'SET_ERROR'
};

// Action Creators
export const getCinemas = () => async dispatch => {
  try {
    dispatch({ type: CINEMA_ACTIONS.SET_LOADING, payload: true });
    
    const response = await fetch('/cinemas', {
      method: 'GET',
      headers: setAuthHeaders({ 'Content-Type': 'application/json' }),
      credentials: 'include',
    });

    const cinemas = await response.json();
    
    if (response.ok) {
      dispatch({ type: CINEMA_ACTIONS.GET_CINEMAS, payload: cinemas });
    } else {
      dispatch({ type: CINEMA_ACTIONS.SET_ERROR, payload: cinemas.error || 'Failed to fetch cinemas' });
    }
  } catch (error) {
    console.error('Error fetching cinemas:', error);
    dispatch({ type: CINEMA_ACTIONS.SET_ERROR, payload: 'Network error while fetching cinemas' });
  } finally {
    dispatch({ type: CINEMA_ACTIONS.SET_LOADING, payload: false });
  }
};

export const createCinema = (cinemaData) => async dispatch => {
  try {
    dispatch({ type: CINEMA_ACTIONS.SET_LOADING, payload: true });
    
    const response = await fetch('/cinemas', {
      method: 'POST',
      headers: setAuthHeaders({ 'Content-Type': 'application/json' }),
      credentials: 'include',
      body: JSON.stringify(cinemaData),
    });

    if (response.status === 401) {
      dispatch({ type: CINEMA_ACTIONS.SET_ERROR, payload: 'Unauthorized. Please log in again.' });
      dispatch(setAlert('Unauthorized. Please log in again.', 'error', 5000));
      return { status: 'error', error: 'Unauthorized' };
    }

    const result = await response.json();
    
    if (response.ok) {
      dispatch({ type: CINEMA_ACTIONS.CREATE_CINEMA, payload: result });
      dispatch(setAlert('Cinema created successfully!', 'success', 5000));
      return { status: 'success', data: result };
    } else {
      dispatch({ type: CINEMA_ACTIONS.SET_ERROR, payload: result.error || 'Failed to create cinema' });
      dispatch(setAlert(result.error || 'Failed to create cinema', 'error', 5000));
      return { status: 'error', error: result.error };
    }
  } catch (error) {
    console.error('Error creating cinema:', error);
    const errorMessage = 'Network error while creating cinema';
    dispatch({ type: CINEMA_ACTIONS.SET_ERROR, payload: errorMessage });
    dispatch(setAlert(errorMessage, 'error', 5000));
    return { status: 'error', error: errorMessage };
  } finally {
    dispatch({ type: CINEMA_ACTIONS.SET_LOADING, payload: false });
  }
};

export const updateCinema = (cinemaId, cinemaData) => async dispatch => {
  try {
    dispatch({ type: CINEMA_ACTIONS.SET_LOADING, payload: true });
    
    const response = await fetch(`/cinemas/${cinemaId}`, {
      method: 'PATCH',
      headers: setAuthHeaders({ 'Content-Type': 'application/json' }),
      credentials: 'include',
      body: JSON.stringify(cinemaData),
    });

    if (response.status === 401) {
      dispatch({ type: CINEMA_ACTIONS.SET_ERROR, payload: 'Unauthorized. Please log in again.' });
      dispatch(setAlert('Unauthorized. Please log in again.', 'error', 5000));
      return { status: 'error', error: 'Unauthorized' };
    }

    const result = await response.json();
    
    if (response.ok) {
      dispatch({ type: CINEMA_ACTIONS.UPDATE_CINEMA, payload: result });
      dispatch(setAlert('Cinema updated successfully!', 'success', 5000));
      // Refresh the cinemas list
      dispatch(getCinemas());
      return { status: 'success', data: result };
    } else {
      dispatch({ type: CINEMA_ACTIONS.SET_ERROR, payload: result.error || 'Failed to update cinema' });
      dispatch(setAlert(result.error || 'Failed to update cinema', 'error', 5000));
      return { status: 'error', error: result.error };
    }
  } catch (error) {
    console.error('Error updating cinema:', error);
    const errorMessage = 'Network error while updating cinema';
    dispatch({ type: CINEMA_ACTIONS.SET_ERROR, payload: errorMessage });
    dispatch(setAlert(errorMessage, 'error', 5000));
    return { status: 'error', error: errorMessage };
  } finally {
    dispatch({ type: CINEMA_ACTIONS.SET_LOADING, payload: false });
  }
};

export const deleteCinema = (cinemaId) => async dispatch => {
  try {
    dispatch({ type: CINEMA_ACTIONS.SET_LOADING, payload: true });
    
    const response = await fetch(`/cinemas/${cinemaId}`, {
      method: 'DELETE',
      headers: setAuthHeaders({ 'Content-Type': 'application/json' }),
      credentials: 'include',
    });

    if (response.status === 401) {
      dispatch({ type: CINEMA_ACTIONS.SET_ERROR, payload: 'Unauthorized. Please log in again.' });
      dispatch(setAlert('Unauthorized. Please log in again.', 'error', 5000));
      return { status: 'error', error: 'Unauthorized' };
    }

    const result = await response.json();
    
    if (response.ok) {
      dispatch({ type: CINEMA_ACTIONS.DELETE_CINEMA, payload: cinemaId });
      dispatch(setAlert('Cinema deleted successfully!', 'success', 5000));
      return { status: 'success' };
    } else {
      dispatch({ type: CINEMA_ACTIONS.SET_ERROR, payload: result.error || 'Failed to delete cinema' });
      dispatch(setAlert(result.error || 'Failed to delete cinema', 'error', 5000));
      return { status: 'error', error: result.error };
    }
  } catch (error) {
    console.error('Error deleting cinema:', error);
    const errorMessage = 'Network error while deleting cinema';
    dispatch({ type: CINEMA_ACTIONS.SET_ERROR, payload: errorMessage });
    dispatch(setAlert(errorMessage, 'error', 5000));
    return { status: 'error', error: errorMessage };
  } finally {
    dispatch({ type: CINEMA_ACTIONS.SET_LOADING, payload: false });
  }
};
