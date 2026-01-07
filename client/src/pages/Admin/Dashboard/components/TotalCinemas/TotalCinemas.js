import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Card, CardContent, Grid, Typography, Avatar } from '@material-ui/core';
import TheatersIcon from '@material-ui/icons/Theaters';

const useStyles = makeStyles(theme => ({
  root: {
    height: '100%',
    color: '#000000' // Ensure text is black
  },
  content: {
    alignItems: 'center',
    display: 'flex'
  },
  title: {
    fontWeight: 700,
    color: '#666666' // Dark gray for secondary text
  },
  avatar: {
    backgroundColor: theme.palette.error.main,
    height: 56,
    width: 56
  },
  icon: {
    height: 32,
    width: 32
  }
}));

const TotalCinemas = props => {
  const { className, cinemas } = props;

  const classes = useStyles();

  return (
    <Card className={classnames(classes.root, className)}>
      <CardContent>
        <Grid container justify="space-between">
          <Grid item>
            <Typography
              className={classes.title}
              color="textSecondary"
              gutterBottom
              variant="body2">
              TOTAL CINEMAS
            </Typography>
            <Typography variant="h3">{cinemas}</Typography>
          </Grid>
          <Grid item>
            <Avatar className={classes.avatar}>
              <TheatersIcon className={classes.icon} />
            </Avatar>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

TotalCinemas.propTypes = {
  className: PropTypes.string
};

export default TotalCinemas;
