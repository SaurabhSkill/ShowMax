export default theme => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100vh',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(10) // Add this line to push content down
  },
  header: {
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3),
    marginBottom: theme.spacing(3),
    display: 'flex',
    alignItems: 'center'
  },
  movieIcon: {
    height: '50px',
    width: '50px',
    marginRight: theme.spacing(2)
  },
  movieTitle: {
    color: theme.palette.common.white,
    fontWeight: 'bold'
  },
  cinemaList: {
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3)
  },
  cinemaPaper: {
    marginBottom: theme.spacing(2),
    padding: theme.spacing(2),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: theme.palette.background.default
  },
  cinemaInfo: {
    color: theme.palette.text.primary
  },
  showtimeContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: theme.spacing(1)
  },
  showtimeButton: {
    borderColor: theme.palette.primary.main,
    color: theme.palette.primary.main,
    '&:hover': {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.common.white
    }
  }
});
