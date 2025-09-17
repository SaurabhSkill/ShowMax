import {
  SET_SELECTED_SEATS,
  SET_SELECTED_CINEMA,
  SET_SELECTED_DATE,
  SET_SELECTED_TIME,
  TOGGLE_LOGIN_POPUP,
  SHOW_INVITATION_FORM,
  RESET_CHECKOUT,
  SET_INVITATION,
  SET_SUGGESTED_SEATS,
  SET_QR_CODE
} from '../types';

const initialState = {
  selectedSeats: [],
  suggestedSeat: [],
  selectedCinema: '',
  selectedDate: null,
  selectedTime: '',
  showLoginPopup: false,
  showInvitation: false,
  invitations: {},
  QRCode: ''
};

const setSelectedSeats = (state, seats) => {
  console.log('=== REDUX SET_SELECTED_SEATS DEBUG ===');
  console.log('Current state.selectedSeats:', state.selectedSeats);
  console.log('New seats payload:', seats, 'type:', typeof seats, 'isArray:', Array.isArray(seats));
  
  // Ensure selectedSeats is always an array
  const currentSeats = Array.isArray(state.selectedSeats) ? state.selectedSeats : [];
  
  // If seats is an array of numbers (ticket count), replace the entire array
  if (Array.isArray(seats) && seats.every(seat => typeof seat === 'number')) {
    console.log('Replacing entire array with ticket count:', seats);
    return {
      ...state,
      selectedSeats: seats
    };
  }
  
  // Otherwise, handle as toggle behavior for individual seat selection
  let newSeats = [];
  const seatExist = currentSeats.find(
    seat => JSON.stringify(seat) === JSON.stringify(seats)
  );
  !seatExist
    ? (newSeats = [...currentSeats, seats])
    : (newSeats = currentSeats.filter(
        seat => JSON.stringify(seat) !== JSON.stringify(seats)
      ));

  console.log('Final newSeats:', newSeats);
  console.log('=====================================');
  return {
    ...state,
    selectedSeats: newSeats
  };
};

const setSuggestedSeats = (state, seats) => {
  // Ensure suggestedSeat is always an array
  const currentSuggestedSeat = Array.isArray(state.suggestedSeat) ? state.suggestedSeat : [];
  const newSeats = [...currentSuggestedSeat, seats];

  return {
    ...state,
    suggestedSeat: newSeats
  };
};

const setSelectedCinema = (state, selectedCinema) => ({
  ...state,
  selectedCinema
});
const setSelectedDate = (state, selectedDate) => ({
  ...state,
  selectedDate
});

const setSelectedTime = (state, selectedTime) => ({
  ...state,
  selectedTime
});

const setInvitation = (state, event) => {
  return {
    ...state,
    invitations: {
      ...state.invitations,
      [event.target.name]: event.target.value
    }
  };
};

const setQRCode = (state, QRCode) => ({
  ...state,
  QRCode
});

const toggleLoginPopup = state => ({
  ...state,
  showLoginPopup: !state.showLoginPopup
});
const showInvitationForm = state => ({
  ...state,
  showInvitation: !state.showInvitation
});
const resetCheckout = () => initialState;

export default function(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case SET_SELECTED_SEATS:
      return setSelectedSeats(state, payload);
    case SET_SUGGESTED_SEATS:
      return setSuggestedSeats(state, payload);
    case SET_SELECTED_CINEMA:
      return setSelectedCinema(state, payload);
    case SET_SELECTED_DATE:
      return setSelectedDate(state, payload);
    case SET_SELECTED_TIME:
      return setSelectedTime(state, payload);
    case SET_INVITATION:
      return setInvitation(state, payload);
    case TOGGLE_LOGIN_POPUP:
      return toggleLoginPopup(state);
    case SHOW_INVITATION_FORM:
      return showInvitationForm(state);
    case SET_QR_CODE:
      return setQRCode(state, payload);
    case RESET_CHECKOUT:
      return resetCheckout();
    default:
      return state;
  }
}
