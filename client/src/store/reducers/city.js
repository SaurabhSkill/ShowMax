import { SET_CITY } from '../types';

const initialState = {
  selectedCity: 'mumbai' // Set a default city
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case SET_CITY:
      return {
        ...state,
        selectedCity: payload
      };
    default:
      return state;
  }
}
