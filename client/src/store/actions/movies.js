import { GET_MOVIES, SELECT_MOVIE, UPDATE_MOVIE, GET_SUGGESTIONS } from '../types';
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
    console.log('🔄 uploadMovieImages - Starting upload process');
    console.log('📁 Files to upload:');
    console.log('  - Banner:', bannerFile ? `${bannerFile.name} (${bannerFile.size} bytes)` : 'None');
    console.log('  - Poster:', posterFile ? `${posterFile.name} (${posterFile.size} bytes)` : 'None');
    
    if (!bannerFile && !posterFile) {
      throw new Error('No files provided for upload');
    }
    
    const token = localStorage.getItem('jwtToken');
    if (!token) {
      throw new Error('Authentication token not found');
    }
    
    const data = new FormData();
    
    if (bannerFile) {
      data.append('banner', bannerFile, bannerFile.name);
      console.log('✅ Added banner file to FormData');
    }
    
    if (posterFile) {
      data.append('poster', posterFile, posterFile.name);
      console.log('✅ Added poster file to FormData');
    }
    
    console.log('🌐 Sending request to server...');
    const url = '/movies/photos/' + id;
    const response = await fetch(url, {
      method: 'POST',
      headers: { 
        Authorization: `Bearer ${token}`
        // Don't set Content-Type header - let browser set it with boundary for FormData
      },
      body: data
    });
    
    console.log('📡 Server response status:', response.status);
    
    let responseData;
    try {
      responseData = await response.json();
      console.log('📋 Server response data:', responseData);
    } catch (parseError) {
      console.error('❌ Failed to parse server response:', parseError);
      throw new Error('Invalid server response format');
    }
    
    if (response.ok) {
      const uploadedCount = Object.keys(responseData.files || {}).length;
      dispatch(setAlert(`Successfully uploaded ${uploadedCount} image(s)!`, 'success', 5000));
      console.log('✅ Images uploaded successfully for movie:', id);
      return responseData;
    } else {
      const errorMessage = responseData?.error || responseData?.message || `Upload failed with status ${response.status}`;
      console.error('❌ Upload failed:', errorMessage);
      dispatch(setAlert(errorMessage, 'error', 8000));
      throw new Error(errorMessage);
    }
  } catch (error) {
    console.error('❌ uploadMovieImages error:', error);
    const errorMessage = error.message || 'Image upload failed';
    dispatch(setAlert(errorMessage, 'error', 8000));
    throw error;
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
    console.log('Fetching single movie with ID:', id);
    const url = '/movies/' + id;
    const response = await fetch(url, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    });
    const movie = await response.json();
    if (response.ok) {
      console.log('Single movie fetched successfully:', movie);
      dispatch({ type: SELECT_MOVIE, payload: movie });
      return movie;
    } else {
      console.error('Failed to fetch movie:', movie);
      throw new Error(movie.error || 'Failed to fetch movie');
    }
  } catch (error) {
    console.error('Error fetching movie:', error);
    dispatch(setAlert(error.message, 'error', 5000));
    throw error;
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
      console.log('Movie update response:', responseData);
      
      // Dispatch UPDATE_MOVIE to update the movie in the state immediately
      dispatch({ type: UPDATE_MOVIE, payload: responseData });
      dispatch(setAlert('Movie have been saved!', 'success', 5000));
      
      // Handle image uploads after successful movie update
      if (image) {
        await dispatch(uploadMovieImage(movieId, image));
      }
      if (bannerFile || posterFile) {
        await dispatch(uploadMovieImages(movieId, bannerFile, posterFile));
        
        // After image upload, fetch the updated movie to get new image URLs
        setTimeout(async () => {
          try {
            const movieResponse = await fetch(`/movies/${movieId}`, {
              headers: { Authorization: `Bearer ${token}` }
            });
            if (movieResponse.ok) {
              const updatedMovieWithImages = await movieResponse.json();
              console.log('Movie with updated images:', updatedMovieWithImages);
              dispatch({ type: UPDATE_MOVIE, payload: updatedMovieWithImages });
            }
          } catch (error) {
            console.error('Failed to fetch updated movie with images:', error);
          }
        }, 500);
      }
      
      return true; // Return boolean for backward compatibility
    } else {
      const message = responseData?.message || responseData?.error || 'Failed to update movie';
      dispatch(setAlert(message, 'error', 5000));
      return false; // Return boolean for backward compatibility
    }
  } catch (error) {
    dispatch(setAlert(error.message, 'error', 5000));
    return false; // Return boolean for backward compatibility
  }
};

// delete movie action removed as per requirement
