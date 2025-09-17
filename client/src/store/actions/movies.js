import { GET_MOVIES, SELECT_MOVIE, GET_SUGGESTIONS } from '../types';
import { setAlert } from './alert';

// --- NEW FUNCTION TO ADD A MOVIE REVIEW ---
export const addMovieReview = (movieId, review) => async dispatch => {
  try {
    const token = localStorage.getItem('jwtToken');
    const url = `/movies/${movieId}/reviews`;
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(review)
    });
    const responseData = await response.json();

    if (response.ok) {
      dispatch(setAlert('Review Submitted!', 'success', 5000));
      // Refresh the movie data to show the new review
      dispatch(getMovie(movieId));
    } else {
      dispatch(setAlert(responseData.message, 'error', 5000));
    }
  } catch (error) {
    dispatch(setAlert(error.message, 'error', 5000));
  }
};

export const uploadMovieImage = (id, image) => async dispatch => {
  try {
    const token = localStorage.getItem('jwtToken');
    const data = new FormData();
    data.append('file', image);
    const url = '/movies/photo/' + id;
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
    }
    if (responseData.error) {
      dispatch(setAlert(responseData.error.message, 'error', 5000));
    }
  } catch (error) {
    dispatch(setAlert(error.message, 'error', 5000));
  }
};

// Upload banner and/or poster files together
export const uploadMovieImages = (id, bannerFile, posterFile) => async dispatch => {
  try {
    const token = localStorage.getItem('jwtToken');
    const data = new FormData();
    if (bannerFile) data.append('banner', bannerFile, bannerFile.name);
    if (posterFile) data.append('poster', posterFile, posterFile.name);
    const url = '/movies/photos/' + id;
    const response = await fetch(url, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
      body: data
    });
    const responseData = await response.json();
    if (response.ok) {
      dispatch(setAlert('Images Uploaded', 'success', 5000));
      dispatch(getMovies());
    }
    if (responseData?.error) {
      dispatch(setAlert(responseData.error.message, 'error', 5000));
    }
  } catch (error) {
    dispatch(setAlert(error.message, 'error', 5000));
  }
};

export const getMovies = () => async dispatch => {
  try {
    const url = '/movies';
    const response = await fetch(url, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    });
    const movies = await response.json();
    if (response.ok) {
      dispatch({ type: GET_MOVIES, payload: movies });
    }
  } catch (error) {
    dispatch(setAlert(error.message, 'error', 5000));
  }
};

export const onSelectMovie = movie => ({
  type: SELECT_MOVIE,
  payload: movie
});

export const getMovie = id => async dispatch => {
  try {
    const url = '/movies/' + id;
    const response = await fetch(url, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    });
    const movie = await response.json();
    if (response.ok) {
      dispatch({ type: SELECT_MOVIE, payload: movie });
    }
  } catch (error) {
    dispatch(setAlert(error.message, 'error', 5000));
  }
};

export const getMovieSuggestion = id => async dispatch => {
  try {
    const url = '/movies/usermodeling/' + id;
    const response = await fetch(url, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    });
    const movies = await response.json();
    if (response.ok) {
      dispatch({ type: GET_SUGGESTIONS, payload: movies });
    }
  } catch (error) {
    dispatch(setAlert(error.message, 'error', 5000));
  }
};

export const addMovie = (image, newMovie, bannerFile, posterFile) => async dispatch => {
  try {
    const token = localStorage.getItem('jwtToken');
    const url = '/movies';
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newMovie)
    });
    const movie = await response.json();
    if (response.ok) {
      dispatch(setAlert('Movie have been saved!', 'success', 5000));
      if (image) dispatch(uploadMovieImage(movie._id, image));
      if (bannerFile || posterFile) dispatch(uploadMovieImages(movie._id, bannerFile, posterFile));
      dispatch(getMovies());
    } else {
      const message = movie?.message || movie?.error || 'Failed to add movie';
      dispatch(setAlert(message, 'error', 5000));
    }
  } catch (error) {
    dispatch(setAlert(error.message, 'error', 5000));
  }
};

export const updateMovie = (movieId, movie, image, bannerFile, posterFile) => async dispatch => {
  try {
    const token = localStorage.getItem('jwtToken');
    const url = '/movies/' + movieId;
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(movie)
    });
    let responseData = null;
    try { responseData = await response.json(); } catch (_) {}
    if (response.ok) {
      dispatch(onSelectMovie(null));
      dispatch(setAlert('Movie have been saved!', 'success', 5000));
      if (image) dispatch(uploadMovieImage(movieId, image));
      if (bannerFile || posterFile) dispatch(uploadMovieImages(movieId, bannerFile, posterFile));
      dispatch(getMovies());
      return true;
    } else {
      const message = responseData?.message || responseData?.error || 'Failed to update movie';
      dispatch(setAlert(message, 'error', 5000));
      return false;
    }
  } catch (error) {
    dispatch(setAlert(error.message, 'error', 5000));
    return false;
  }
};

// delete movie action removed as per requirement
