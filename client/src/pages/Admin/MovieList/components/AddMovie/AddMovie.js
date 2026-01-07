import React, { Component } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles, Typography, Select, InputLabel, FormControl } from '@material-ui/core';
import { Button, TextField, MenuItem, Grid } from '@material-ui/core';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import moment from 'moment';
import styles from './styles';
import { genreData, languageData } from '../../../../../data/MovieDataService';
import { addMovie } from '../../../../../store/actions';

class AddMovie extends Component {
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
    loading: false
  };

  // Helper method to convert JS Date to moment for display
  getDisplayDate = (jsDate) => {
    return jsDate ? moment(jsDate) : null;
  };

  componentDidMount() {}

  handleFieldChange = (field, value) => {
    this.setState({ [field]: value });
  };

  clearFileInput = (inputId) => {
    const input = document.getElementById(inputId);
    if (input) {
      input.value = '';
    }
  };

  onAddMovie = async () => {
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
    const { bannerImage, posterImage, genre, ...rest } = this.state;
    const movie = { ...rest, genre: genre.join(',') };
    
    // Debug logging to track file assignments
    console.log('AddMovie - Files being sent:');
    console.log('Banner file:', bannerImage?.name || 'No banner file');
    console.log('Poster file:', posterImage?.name || 'No poster file');
    
    try {
      await this.props.addMovie(null, movie, bannerImage, posterImage);
      
      // Clear the form after successful submission
      this.setState({
        title: '',
        bannerImage: null,
        posterImage: null,
        genre: [],
        language: [],
        duration: '',
        description: '',
        director: '',
        cast: '',
        releaseDate: null,
        endDate: null,
        additionalInfo: ''
      });
      
      // Clear the file inputs
      this.clearFileInput('banner-upload-input');
      this.clearFileInput('poster-upload-input');
      
    } catch (error) {
      console.error('Error adding movie:', error);
      alert('Error adding movie. Please try again.');
    } finally {
      this.setState({ loading: false });
    }
  };

  onUpdateMovie = undefined;

  onRemoveMovie = undefined;

  render() {
    const { classes, className } = this.props;
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
      additionalInfo, // Get new state
      loading
    } = this.state;

    const rootClassName = classNames(classes.root, className);
    const subtitle = 'Add Movie';
    const submitButton = 'Save Details';
    const submitAction = () => this.onAddMovie();

    return (
      <div className={rootClassName}>
        <Typography variant="h4" className={classes.title}>
          {subtitle}
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
              onChange={event =>
                this.handleFieldChange('title', event.target.value)
              }
            />
          </div>
          <div className={classes.field}>
            <FormControl variant="outlined" className={classes.textField}>
              <InputLabel>Genre</InputLabel>
              <Select
                multiple
                value={genre}
                onChange={event =>
                  this.handleFieldChange('genre', event.target.value)
                }
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
              onChange={event =>
                this.handleFieldChange('description', event.target.value)
              }
            />
          </div>
          <div className={classes.field}>
            <FormControl variant="outlined" className={classes.textField}>
              <InputLabel>Language</InputLabel>
              <Select
                multiple
                value={language}
                onChange={event =>
                  this.handleFieldChange('language', event.target.value)
                }
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
              helperText="(in minutes)" // Updated label
              margin="dense"
              type="number"
              value={duration}
              variant="outlined"
              onChange={event =>
                this.handleFieldChange('duration', event.target.value)
              }
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
              onChange={event =>
                this.handleFieldChange('director', event.target.value)
              }
            />
            <TextField
              className={classes.textField}
              label="Cast"
              margin="dense"
              required
              value={cast}
              variant="outlined"
              onChange={event =>
                this.handleFieldChange('cast', event.target.value)
              }
            />
          </div>
          {/* --- NEW FIELD FOR ADDITIONAL INFO --- */}
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
              onChange={event =>
                this.handleFieldChange('additionalInfo', event.target.value)
              }
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
                KeyboardButtonProps={{
                  'aria-label': 'change date'
                }}
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
                KeyboardButtonProps={{
                  'aria-label': 'change date'
                }}
                clearable
                placeholder="Select end date"
                autoOk
                disableToolbar
                variant="inline"
              />
            </MuiPickersUtilsProvider>
          </div>
          {/* Primary Image (legacy) removed */}
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
                    <strong>Banner:</strong> {bannerImage.name}
                  </div>
                )}
                {/* No preview for Add mode since no existing image */}
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
                    <strong>Poster:</strong> {posterImage.name}
                  </div>
                )}
                {/* No preview for Add mode since no existing image */}
              </div>
            </Grid>
          </Grid>
        </form>

        <Button
          className={classes.buttonFooter}
          color="primary"
          variant="contained"
          disabled={loading}
          onClick={submitAction}>
          {submitButton}
        </Button>
        {/* Delete action removed from Add form */}
      </div>
    );
  }
}

AddMovie.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object,
  movie: PropTypes.object
};

const mapStateToProps = ({ movieState }) => ({
  movies: movieState.movies
});

const mapDispatchToProps = { addMovie };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(AddMovie));
