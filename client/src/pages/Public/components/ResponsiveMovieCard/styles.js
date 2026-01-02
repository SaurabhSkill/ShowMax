export default theme => ({
  movieCard: {
    position: 'relative',
    height: 350,
    width: 800,
    color: theme.palette.text.primary,
    backgroundColor: theme.palette.background.paper,
    borderRadius: 10,
    transition: 'all 0.4s',
    '&:hover': {
      transform: 'scale(1.02)',
      transition: 'all 0.4s'
    }
  },
  infoSection: {
    position: 'relative',
    width: '100%',
    height: '100%',
    backgroundBlendMode: 'multiply',
    background: 'linear-gradient(to right, rgba(255, 255, 255, 0.95) 50%, rgba(255, 255, 255, 0.8) 100%)',
    zIndex: 2,
    borderRadius: 10
  },
  movieHeader: {
    position: 'relative',
    padding: theme.spacing(3),
    height: '40%',
    width: '60%'
  },
  movieTitle: {
    fontSize: '25px',
    fontWeight: 600,
    textTransform: 'capitalize',
    color: theme.palette.text.primary
  },
  director: {
    color: theme.palette.cinema.accent.cyan,
    fontWeight: '600',
    fontSize: '16px',
    marginTop: theme.spacing(1)
  },
  duration: {
    display: 'inline-block',
    marginTop: theme.spacing(2),
    padding: theme.spacing(1),
    border: `1px solid ${theme.palette.divider}`,
    color: theme.palette.text.secondary,
    backgroundColor: theme.palette.background.default,
    borderRadius: '4px'
  },
  genre: {
    display: 'inline-block',
    color: theme.palette.cinema.accent.purple,
    marginLeft: theme.spacing(2),
    fontWeight: 500
  },
  description: {
    padding: theme.spacing(3),
    height: '50%',
    width: '50%'
  },
  descriptionText: {
    color: theme.palette.text.secondary,
    lineHeight: 1.5
  },
  footer: {
    height: '10%',
    paddingLeft: theme.spacing(2),
    paddingBottom: theme.spacing(3)
  },
  icons: {
    display: 'inline-block',
    cursor: 'pointer',
    color: theme.palette.text.disabled,
    margin: theme.spacing(0, 1),
    transition: 'all 0.3s',
    '&:hover': {
      color: theme.palette.primary.main,
      transform: 'scale(1.25)',
      transition: 'all 0.3s',
      transitionDelay: '0.15s'
    }
  },
  blurBackground: {
    position: 'absolute',
    top: 0,
    zIndex: 1,
    height: '100%',
    right: 0,
    backgroundSize: 'cover !important',
    borderRadius: 11,
    width: '80%',
    backgroundPosition: '-100% 10% !important'
  },

  [theme.breakpoints.down('sm')]: {
    fullWidth: { width: '100%' },
    movieCard: {
      width: '90%',
      margin: '0 auto',
      height: 'auto'
    },
    blurBackground: {
      width: '100%',
      backgroundPosition: '50% 50% !important'
    },
    movieHeader: {
      width: '100%',
      marginTop: theme.spacing(3)
    },
    description: {
      width: '100%'
    },
    infoSection: {
      background: 'linear-gradient(to top, rgba(255, 255, 255, 0.95) 50%, rgba(255, 255, 255, 0.8) 100%)',
      zIndex: 2,
      borderRadius: 10
    }
  }
});
