import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles, Typography } from '@material-ui/core';
import { Button, TextField, MenuItem, Grid, Select, InputLabel, FormControl, Box } from '@material-ui/core';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import { genreData, languageData } from '../../../data/MovieDataService';
import { getMovie, updateMovie } from '../../../store/actions';
import FileUpload from '../../../components/FileUpload/FileUpload';

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
    releaseDate: new Date(),
    endDate: new Date(),
    additionalInfo: '',
    existingBannerUrl: '',
    existingPosterUrl: '',
    loading: false
  };

  componentDidMount() {
    const id = this.props.match.params.id;
    this.props.getMovie(id).then(() => {
      const m = this.props.selectedMovie || {};
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
    });
  }

  handleFieldChange = (field, value) => {
    this.setState({ [field]: value });
  };

  onUpdateMovie = async () => {
    this.setState({ loading: true });
    const {
      title,
      language,
      genre,
      duration,
      description,
      director,
      cast,
      releaseDate,
      endDate,
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

    try {
      const ok = await this.props.updateMovie(this.props.match.params.id, movie, null, bannerImage, posterImage);
      if (ok) {
        this.props.history.push('/admin/movies');
      }
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
                value={releaseDate}
                onChange={date => this.handleFieldChange('releaseDate', date._d)}
                KeyboardButtonProps={{ 'aria-label': 'change date' }}
              />
              <KeyboardDatePicker
                className={classes.textField}
                inputVariant="outlined"
                margin="normal"
                id="end-date"
                label="End Date"
                value={endDate}
                onChange={date => this.handleFieldChange('endDate', date._d)}
                KeyboardButtonProps={{ 'aria-label': 'change date' }}
              />
            </MuiPickersUtilsProvider>
          </div>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <div className={classes.field}>
                <Typography variant="subtitle2">Banner Image (Homepage Hero)</Typography>
                <FileUpload
                  className={classes.upload}
                  file={bannerImage}
                  inputId={`banner-file-${this.props.match.params.id}`}
                  onUpload={event => {
                    const file = event.target.files[0];
                    this.handleFieldChange('bannerImage', file);
                  }}
                />
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
                <Typography variant="subtitle2">Poster Image (Cards/Details)</Typography>
                <FileUpload
                  className={classes.upload}
                  file={posterImage}
                  inputId={`poster-file-${this.props.match.params.id}`}
                  onUpload={event => {
                    const file = event.target.files[0];
                    this.handleFieldChange('posterImage', file);
                  }}
                />
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
        <Button
          className={classes.buttonFooter}
          color="primary"
          variant="contained"
          disabled={loading}
          onClick={this.onUpdateMovie}
        >
          Update Movie
        </Button>
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


