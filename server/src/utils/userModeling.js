const Reservation = require('../models/reservation');
const Movie = require('../models/movie');
const Cinema = require('../models/cinema');

const moviesUserModeling = async username => {
  userPreference = {
    genre: {},
    director: {},
    cast: {},
  };

  const userReservations = JSON.parse(
    JSON.stringify(await Reservation.find({ username: username }))
  );
  const Allmovies = JSON.parse(JSON.stringify(await Movie.find({})));

  const moviesWatched = userReservations.map(reservation => {
    for (let movie of Allmovies) {
      if (movie._id == reservation.movieId) {
        return movie;
      }
    }
  });

  moviesWatched.map(movie => {
    let genres = movie.genre.replace(/\s*,\s*/g, ',').split(',');
    let directors = movie.director.replace(/\s*,\s*/g, ',').split(',');
    let casts = movie.cast.replace(/\s*,\s*/g, ',').split(',');
    for (let genre of genres) {
      userPreference.genre[genre]
        ? ++userPreference.genre[genre]
        : (userPreference.genre[genre] = 1);
    }
    for (let director of directors) {
      userPreference.director[director]
        ? ++userPreference.director[director]
        : (userPreference.director[director] = 1);
    }
    for (let cast of casts) {
      userPreference.cast[cast] ? ++userPreference.cast[cast] : (userPreference.cast[cast] = 1);
    }
  });

  // Find movies that are available for booking
  const availableMovies = availableMoviesFilter(Allmovies);
  const moviesNotWatched = moviesNotWatchedFilter(availableMovies, userReservations);

  const moviesRated = findRates(moviesNotWatched, userPreference);

  moviesRated.sort((a, b) => {
    return b[1] - a[1];
  });

  const moviesToObject = moviesRated.map(array => {
    return array[0];
  });
  return moviesToObject;
};

const findRates = (moviesNotWatched, userPreference) => {
  const result = [];
  let rate;
  for (let movie of moviesNotWatched) {
    rate = 0;
    for (let pref in userPreference) {
      rate += getRateOfProperty(pref, userPreference, movie);
      // TODO: we can use weights here
    }
    if (rate !== 0) result.push([movie, rate]);
  }
  return result;
};

const getRateOfProperty = (pref, userPreference, movie) => {
  let rate = 0;
  const values = Object.keys(userPreference[pref]).map(key => {
    return [key, userPreference[pref][key]];
  });
  let movieValues = movie[pref].replace(/\s*,\s*/g, ',').split(',');
  for (value of values) {
    if (movieValues.length) {
      for (movieValue of movieValues) {
        if (movieValue == value[0]) {
          rate += value[1];
        }
      }
    }
  }

  return rate;
};

const availableMoviesFilter = Allmovies => {
  const today = new Date();
  const returnMovies = [];
  Allmovies.map(movie => {
    let releaseDate = new Date(movie.releaseDate);
    let endDate = new Date(movie.endDate);
    if (today >= releaseDate && today <= endDate) {
      returnMovies.push(movie);
    }
  });
  return returnMovies;
};

const moviesNotWatchedFilter = (availableMovies, userReservations) => {
  const returnMovies = [];
  availableMovies.map(movie => {
    let isFirst = [];
    for (let reservation of userReservations) {
      if (reservation.movieId == movie._id) {
        isFirst.push(false);
      } else {
        isFirst.push(true);
      }
    }

    if (isFirst.every(Boolean)) {
      returnMovies.push(movie);
    }
  });
  return returnMovies;
};

const reservationSeatsUserModeling = async (username, newSeats) => {
  let numberOfTicketsArray = [];
  let numberOfTickets = 1;
  const positions = {
    front: 0,
    center: 0,
    back: 0,
  };
  const cinemas = JSON.parse(JSON.stringify(await Cinema.find({})));
  const userReservations = JSON.parse(
    JSON.stringify(await Reservation.find({ username: username }))
  );

  userReservations.map(reservation => {
    for (let cinema of cinemas) {
      if (cinema._id == reservation.cinemaId) {
        //find how many rows the cinema has
        const position = getPosition(cinema.seats.length, reservation.seats);
        ++positions[position];
        numberOfTicketsArray.push(reservation.seats.length);
      }
    }
  });
  numberOfTickets = Math.round(
    numberOfTicketsArray.reduce((a, b) => a + b, 0) / numberOfTicketsArray.length
  );

  return {
    numberOfTickets,
    positions,
  };
};

const getPosition = (cinemaRows, seats) => {
  const rowNum = seats[0][0];
  const step = cinemaRows / 3;
  let pos = 1;
  for (let i = step; i <= cinemaRows; i += step) {
    if (rowNum < i) {
      switch (pos) {
        case 1:
          return 'front';
        case 2:
          return 'center';
        case 3:
          return 'back';
      }
    }
    pos++;
  }
};

const userModeling = {
  moviesUserModeling,
  reservationSeatsUserModeling,
};

module.exports = userModeling;
