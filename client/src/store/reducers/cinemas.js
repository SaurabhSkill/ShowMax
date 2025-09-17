import { CINEMA_ACTIONS } from '../actions/cinemas';

const initialState = {
  cinemas: [],
  loading: false,
  error: null,
};

const cinemasReducer = (state = initialState, action) => {
  switch (action.type) {
    case CINEMA_ACTIONS.GET_CINEMAS:
      return {
        ...state,
        cinemas: action.payload,
        error: null,
      };

    case CINEMA_ACTIONS.CREATE_CINEMA:
      return {
        ...state,
        cinemas: [...state.cinemas, action.payload],
        error: null,
      };

    case CINEMA_ACTIONS.UPDATE_CINEMA:
      return {
        ...state,
        cinemas: state.cinemas.map(cinema =>
          cinema._id === action.payload._id ? action.payload : cinema
        ),
        error: null,
      };

    case CINEMA_ACTIONS.DELETE_CINEMA:
      return {
        ...state,
        cinemas: state.cinemas.filter(cinema => cinema._id !== action.payload),
        error: null,
      };

    case CINEMA_ACTIONS.SET_LOADING:
      return {
        ...state,
        loading: action.payload,
      };

    case CINEMA_ACTIONS.SET_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };

    default:
      return state;
  }
};

export default cinemasReducer;
