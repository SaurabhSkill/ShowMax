import React, { Component } from 'react'; // Fragment removed
import { connect } from 'react-redux';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import {
  withStyles,
  Button,
  TextField,
  Typography,
  Divider,
  List,
  ListItem,
  ListItemText,
  IconButton,
  MenuItem
} from '@material-ui/core';
import { Add, Delete } from '@material-ui/icons';
import styles from './styles';
import {
  getCinemas,
  createCinemas,
  updateCinemas,
  removeCinemas
} from '../../../../../store/actions/cinemas';
import {
  getShowtimesByCinema,
  addShowtime,
  deleteShowtime
} from '../../../../../store/actions/showtimes';
import { FileUpload } from '../../../../../components';

class AddCinema extends Component {
  state = {
    _id: '',
    name: '',
    image: null,
    ticketPrice: '',
    city: '',
    seatsAvailable: '',
    seats: [],
    notification: {},
    // New state for the showtime form
    newShowtimeMovieId: '',
    newShowtimeStartAt: ''
  };

  componentDidMount() {
    if (this.props.editCinema) {
      const { image, ...rest } = this.props.editCinema;
      this.setState({ ...rest });
      // Fetch showtimes for this cinema when the component mounts
      this.props.getShowtimesByCinema(this.props.editCinema._id);
    }
  }

  handleFieldChange = (field, value) => {
    this.setState({ [field]: value });
  };

  onSubmitAction = async type => {
    const {
      getCinemas,
      createCinemas,
      updateCinemas,
      removeCinemas,
      handleClose
    } = this.props;
    const {
      _id,
      name,
      image,
      ticketPrice,
      city,
      seatsAvailable,
      seats
    } = this.state;
    const cinema = { name, ticketPrice, city, seatsAvailable, seats };
    let notification = {};
    if (type === 'create') {
      notification = await createCinemas(image, cinema);
    } else if (type === 'update') {
      notification = await updateCinemas(image, cinema, _id);
    } else {
      notification = await removeCinemas(_id);
    }
    this.setState({ notification });
    if (notification && notification.status === 'success') {
      getCinemas();
      handleClose();
    }
  };

  // --- NEW SHOWTIME HANDLERS ---
  handleShowtimeAdd = async () => {
    const { addShowtime, getShowtimesByCinema, editCinema } = this.props;
    const { newShowtimeMovieId, newShowtimeStartAt } = this.state;

    if (!newShowtimeMovieId || !newShowtimeStartAt) {
      return this.setState({
        notification: {
          status: 'error',
          message: 'Please select a movie and a time.'
        }
      });
    }

    const newShowtime = {
      movieId: newShowtimeMovieId,
      cinemaId: editCinema._id,
      startAt: newShowtimeStartAt,
      startDate: new Date(), // Default to today
      endDate: new Date('2025-12-31') // Default end date
    };

    const notification = await addShowtime(newShowtime);
    this.setState({
      notification,
      newShowtimeMovieId: '',
      newShowtimeStartAt: ''
    });

    if (notification && notification.status === 'success') {
      getShowtimesByCinema(editCinema._id);
    }
  };

  handleShowtimeDelete = async showtimeId => {
    const { deleteShowtime, getShowtimesByCinema, editCinema } = this.props;
    const notification = await deleteShowtime(showtimeId);
    this.setState({ notification });
    if (notification && notification.status === 'success') {
      getShowtimesByCinema(editCinema._id);
    }
  };

  // --- RENDER METHOD FOR THE SHOWTIME MANAGER ---
  renderShowtimeManager = () => {
    const { classes, movies, showtimes } = this.props;
    const { newShowtimeMovieId, newShowtimeStartAt } = this.state;
    
    return (
      <div className={classes.showtimeManager}>
        <Divider style={{ margin: '20px 0' }} />
        <Typography variant="h5" className={classes.title}>
          Manage Showtimes
        </Typography>

        {/* List of existing showtimes */}
        <List>
          {showtimes &&
            showtimes.map(showtime => (
              <ListItem key={showtime._id} dense>
                <ListItemText
                  primary={showtime.movieId ? showtime.movieId.title : 'Loading...'}
                  secondary={showtime.startAt}
                />
                <IconButton
                  edge="end"
                  aria-label="delete"
                  onClick={() => this.handleShowtimeDelete(showtime._id)}>
                  <Delete />
                </IconButton>
              </ListItem>
            ))}
        </List>

        {/* Form to add a new showtime */}
        <div className={classes.field}>
          <TextField
            fullWidth
            select
            label="Select Movie"
            value={newShowtimeMovieId}
            onChange={event => this.handleFieldChange('newShowtimeMovieId', event.target.value)}
            variant="outlined"
            margin="dense">
            {movies.map(movie => (
              <MenuItem key={movie._id} value={movie._id}>
                {movie.title}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            fullWidth
            label="Enter Time (e.g., 10:30 AM)"
            value={newShowtimeStartAt}
            onChange={event => this.handleFieldChange('newShowtimeStartAt', event.target.value)}
            variant="outlined"
            margin="dense"
          />
        </div>
        <Button
          color="primary"
          variant="outlined"
          onClick={this.handleShowtimeAdd}>
          <Add /> Add Showtime
        </Button>
      </div>
    );
  };

  render() {
    const { classes, className, editCinema } = this.props;
    const {
      name,
      image,
      ticketPrice,
      city,
      seatsAvailable,
      notification
    } = this.state;

    const rootClassName = classNames(classes.root, className);
    const mainTitle = editCinema ? 'Edit Cinema' : 'Add Cinema';
    const submitButton = editCinema ? 'Update Cinema' : 'Save Details';
    const submitAction = editCinema
      ? () => this.onSubmitAction('update')
      : () => this.onSubmitAction('create');

    return (
      <div className={rootClassName}>
        <Typography variant="h4" className={classes.title}>
          {mainTitle}
        </Typography>
        <form autoComplete="off" noValidate>
          {/* Cinema Details Form */}
          <div className={classes.field}>
            <TextField
              className={classes.textField}
              helperText="Please specify the cinema name"
              label="Name"
              margin="dense"
              required
              value={name}
              variant="outlined"
              onChange={event =>
                this.handleFieldChange('name', event.target.value)
              }
            />
            <TextField
              fullWidth
              className={classes.textField}
              label="City"
              margin="dense"
              required
              variant="outlined"
              value={city}
              onChange={event =>
                this.handleFieldChange('city', event.target.value)
              }
            />
          </div>
          <div className={classes.field}>
            <FileUpload
              className={classes.textField}
              file={image}
              onUpload={event => {
                const file = event.target.files[0];
                this.handleFieldChange('image', file);
              }}
            />
          </div>
          <div className={classes.field}>
            <TextField
              className={classes.textField}
              label="Ticket Price"
              margin="dense"
              type="number"
              value={ticketPrice}
              variant="outlined"
              onChange={event =>
                this.handleFieldChange('ticketPrice', event.target.value)
              }
            />
            <TextField
              className={classes.textField}
              label="Seats Available"
              margin="dense"
              required
              value={seatsAvailable}
              variant="outlined"
              onChange={event =>
                this.handleFieldChange('seatsAvailable', event.target.value)
              }
            />
          </div>
        </form>

        {/* Render Showtime Manager only when editing a cinema */}
        {editCinema && this.renderShowtimeManager()}

        <div className={classes.buttonContainer}>
          <Button
            className={classes.buttonFooter}
            color="primary"
            variant="contained"
            onClick={submitAction}>
            {submitButton}
          </Button>
          {editCinema && (
            <Button
              color="secondary"
              className={classes.buttonFooter}
              variant="contained"
              onClick={() => this.onSubmitAction('remove')}>
              Delete Cinema
            </Button>
          )}
        </div>

        {notification && notification.status && (
          <Typography
            className={classes.infoMessage}
            color={notification.status === 'success' ? 'primary' : 'error'}
            variant="caption">
            {notification.message}
          </Typography>
        )}
      </div>
    );
  }
}

AddCinema.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired,
  editCinema: PropTypes.object,
  handleClose: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  movies: state.movieState.movies,
  showtimes: state.showtimeState.showtimes
});

const mapDispatchToProps = {
  getCinemas,
  createCinemas,
  updateCinemas,
  removeCinemas,
  getShowtimesByCinema,
  addShowtime,
  deleteShowtime
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(AddCinema));
