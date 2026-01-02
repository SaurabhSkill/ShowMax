import React, { Fragment } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Box } from '@material-ui/core';
import theme from '../../../../../theme';
const useStyles = makeStyles(theme => ({
  row: {
    display: 'flex',
    justifyContent: 'center',
    width: '100%'
  },
  seat: {
    cursor: 'pointer',
    color: theme.palette.text.primary,
    borderRadius: 2,
    padding: theme.spacing(2),
    margin: theme.spacing(0.5),
    fontWeight: 600,
    border: `1px solid ${theme.palette.divider}`,
    '&:hover': {
      background: theme.palette.success.main,
      color: theme.palette.success.contrastText
    }
  },
  seatInfoContainer: {
    width: '50%',
    margin: 'auto',
    display: 'flex',
    alignItems: 'center',
    textAlign: 'center',
    color: theme.palette.text.primary
  },

  seatInfo: { 
    marginRight: theme.spacing(2),
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(1)
  },

  seatInfoLabel: {
    marginRight: theme.spacing(1),
    display: 'inline-block',
    width: 16,
    height: 16,
    borderRadius: 2,
    border: `1px solid ${theme.palette.divider}`
  },

  [theme.breakpoints.down('sm')]: {
    seat: { padding: theme.spacing(1.2), margin: theme.spacing(0.5) },
    seatInfoContainer: { width: '100%', display: 'block' },
    seatInfo: { marginTop: theme.spacing(2) }
  }
}));

export default function BookingSeats(props) {
  const classes = useStyles(props);
  const { seats, onSelectSeat } = props;

  return (
    <Fragment>
      <Box width={1} pt={15}>
        {seats.length > 0 &&
          seats.map((seatRows, indexRow) => (
            <div key={indexRow} className={classes.row}>
              {seatRows.map((seat, index) => (
                <Box
                  key={`seat-${index}`}
                  onClick={() => onSelectSeat(indexRow, index)}
                  className={classes.seat}
                  bgcolor={
                    seat === 1
                      ? theme.palette.cinema.space[400] // Available seat - medium grey
                      : seat === 2
                      ? theme.palette.success.main // Selected seat - green
                      : seat === 3
                      ? theme.palette.info.main // Recommended seat - blue
                      : theme.palette.cinema.space[600] // Reserved seat - dark grey
                  }
                  style={{
                    color: seat === 1 ? theme.palette.text.primary : theme.palette.common.white
                  }}>
                  {index + 1}
                </Box>
              ))}
            </div>
          ))}
      </Box>
      <Box width={1} mt={10}>
        <div className={classes.seatInfoContainer}>
          <div className={classes.seatInfo}>
            <div
              className={classes.seatInfoLabel}
              style={{ background: theme.palette.cinema.space[600] }}></div>
            <span>Available Seat</span>
          </div>
          <div className={classes.seatInfo}>
            <div
              className={classes.seatInfoLabel}
              style={{ background: theme.palette.cinema.space[400] }}></div>
            <span>Reserved Seat</span>
          </div>
          <div className={classes.seatInfo}>
            <div
              className={classes.seatInfoLabel}
              style={{ background: theme.palette.success.main }}></div>
            <span>Selected Seat</span>
          </div>
          <div className={classes.seatInfo}>
            <div
              className={classes.seatInfoLabel}
              style={{ background: theme.palette.info.main }}></div>
            <span>Recommended Seat</span>
          </div>
        </div>
      </Box>
    </Fragment>
  );
}
