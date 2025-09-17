import React from 'react';
import { makeStyles } from '@material-ui/core';
import { Box, Button, TextField } from '@material-ui/core';
import { Add as AddIcon, Refresh as RefreshIcon } from '@material-ui/icons';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: theme.spacing(2),
    backgroundColor: theme.palette.background.paper,
    borderBottom: `1px solid ${theme.palette.divider}`,
    flexWrap: 'wrap',
    gap: theme.spacing(2),
  },
  searchBox: {
    minWidth: 300,
    [theme.breakpoints.down('sm')]: {
      minWidth: 200,
    },
  },
  buttonGroup: {
    display: 'flex',
    gap: theme.spacing(1),
  },
}));

function CinemaToolbar(props) {
  const classes = useStyles();
  const { 
    searchTerm, 
    onSearchChange, 
    onAddClick, 
    onRefresh,
    loading = false 
  } = props;

  return (
    <Box className={classes.root}>
      <TextField
        className={classes.searchBox}
        placeholder="Search cinemas..."
        value={searchTerm}
        onChange={onSearchChange}
        variant="outlined"
        size="small"
        disabled={loading}
      />
      <Box className={classes.buttonGroup}>
        <Button
          onClick={onRefresh}
          color="secondary"
          size="small"
          variant="outlined"
          startIcon={<RefreshIcon />}
          disabled={loading}>
          Refresh
        </Button>
        <Button
          onClick={onAddClick}
          color="primary"
          size="small"
          variant="contained"
          startIcon={<AddIcon />}
          disabled={loading}>
          Add Cinema
        </Button>
      </Box>
    </Box>
  );
}

export default CinemaToolbar;
