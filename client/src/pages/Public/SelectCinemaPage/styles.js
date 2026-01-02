export default theme => ({
  root: {
    backgroundColor: theme.palette.background.default,
    minHeight: '100vh',
    padding: '2rem 0'
  },
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 2rem'
  },
  pageTitle: {
    fontSize: '2.5rem',
    fontWeight: 700,
    color: theme.palette.text.primary,
    marginBottom: '2rem',
    textAlign: 'center'
  },
  dateSelector: {
    display: 'flex',
    gap: '1rem',
    marginBottom: '3rem',
    justifyContent: 'center',
    flexWrap: 'wrap'
  },
  dateButton: {
    padding: '0.8rem 1.5rem',
    borderRadius: '8px',
    border: `1px solid ${theme.palette.divider}`,
    backgroundColor: 'transparent',
    color: theme.palette.text.secondary,
    fontSize: '1rem',
    fontWeight: 500,
    textTransform: 'none',
    minWidth: '120px',
    '&:hover': {
      backgroundColor: theme.palette.background.paper,
      borderColor: theme.palette.primary.light
    },
    '&.selected': {
      backgroundColor: theme.palette.primary.main,
      borderColor: theme.palette.primary.main,
      color: theme.palette.primary.contrastText
    }
  },
  theaterCard: {
    backgroundColor: theme.palette.background.paper,
    borderRadius: '12px',
    padding: '1.5rem',
    marginBottom: '1.5rem',
    border: `1px solid ${theme.palette.divider}`,
    transition: 'all 0.3s ease',
    '&:hover': {
      backgroundColor: theme.palette.background.default,
      borderColor: theme.palette.primary.light,
      boxShadow: theme.palette.shadows.card
    }
  },
  theaterHeader: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '1rem'
  },
  moviePoster: {
    width: '60px',
    height: '90px',
    borderRadius: '8px',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    marginRight: '1rem',
    flexShrink: 0
  },
  theaterInfo: {
    flex: 1
  },
  theaterName: {
    fontSize: '1.3rem',
    fontWeight: 600,
    color: theme.palette.text.primary,
    marginBottom: '0.25rem'
  },
  theaterLocation: {
    fontSize: '1rem',
    color: theme.palette.text.secondary
  },
  showtimeGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
    gap: '0.75rem',
    marginTop: '1rem'
  },
  showtimeButton: {
    padding: '0.75rem 1rem',
    borderRadius: '8px',
    border: `1px solid ${theme.palette.divider}`,
    backgroundColor: 'transparent',
    color: theme.palette.text.secondary,
    fontSize: '0.9rem',
    fontWeight: 500,
    textTransform: 'none',
    transition: 'all 0.3s ease',
    '&:hover': {
      backgroundColor: theme.palette.primary.main,
      borderColor: theme.palette.primary.main,
      color: theme.palette.primary.contrastText,
      transform: 'translateY(-2px)'
    },
    '&.selected': {
      backgroundColor: theme.palette.primary.main,
      borderColor: theme.palette.primary.main,
      color: theme.palette.primary.contrastText
    },
    '&.unavailable': {
      backgroundColor: theme.palette.background.default,
      borderColor: theme.palette.divider,
      color: theme.palette.text.disabled,
      cursor: 'not-allowed',
      '&:hover': {
        backgroundColor: theme.palette.background.default,
        borderColor: theme.palette.divider,
        color: theme.palette.text.disabled,
        transform: 'none'
      }
    }
  },
  noCinemas: {
    textAlign: 'center',
    color: theme.palette.text.secondary,
    fontSize: '1.2rem',
    marginTop: '3rem'
  },
  [theme.breakpoints.down('sm')]: {
    container: {
      padding: '0 1rem'
    },
    pageTitle: {
      fontSize: '2rem'
    },
    dateSelector: {
      gap: '0.5rem'
    },
    dateButton: {
      padding: '0.6rem 1rem',
      fontSize: '0.9rem',
      minWidth: '100px'
    },
    theaterCard: {
      padding: '1rem'
    },
    showtimeGrid: {
      gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))',
      gap: '0.5rem'
    },
    showtimeButton: {
      padding: '0.6rem 0.8rem',
      fontSize: '0.8rem'
    }
  }
});
