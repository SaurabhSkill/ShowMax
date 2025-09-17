// @ts-nocheck
import React from 'react';
import { makeStyles, CircularProgress, Typography } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: { 
    background: theme.palette.common.black, 
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  spinner: {
    color: theme.palette.primary.main,
    marginBottom: theme.spacing(2)
  }
}));

export default () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <CircularProgress className={classes.spinner} size={60} />
      <Typography variant="h6" style={{ color: 'white' }}>
        Loading...
      </Typography>
    </div>
  );
};
