import React from 'react';
import Popover from '@material-ui/core/Popover';
import IconButton from '@material-ui/core/IconButton';
import PersonIcon from '@material-ui/icons/Person';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  iconButton: {
    color: '#000000', // Black icon for white navbar
    '&:hover': {
      backgroundColor: 'rgba(0, 0, 0, 0.04)' // Light hover effect
    }
  },
  popover: {
    '& .MuiPaper-root': {
      backgroundColor: '#FFFFFF', // White background
      color: '#000000', // Black text
      border: '1px solid #E5E7EB', // Light border
      boxShadow: '0 10px 25px rgba(0, 0, 0, 0.15)' // Subtle shadow
    }
  }
}));

export default function UserPopover(props) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);

  function handleClick(event) {
    setAnchorEl(event.currentTarget);
  }

  function handleClose() {
    setAnchorEl(null);
  }

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <>
      <IconButton 
        aria-describedby={id} 
        onClick={handleClick}
        className={classes.iconButton}
      >
        <PersonIcon fontSize="large" />
      </IconButton>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        className={classes.popover}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center'
        }}>
        {props.children}
      </Popover>
    </>
  );
}
