import React, { useState } from 'react';
import { connect } from 'react-redux';
import {
  Box,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  makeStyles
} from '@material-ui/core';
import { Rating } from '@material-ui/lab';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import theme from '../../../../theme';
import { addMovieReview } from '../../../../store/actions/movies';

const useStyles = makeStyles(theme => ({
  ratingContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    padding: theme.spacing(1, 2),
    borderRadius: theme.shape.borderRadius,
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(2),
    marginTop: theme.spacing(2)
  },
  ratingText: {
    color: theme.palette.text.primary,
    fontWeight: 'bold'
  },
  rateButton: {
    color: theme.palette.text.primary,
    backgroundColor: theme.palette.background.paper,
    '&:hover': {
      backgroundColor: '#e0e0e0'
    }
  }
}));

function RatingManager(props) {
  const { movie, user, addMovieReview } = props;
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  const handleOpen = () => {
    if (!user) {
      // Or redirect to login
      alert('You must be logged in to rate a movie.');
      return;
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setRating(0);
    setComment('');
  };

  const handleSubmit = () => {
    if (rating > 0) {
      addMovieReview(movie._id, { rating, comment });
      handleClose();
    } else {
      alert('Please select a rating.');
    }
  };

  const averageRating =
    movie.ratings.length > 0
      ? (movie.ratings.reduce((a, b) => a + b, 0) / movie.ratings.length).toFixed(1)
      : 'N/A';

  return (
    <>
      <Box className={classes.ratingContainer}>
        <Rating
          name="movie-rating"
          value={parseFloat(averageRating) / 2} // Convert 10-scale to 5-scale for display
          precision={0.1}
          readOnly
          emptyIcon={<StarBorderIcon style={{ color: theme.palette.text.secondary }} />}
        />
        <Typography className={classes.ratingText}>
          {averageRating}/10 ({movie.ratings.length} Votes)
        </Typography>
        <Button className={classes.rateButton} onClick={handleOpen}>
          Rate now
        </Button>
      </Box>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Rate {movie.title}</DialogTitle>
        <DialogContent>
          <Rating
            name="user-rating"
            value={rating}
            max={10}
            onChange={(event, newValue) => {
              setRating(newValue);
            }}
          />
          <TextField
            autoFocus
            margin="dense"
            label="Review (optional)"
            type="text"
            fullWidth
            multiline
            rows={4}
            value={comment}
            onChange={e => setComment(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

const mapStateToProps = state => ({
  user: state.authState.user
});

export default connect(mapStateToProps, { addMovieReview })(RatingManager);
