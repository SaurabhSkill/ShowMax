import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core';
import {
  Box, 
  TextField, 
  Button,
  Typography,
  Grid,
  Paper
} from '@material-ui/core';
import { createCinema, updateCinema } from '../../../../../store/actions/cinemas';
import { getMovies } from '../../../../../store/actions/movies';
import { getShowtimesByCinema, addShowtime } from '../../../../../store/actions/showtimes';

const styles = theme => ({
  root: {
    padding: theme.spacing(3),
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(3),
  },
  section: {
    padding: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  sectionTitle: {
    marginBottom: theme.spacing(2),
    color: theme.palette.primary.main,
    fontWeight: 'bold',
  },
  priceTiersGrid: {
    marginTop: theme.spacing(2),
  },
  buttonGroup: {
    display: 'flex',
    gap: theme.spacing(2),
    justifyContent: 'flex-end',
    marginTop: theme.spacing(3),
  },
});

class AddCinema extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
    _id: '',
    name: '',
    city: '',
    seatsAvailable: '',
      priceTiers: {
        normal: 0,
        executive: 0,
        premium: 0,
        classic: 0,
      },
      loading: false,
      assignMovieId: '',
      assignStartAt: '',
      assignStartDate: '',
      assignEndDate: ''
    };
  }

  componentDidMount() {
    if (this.props.editCinema) {
      this.loadCinemaData();
    }
    this.props.getMovies();
    if (this.props.editCinema?._id) {
      this.props.getShowtimesByCinema(this.props.editCinema._id);
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.editCinema !== this.props.editCinema) {
      if (this.props.editCinema) {
        this.loadCinemaData();
        if (this.props.editCinema?._id) {
          this.props.getShowtimesByCinema(this.props.editCinema._id);
        }
      } else {
        this.resetForm();
      }
    }
  }

  loadCinemaData = () => {
    const { editCinema } = this.props;
    if (editCinema) {
      this.setState({
        _id: editCinema._id || '',
        name: editCinema.name || '',
        city: editCinema.city || '',
        seatsAvailable: editCinema.seatsAvailable || '',
        priceTiers: {
          normal: editCinema.priceTiers?.normal || 0,
          executive: editCinema.priceTiers?.executive || 0,
          premium: editCinema.priceTiers?.premium || 0,
          classic: editCinema.priceTiers?.classic || 0,
        },
      });
    }
  };

  handleAssignFieldChange = (field, value) => {
    this.setState({ [field]: value });
  };

  handleAddShowtime = async () => {
    const { _id, assignMovieId, assignStartAt, assignStartDate, assignEndDate } = this.state;
    if (!_id) return;

    if (!assignMovieId || !assignStartAt || !assignStartDate || !assignEndDate) {
      alert('Please fill movie, start time, start date and end date');
      return;
    }

    const payload = {
      cinemaId: _id,
      movieId: assignMovieId,
      startAt: assignStartAt,
      startDate: new Date(assignStartDate),
      endDate: new Date(assignEndDate)
    };

    this.setState({ loading: true });
    try {
      const res = await this.props.addShowtime(payload);
      if (res?.status === 'success') {
        await this.props.getShowtimesByCinema(_id);
        this.setState({ assignMovieId: '', assignStartAt: '', assignStartDate: '', assignEndDate: '' });
      }
    } finally {
      this.setState({ loading: false });
    }
  };

  resetForm = () => {
    this.setState({ 
      _id: '',
      name: '',
      city: '',
      seatsAvailable: '',
      priceTiers: {
        normal: 0,
        executive: 0,
        premium: 0,
        classic: 0,
      },
    });
  };

  handleFieldChange = (field, value) => {
    this.setState({ [field]: value });
  };

  handlePriceTierChange = (tier, value) => {
    this.setState(prevState => ({
      priceTiers: {
        ...prevState.priceTiers,
        [tier]: Number(value) || 0,
      },
    }));
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    
    const { _id, name, city, seatsAvailable, priceTiers } = this.state;
    const { handleClose } = this.props;

    // Validation
    if (!name.trim() || !city.trim() || !seatsAvailable) {
      alert('Please fill in all required fields');
      return;
    }

    if (Number(seatsAvailable) < 0) {
      alert('Seats available must be a positive number');
      return;
    }

    this.setState({ loading: true });

    const cinemaData = {
      name: name.trim(),
      city: city.trim().toLowerCase(),
      seatsAvailable: Number(seatsAvailable),
      priceTiers,
    };

    try {
      let result;
      if (_id) {
        // Update existing cinema
        result = await this.props.updateCinema(_id, cinemaData);
      } else {
        // Create new cinema
        result = await this.props.createCinema(cinemaData);
      }

      if (result.status === 'success') {
        handleClose();
      }
    } catch (error) {
      console.error('Error saving cinema:', error);
    } finally {
      this.setState({ loading: false });
    }
  };

  render() {
    const { classes } = this.props;
    const { editCinema, handleClose, movies, cinemaShowtimes } = this.props;
    const {
      name,
      city,
      seatsAvailable,
      priceTiers, 
      loading,
      assignMovieId,
      assignStartAt,
      assignStartDate,
      assignEndDate 
    } = this.state;

    return (
      <Box className={classes.root}>
        <Typography variant="h5" gutterBottom>
          {editCinema ? 'Edit Cinema' : 'Add New Cinema'}
        </Typography>
        
        <form onSubmit={this.handleSubmit} className={classes.form}>
          {/* Basic Information */}
          <Paper className={classes.section}>
            <Typography variant="h6" className={classes.sectionTitle}>
              Basic Information
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
            <TextField
                  fullWidth
                  label="Cinema Name"
                  value={name}
                  onChange={(e) => this.handleFieldChange('name', e.target.value)}
              required
                  disabled={loading}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="City"
                  value={city}
                  onChange={(e) => this.handleFieldChange('city', e.target.value)}
              required
                  disabled={loading}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
            <TextField
                  fullWidth
                  label="Seats Available"
              type="number"
                  value={seatsAvailable}
                  onChange={(e) => this.handleFieldChange('seatsAvailable', e.target.value)}
                  required
                  disabled={loading}
                  inputProps={{ min: 0 }}
                />
              </Grid>
            </Grid>
          </Paper>

          {/* Price Tiers */}
          <Paper className={classes.section}>
            <Typography variant="h6" className={classes.sectionTitle}>
              Price Tiers (₹)
            </Typography>
            <Grid container spacing={2} className={classes.priceTiersGrid}>
              <Grid item xs={12} sm={6} md={3}>
            <TextField
                  fullWidth
                  label="Normal"
              type="number"
                  value={priceTiers.normal}
                  onChange={(e) => this.handlePriceTierChange('normal', e.target.value)}
                  disabled={loading}
                  inputProps={{ min: 0 }}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
            <TextField
                  fullWidth
                  label="Executive"
              type="number"
                  value={priceTiers.executive}
                  onChange={(e) => this.handlePriceTierChange('executive', e.target.value)}
                  disabled={loading}
                  inputProps={{ min: 0 }}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
            <TextField
                  fullWidth
                  label="Premium"
              type="number"
                  value={priceTiers.premium}
                  onChange={(e) => this.handlePriceTierChange('premium', e.target.value)}
                  disabled={loading}
                  inputProps={{ min: 0 }}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
            <TextField
                  fullWidth
                  label="Classic"
                  type="number"
                  value={priceTiers.classic}
                  onChange={(e) => this.handlePriceTierChange('classic', e.target.value)}
                  disabled={loading}
                  inputProps={{ min: 0 }}
                />
              </Grid>
            </Grid>
            </Paper>

          {/* Assign Movies and Showtimes */}
          <Paper className={classes.section}>
            <Typography variant="h6" className={classes.sectionTitle}>
              Assign Movies and Showtimes
            </Typography>
            {!editCinema ? (
              <Typography variant="body2" color="textSecondary">
                Save the cinema first to assign showtimes.
              </Typography>
            ) : (
              <>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={4}>
                    <TextField
                      select
                      fullWidth
                      SelectProps={{ native: true }}
                      label="Movie"
                      value={assignMovieId}
                      onChange={(e) => this.handleAssignFieldChange('assignMovieId', e.target.value)}
                      disabled={loading}
                    >
                      <option value="" disabled>Select a movie</option>
                      {movies && movies.map(m => (
                        <option key={m._id} value={m._id}>{m.title}</option>
                      ))}
                    </TextField>
                  </Grid>
                  <Grid item xs={12} md={2}>
                    <TextField
                      fullWidth
                      label="Start Time"
                      placeholder="e.g. 10:00 AM"
                      value={assignStartAt}
                      onChange={(e) => this.handleAssignFieldChange('assignStartAt', e.target.value)}
                      disabled={loading}
                    />
                  </Grid>
                  <Grid item xs={12} md={3}>
                    <TextField
                      fullWidth
                      type="date"
                      label="Start Date"
                      InputLabelProps={{ shrink: true }}
                      value={assignStartDate}
                      onChange={(e) => this.handleAssignFieldChange('assignStartDate', e.target.value)}
                      disabled={loading}
                    />
                  </Grid>
                  <Grid item xs={12} md={3}>
                    <TextField
                      fullWidth
                      type="date"
                      label="End Date"
                      InputLabelProps={{ shrink: true }}
                      value={assignEndDate}
                      onChange={(e) => this.handleAssignFieldChange('assignEndDate', e.target.value)}
                      disabled={loading}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={this.handleAddShowtime}
                      disabled={loading || !assignMovieId || !assignStartAt || !assignStartDate || !assignEndDate}
                    >
                      Add Showtime
                    </Button>
                  </Grid>
                </Grid>

                <Box mt={3}>
                  <Typography variant="subtitle1">Existing Showtimes</Typography>
                  {(!cinemaShowtimes || cinemaShowtimes.length === 0) ? (
                    <Typography variant="body2" color="textSecondary">No showtimes yet.</Typography>
                  ) : (
                    <Grid container spacing={1}>
                      {cinemaShowtimes.map(st => (
                        <Grid item xs={12} md={6} key={st._id}>
                          <Paper className={classes.section}>
                            <Typography variant="body1">{st?.movieId?.title || ''} — {st.startAt}</Typography>
                            <Typography variant="caption" color="textSecondary">
                              {new Date(st.startDate).toLocaleDateString()} - {new Date(st.endDate).toLocaleDateString()}
                            </Typography>
                          </Paper>
                        </Grid>
                      ))}
                    </Grid>
                  )}
                </Box>
              </>
            )}
          </Paper>

          {/* Action Buttons */}
          <Box className={classes.buttonGroup}>
          <Button
              onClick={handleClose}
              disabled={loading}
              variant="outlined">
              Cancel
          </Button>
          <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={loading}>
              {loading ? 'Saving...' : (editCinema ? 'Update Cinema' : 'Create Cinema')}
          </Button>
              </Box>
        </form>
                </Box>
    );
  }
}

const mapStateToProps = state => ({
  movies: state.movieState.movies,
  cinemaShowtimes: state.showtimeState.showtimes
});

const mapDispatchToProps = {
  createCinema,
  updateCinema,
  getMovies,
  getShowtimesByCinema,
  addShowtime,
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(AddCinema));
