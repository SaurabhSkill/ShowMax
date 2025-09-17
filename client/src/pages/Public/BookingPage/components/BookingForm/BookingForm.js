import React from 'react';
import { Grid, Box, TextField, MenuItem, Typography } from '@material-ui/core';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';

export default function BookingForm(props) {
  const {
    cinemas,
    showtimes,
    selectedCinema,
    onChangeCinema,
    selectedDate,
    onChangeDate,
    times,
    selectedTime,
    onChangeTime,
    ticketsCount,
    onChangeTickets,
    priceTier,
    onChangePriceTier
  } = props;

  const showtime = showtimes.find(
    showtime => showtime.cinemaId === selectedCinema
  );

  if (!cinemas.length)
    return (
      <Box
        display="flex"
        width={1}
        height={1}
        alignItems="center"
        justifyContent="center">
        <Typography align="center" variant="h2" color="inherit">
          No Cinema Available.
        </Typography>
      </Box>
    );

  return (
    <Grid container spacing={3}>
      <Grid item xs>
        <TextField
          fullWidth
          select
          value={selectedCinema}
          label="Select Cinema"
          variant="outlined"
          onChange={onChangeCinema}>
          {cinemas.map(cinema => (
            <MenuItem key={cinema._id} value={cinema._id}>
              {cinema.name}
            </MenuItem>
          ))}
        </TextField>
      </Grid>
      {showtime && (
        <Grid item xs>
          <MuiPickersUtilsProvider utils={MomentUtils}>
            <KeyboardDatePicker
              inputVariant="outlined"
              margin="none"
              fullWidth
              id="start-date"
              label="Start Date"
              minDate={new Date(showtime.startDate)}
              maxDate={new Date(showtime.endDate)}
              value={selectedDate}
              onChange={date => onChangeDate(date._d)}
              KeyboardButtonProps={{
                'aria-label': 'change date'
              }}
            />
          </MuiPickersUtilsProvider>
        </Grid>
      )}
      {selectedDate && (
        <Grid item xs>
          <TextField
            fullWidth
            select
            value={selectedTime}
            label="Select Time"
            variant="outlined"
            onChange={onChangeTime}>
            {times.map((time, index) => (
              <MenuItem key={time + '-' + index} value={time}>
                {time}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
      )}
      <Grid item xs>
        <TextField
          fullWidth
          type="number"
          value={ticketsCount}
          label="Number of Tickets"
          variant="outlined"
          inputProps={{ min: 1, max: 10 }}
          onChange={e => {
            console.log('=== BOOKING FORM TICKET CHANGE ===');
            console.log('Input value:', e.target.value);
            console.log('Parsed value:', Number(e.target.value));
            console.log('Current ticketsCount:', ticketsCount);
            onChangeTickets(Number(e.target.value));
            console.log('==================================');
          }}
        />
        <div style={{ fontSize: '12px', color: '#666', marginTop: '4px' }}>
          Debug: ticketsCount = {ticketsCount} (type: {typeof ticketsCount})
        </div>
      </Grid>
      <Grid item xs>
        <TextField
          fullWidth
          select
          value={priceTier}
          label="Seat Type"
          variant="outlined"
          onChange={e => onChangePriceTier(e.target.value)}>
          {['normal', 'executive', 'premium', 'classic'].map(t => (
            <MenuItem key={t} value={t}>{t.charAt(0).toUpperCase() + t.slice(1)}</MenuItem>
          ))}
        </TextField>
      </Grid>
    </Grid>
  );
}
