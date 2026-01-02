export default theme => ({
  root: {
    borderBottom: `1px solid ${theme.palette.border}`,
    boxShadow: theme.shadows[10],
    backgroundColor: theme.palette.background.paper,
    display: 'flex',
    alignItems: 'center',
    height: theme.topBar.height,
    zIndex: theme.zIndex.appBar
  },
  toolbar: {
    minHeight: 'auto',
    width: '100%',
    paddingLeft: 0
  },
  brandWrapper: {
    background: theme.palette.primary.main,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '271px',
    height: theme.topBar.height,
    flexShrink: 0
  },
  logo: {
    width: 'calc(100% - 160px)',
    maxWidth: '100%',
    margin: 'auto',
    fontFamily: 'Montserrat,sans-serif',
    fontSize: '22px',
    fontWeight: 700,
    letterSpacing: 3,
    color: theme.palette.primary.contrastText
  },
  title: {
    marginLeft: theme.spacing(3),
    textTransform: 'uppercase',
    textDecoration: 'none',
    fontSize: '14px',
    color: theme.palette.text.primary
  },
  menuButton: {
    color: theme.palette.primary.contrastText,
    marginLeft: '-4px'
  },
  signOutButton: {
    marginLeft: 'auto',
    color: theme.palette.text.primary
  }
});
