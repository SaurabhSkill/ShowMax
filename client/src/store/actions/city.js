import { SET_CITY } from '../types';

export const setCity = city => {
  // We can add logic here later, like saving to localStorage
  return {
    type: SET_CITY,
    payload: city
  };
};
