import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles, Typography } from '@material-ui/core';
import { Button, TextField, MenuItem, Grid, Select, InputLabel, FormControl, Box } from '@material-ui/core';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import moment from 'moment';
import { genreData, languageData } from '../../../data/MovieDataService';
import { getMovie, updateMovie } from '../../../store/actions';

const styles = theme => ({
  root: {
    padding: theme.spacing(3)
  },
  field: {
    display: 'flex',
    alignItems: 'center'
  },
  textField: {
    marginRight: theme.spacing(2),
    width: 230
  },
  title: {
    marginBottom: theme.spacing(2)
  },
  upload: {
    marginTop: theme.spacing(1)
  },
  buttonFooter: {
    marginTop: theme.spacing(2),
    marginRight: theme.spacing(2)
  }
});

class EditMoviePage extends Component {
  state = {
    title: '',
    bannerImage: null,
    posterImage: null,
    genre: [],
    language: [],
    duration: '',
    description: '',
    director: '',
    cast: '',
    releaseDate: null, // Will store JS Date for backend
    endDate: null, // Will store JS Date for backend
    additionalInfo: '',
    existingBannerUrl: '',
    existingPosterUrl: '',
    loading: false
  };

  // Helper method to convert JS Date to moment for display
  getDisplayDate = (jsDate) => {
    return jsDate ? moment(jsDate) : null;
  };

  componentDidMount() {
    const id = this.props.match.params.id;
    this.loadMovieData(id);
  }

  componentDidUpdate(prevProps) {
    // Reload data if selectedMovie changes (after update)
    if (prevProps.selectedMovie !== this.props.selectedMovie && this.props.selectedMovie) {
      console.log('selectedMovie changed, reloading form data');
      this.loadMovieFromProps();
    }
    
    // Also check if the movie ID in the URL changed
    const prevId = prevProps.match?.params?.id;
    const currentId = this.props.match?.params?.id;
    if (prevId !== currentId && currentId) {
      console.log('Movie ID changed, loading new movie data');
      this.loadMovieData(currentId);
    }
  }

  loadMovieData = async (id) => {
    try {
      await this.props.getMovie(id);
      this.loadMovieFromProps();
    } catch (error) {
      console.error('Failed to load movie:', error);
    }
  };

  loadMovieFromProps = () => {
    const m = this.props.selectedMovie || {};
    console.log('Loading movie data from props:', m);
    
    this.setState({
      title: m.title || '',
      language: Array.isArray(m.language) ? m.language : (m.language ? [m.language] : []),
      genre: typeof m.genre === 'string' ? m.genre.split(',') : (m.genre || []),
      director: m.director || '',
      cast: m.cast || '',
      description: m.description || '',
      duration: m.duration || '',
      releaseDate: m.releaseDate ? new Date(m.releaseDate) : new Date(),
      endDate: m.endDate ? new Date(m.endDate) : new Date(),
      additionalInfo: m.additionalInfo || '',
      existingBannerUrl: m.bannerImage || '',
      existingPosterUrl: m.posterImage || ''
    });
    
    console.log('Form state updated with movie data');
  };

  handleFieldChange = (field, value) => {
    this.setState({ [field]: value });
  };

  clearFileInput = (inputId) => {
    const input = document.getElementById(inputId);
    if (input) {
      input.value = '';
    }
  };

  onUpdateMovie = async () => {
    // Validate required fields including dates
    const { title, releaseDate, endDate, director, cast, description } = this.state;
    
    if (!title || !director || !cast || !description) {
      alert('Please fill in all required fields (Title, Director, Cast, Description)');
      return;
    }
    
    if (!releaseDate || !endDate) {
      alert('Please select both Release Date and End Date');
      return;
    }
    
    // Validate that end date is after release date
    if (new Date(endDate) <= new Date(releaseDate)) {
      alert('End Date must be after Release Date');
      return;
    }
    
    this.setState({ loading: true });
    const {
      language,
      genre,
      duration,
      additionalInfo,
      bannerImage,
      posterImage
    } = this.state;

    // Only send fields allowed by the server update route
    const movie = {
      title,
      language,
      genre: genre.join(','),
      duration: Number(duration),
      description,
      director,
      cast,
      releaseDate,
      endDate,
      additionalInfo
    };

    // Debug logging to track file assignments
    console.log('EditMovie - Files being sent:');
    console.log('Banner file:', bannerImage?.name || 'No banner file');
    console.log('Poster file:', posterImage?.name || 'No poster file');

    try {
      console.log('Updating movie with data:', movie);
      const success = await this.props.updateMovie(this.props.match.params.id, movie, null, bannerImage, posterImage);
      
      if (success) {
        // Wait a moment for the state to update, then reload the movie data
        setTimeout(() => {
          const movieId = this.props.match.params.id;
          this.props.getMovie(movieId).then(() => {
            this.loadMovieFromProps();
            console.log('Movie data reloaded after update');
          });
        }, 500);
        
        // Don't navigate away immediately - let user see the updated data
        // this.props.history.push('/admin/movies');
      }
    } catch (error) {
      console.error('Error updating movie:', error);
      alert('Error updating movie. Please try again.');
    } finally {
      this.setState({ loading: false });
    }
  };

  onRemoveMovie = undefined;

  render() {
    const { classes } = this.props;
    const {
      title,
      bannerImage,
      posterImage,
      genre,
      language,
      duration,
      description,
      director,
      cast,
      releaseDate,
      endDate,
      additionalInfo,
      loading,
      existingBannerUrl,
      existingPosterUrl
    } = this.state;

    return (
      <div className={classes.root}>
        <Typography variant="h4" className={classes.title}>
          Edit Movie
        </Typography>
        <form autoComplete="off" noValidate>
          <div className={classes.field}>
            <TextField
              className={classes.textField}
              helperText="Please specify the title"
              label="Title"
              margin="dense"
              required
              value={title}
              variant="outlined"
              onChange={event => this.handleFieldChange('title', event.target.value)}
            />
          </div>
          <div className={classes.field}>
            <FormControl variant="outlined" className={classes.textField}>
              <InputLabel>Genre</InputLabel>
              <Select
                multiple
                value={genre}
                onChange={event => this.handleFieldChange('genre', event.target.value)}
                label="Genre">
                {genreData.map((genreItem, index) => (
                  <MenuItem key={genreItem + '-' + index} value={genreItem}>
                    {genreItem}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
          <div className={classes.field}>
            <TextField
              fullWidth
              multiline
              rows={3}
              className={classes.textField}
              label="Description"
              margin="dense"
              required
              variant="outlined"
              value={description}
              onChange={event => this.handleFieldChange('description', event.target.value)}
            />
          </div>
          <div className={classes.field}>
            <FormControl variant="outlined" className={classes.textField}>
              <InputLabel>Language</InputLabel>
              <Select
                multiple
                value={language}
                onChange={event => this.handleFieldChange('language', event.target.value)}
                label="Language">
                {languageData.map((langItem, index) => (
                  <MenuItem key={langItem + '-' + index} value={langItem}>
                    {langItem}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              className={classes.textField}
              label="Duration"
              helperText="(in minutes)"
              margin="dense"
              type="number"
              value={duration}
              variant="outlined"
              onChange={event => this.handleFieldChange('duration', event.target.value)}
            />
          </div>
          <div className={classes.field}>
            <TextField
              className={classes.textField}
              label="Director"
              margin="dense"
              required
              value={director}
              variant="outlined"
              onChange={event => this.handleFieldChange('director', event.target.value)}
            />
            <TextField
              className={classes.textField}
              label="Cast"
              margin="dense"
              required
              value={cast}
              variant="outlined"
              onChange={event => this.handleFieldChange('cast', event.target.value)}
            />
          </div>
          <div className={classes.field}>
            <TextField
              fullWidth
              multiline
              rows={3}
              className={classes.textField}
              label="Additional Info"
              margin="dense"
              variant="outlined"
              value={additionalInfo}
              onChange={event => this.handleFieldChange('additionalInfo', event.target.value)}
            />
          </div>
          <div className={classes.field}>
            <MuiPickersUtilsProvider utils={MomentUtils}>
              <KeyboardDatePicker
                className={classes.textField}
                inputVariant="outlined"
                margin="normal"
                id="release-date"
                label="Release Date"
                format="MM/DD/YYYY"
                value={this.getDisplayDate(releaseDate)}
                onChange={date => {
                  // Handle null/invalid dates properly - convert to JS Date for backend
                  const validDate = date && moment.isMoment(date) && date.isValid() ? date.toDate() : null;
                  this.handleFieldChange('releaseDate', validDate);
                }}
                KeyboardButtonProps={{ 'aria-label': 'change date' }}
                clearable
                placeholder="Select release date"
                autoOk
                disableToolbar
                variant="inline"
              />
              <KeyboardDatePicker
                className={classes.textField}
                inputVariant="outlined"
                margin="normal"
                id="end-date"
                label="End Date"
                format="MM/DD/YYYY"
                value={this.getDisplayDate(endDate)}
                onChange={date => {
                  // Handle null/invalid dates properly - convert to JS Date for backend
                  const validDate = date && moment.isMoment(date) && date.isValid() ? date.toDate() : null;
                  this.handleFieldChange('endDate', validDate);
                }}
                KeyboardButtonProps={{ 'aria-label': 'change date' }}
                clearable
                placeholder="Select end date"
                autoOk
                disableToolbar
                variant="inline"
              />
            </MuiPickersUtilsProvider>
          </div>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <div className={classes.field}>
                <Typography variant="subtitle2" style={{ color: '#1976d2', fontWeight: 'bold' }}>
                  <span role="img" aria-label="picture">🖼️</span> Banner Image (Homepage Hero - Wide Format)
                </Typography>
                <Typography variant="caption" style={{ color: '#666', display: 'block', marginBottom: '8px' }}>
                  This image appears as the large background on the homepage
                </Typography>
                <input
                  accept="image/*"
                  type="file"
                  onChange={event => {
                    const file = event.target.files[0];
                    console.log('Banner image selected:', file?.name);
                    this.handleFieldChange('bannerImage', file);
                  }}
                  style={{ marginBottom: '8px' }}
                />
                {bannerImage && (
                  <div style={{ marginTop: '8px', padding: '8px', backgroundColor: '#e3f2fd', borderRadius: '4px' }}>
                    <strong>New Banner:</strong> {bannerImage.name}
                  </div>
                )}
                {(existingBannerUrl || bannerImage) && (
                  <Box mt={1}>
                    <img
                      alt="banner preview"
                      src={bannerImage ? URL.createObjectURL(bannerImage) : existingBannerUrl}
                      style={{ width: '100%', maxHeight: 140, objectFit: 'cover', borderRadius: 8 }}
                    />
                  </Box>
                )}
              </div>
            </Grid>
            <Grid item xs={12} md={6}>
              <div className={classes.field}>
                <Typography variant="subtitle2" style={{ color: '#d32f2f', fontWeight: 'bold' }}>
                  <span role="img" aria-label="movie camera">🎬</span> Poster Image (Cards/Details - Tall Format)
                </Typography>
                <Typography variant="caption" style={{ color: '#666', display: 'block', marginBottom: '8px' }}>
                  This image appears on movie cards and detail pages
                </Typography>
                <input
                  accept="image/*"
                  type="file"
                  onChange={event => {
                    const file = event.target.files[0];
                    console.log('Poster image selected:', file?.name);
                    this.handleFieldChange('posterImage', file);
                  }}
                  style={{ marginBottom: '8px' }}
                />
                {posterImage && (
                  <div style={{ marginTop: '8px', padding: '8px', backgroundColor: '#ffebee', borderRadius: '4px' }}>
                    <strong>New Poster:</strong> {posterImage.name}
                  </div>
                )}
                {(existingPosterUrl || posterImage) && (
                  <Box mt={1}>
                    <img
                      alt="poster preview"
                      src={posterImage ? URL.createObjectURL(posterImage) : existingPosterUrl}
                      style={{ width: '100%', maxHeight: 140, objectFit: 'cover', borderRadius: 8 }}
                    />
                  </Box>
                )}
              </div>
            </Grid>
          </Grid>
        </form>
        <div className={classes.buttonContainer}>
          <Button
            color="default"
            variant="outlined"
            onClick={() => {
              const movieId = this.props.match.params.id;
              this.props.getMovie(movieId).then(() => {
                this.loadMovieFromProps();
              });
            }}
            style={{ marginRight: '1rem' }}
          >
            Refresh Data
          </Button>
          <Button
            className={classes.buttonFooter}
            color="secondary"
            variant="outlined"
            onClick={() => this.props.history.push('/admin/movies')}
            style={{ marginRight: '1rem' }}
          >
            Back to Movies
          </Button>
          <Button
            className={classes.buttonFooter}
            color="primary"
            variant="contained"
            disabled={loading}
            onClick={this.onUpdateMovie}
          >
            {loading ? 'Updating...' : 'Update Movie'}
          </Button>
        </div>
        {/* Delete removed */}
      </div>
    );
  }
}

EditMoviePage.propTypes = {
  match: PropTypes.object,
  selectedMovie: PropTypes.object
};

const mapStateToProps = ({ movieState }) => ({ selectedMovie: movieState.selectedMovie });
const mapDispatchToProps = { getMovie, updateMovie };

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(EditMoviePage));


