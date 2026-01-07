import { GET_MOVIES, SELECT_MOVIE, UPDATE_MOVIE, GET_SUGGESTIONS } from '../types';

const initialState = {
  movies: [],
  randomMovie: null,
  latestMovies: [],
  nowShowing: [],
  comingSoon: [],
  selectedMovie: null,
  suggested: []
};

const getMovies = (state, payload) => {
  console.log('GET_MOVIES reducer called with:', payload.length, 'movies');
  
  // Removed the .slice(0, 5) to show all movies
  const latestMovies = payload.sort(
    (a, b) => Date.parse(b.releaseDate) - Date.parse(a.releaseDate)
  );

  const nowShowing = payload.filter(
    movie =>
      new Date(movie.endDate) >= new Date() &&
      new Date(movie.releaseDate) < new Date()
  );

  const comingSoon = payload.filter(
    movie => new Date(movie.releaseDate) > new Date()
  );

  return {
    ...state,
    movies: payload,
    randomMovie: payload.length ? payload[Math.floor(Math.random() * payload.length)] : null,
    latestMovies,
    nowShowing,
    comingSoon
  };
};

const onUpdateMovie = (state, payload) => {
  console.log('UPDATE_MOVIE reducer called with:', payload);
  
  // Update the main movies array
  const updatedMovies = state.movies.map(movie =>
    movie._id === payload._id ? payload : movie
  );
  
  // Recalculate derived arrays with updated data
  const latestMovies = updatedMovies.sort(
    (a, b) => Date.parse(b.releaseDate) - Date.parse(a.releaseDate)
  );

  const nowShowing = updatedMovies.filter(
    movie =>
      new Date(movie.endDate) >= new Date() &&
      new Date(movie.releaseDate) < new Date()
  );

  const comingSoon = updatedMovies.filter(
    movie => new Date(movie.releaseDate) > new Date()
  );
  
  return {
    ...state,
    movies: updatedMovies,
    selectedMovie: payload, // Update selectedMovie with the updated data
    latestMovies,
    nowShowing,
    comingSoon,
    // Update randomMovie if it's the same movie
    randomMovie: state.randomMovie?._id === payload._id ? payload : state.randomMovie
  };
};

const onSelectMovie = (state, payload) => {
  console.log('SELECT_MOVIE reducer called with:', payload);
  return {
    ...state,
    selectedMovie: payload
  };
};

const getMovieSuggestions = (state, payload) => ({
  ...state,
  suggested: payload
});

export default (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_MOVIES:
      return getMovies(state, payload);
    case SELECT_MOVIE:
      return onSelectMovie(state, payload);
    case UPDATE_MOVIE:
      return onUpdateMovie(state, payload);
    case GET_SUGGESTIONS:
      return getMovieSuggestions(state, payload);
    default:
      return state;
  }
};
