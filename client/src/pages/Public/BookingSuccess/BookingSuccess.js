import React, { useEffect, useState } from 'react';
import { withStyles, Box, Typography, Button, Paper as MuiPaper } from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';

const styles = theme => ({
  root: {
    padding: theme.spacing(4),
    minHeight: '70vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  paper: {
    maxWidth: 640,
    width: '100%',
    padding: theme.spacing(4),
    textAlign: 'center'
  },
  qr: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    background: '#fff',
    padding: theme.spacing(1),
    borderRadius: 4
  }
});

function BookingSuccess(props) {
  const { classes, match } = props;
  const [reservation, setReservation] = useState(null);
  const id = match.params.id;

  useEffect(() => {
    let isMounted = true;
    const fetchData = async () => {
      try {
        const res = await fetch(`/reservations/${id}`);
        const data = await res.json();
        if (isMounted && res.ok) setReservation(data);
        // If QR was recently placed in Redux and exposed via API, you could fetch separately.
      } catch (_) {}
    };
    fetchData();
    return () => { isMounted = false; };
  }, [id]);

  return (
    <div className={classes.root}>
      <MuiPaper className={classes.paper} elevation={3}>
        <Typography variant="h4" gutterBottom>
          Booking Confirmed
        </Typography>
        <Typography variant="body1" gutterBottom>
          Your reservation has been confirmed. Show this pass at the cinema.
        </Typography>
        {/* QR image can be added here if exposed by API */}
        {reservation && (
          <Box mt={2}>
            <Typography variant="subtitle1">Reservation ID: {reservation._id}</Typography>
            <Typography variant="subtitle1">Time: {reservation.startAt}</Typography>
            <Typography variant="subtitle1">Tickets: {reservation.ticketsCount}</Typography>
          </Box>
        )}
        <Box mt={3}>
          <Button component={RouterLink} to="/" color="primary" variant="contained">
            Back to Home
          </Button>
        </Box>
      </MuiPaper>
    </div>
  );
}

export default withStyles(styles)(BookingSuccess);


