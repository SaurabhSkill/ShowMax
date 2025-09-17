import React from 'react';
import classNames from 'classnames';
import { makeStyles } from '@material-ui/core';
import { Typography } from '@material-ui/core';
import { Paper } from '../../../../components';
import { EventSeat } from '@material-ui/icons';

const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: '100%',
    paddingBottom: theme.spacing(2),
    cursor: 'pointer',
    transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
    '&:hover': {
      transform: 'translateY(-4px)',
      boxShadow: '0 20px 60px 0 rgba(16, 36, 94, 0.3)',
    },
  },
  imageWrapper: {
    height: '200px',
    margin: '0 auto',
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  image: {
    width: '100%',
    height: '100%',
    'object-fit': 'cover'
  },
  details: { 
    padding: theme.spacing(3) 
  },
  name: {
    fontSize: '18px',
    lineHeight: '21px',
    marginTop: theme.spacing(2),
    textTransform: 'capitalize',
    fontWeight: 'bold',
    color: theme.palette.text.primary
  },
  city: {
    lineHeight: '16px',
    height: theme.spacing(4),
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    color: theme.palette.text.secondary,
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(2)
  },
  stats: {
    display: 'flex',
    alignItems: 'center',
    paddingTop: theme.spacing(1),
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3)
  },
  eventIcon: {
    color: theme.palette.text.secondary
  },
  eventText: {
    marginLeft: theme.spacing(1),
    color: theme.palette.text.secondary,
    fontSize: '14px'
  },
  priceTiers: {
    padding: theme.spacing(2),
    backgroundColor: theme.palette.grey[50],
    margin: theme.spacing(1),
    borderRadius: theme.spacing(1)
  },
  priceTier: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: theme.spacing(0.5),
    '&:last-child': {
      marginBottom: 0
    }
  },
  priceLabel: {
    fontSize: '12px',
    color: theme.palette.text.secondary,
    textTransform: 'capitalize'
  },
  priceValue: {
    fontSize: '12px',
    fontWeight: 'bold',
    color: theme.palette.primary.main
  }
}));

function CinemaCard(props) {
  const classes = useStyles(props);
  const { className, cinema, onClick } = props;
  
  const cinemaImage = cinema && cinema.image
    ? cinema.image
    : 'https://source.unsplash.com/featured/?cinema';

  const rootClassName = classNames(classes.root, className);
  
  const handleClick = (event) => {
    if (onClick) {
      onClick(event, cinema);
    }
  };

  return (
    <Paper 
      className={rootClassName}
      onClick={handleClick}
      style={{ cursor: 'pointer' }}>
      <div className={classes.imageWrapper}>
        <img alt="cinema" className={classes.image} src={cinemaImage} />
      </div>
      <div className={classes.details}>
        <Typography className={classes.name} variant="h4">
          {cinema.name}
        </Typography>
        <Typography className={classes.city} variant="body1">
          {cinema.city}
        </Typography>
      </div>
      <div className={classes.stats}>
        <EventSeat className={classes.eventIcon} />
        <Typography className={classes.eventText} variant="body2">
          {cinema.seatsAvailable} seats Available
        </Typography>
      </div>
      {cinema.priceTiers && (
        <div className={classes.priceTiers}>
          <div className={classes.priceTier}>
            <span className={classes.priceLabel}>Normal:</span>
            <span className={classes.priceValue}>₹{cinema.priceTiers.normal || 0}</span>
          </div>
          <div className={classes.priceTier}>
            <span className={classes.priceLabel}>Executive:</span>
            <span className={classes.priceValue}>₹{cinema.priceTiers.executive || 0}</span>
          </div>
          <div className={classes.priceTier}>
            <span className={classes.priceLabel}>Premium:</span>
            <span className={classes.priceValue}>₹{cinema.priceTiers.premium || 0}</span>
          </div>
          <div className={classes.priceTier}>
            <span className={classes.priceLabel}>Classic:</span>
            <span className={classes.priceValue}>₹{cinema.priceTiers.classic || 0}</span>
          </div>
        </div>
      )}
    </Paper>
  );
}

export default CinemaCard;
