export default theme => ({
  card: {
    display: 'flex',
    flexDirection: 'column',
    width: '200px',
    backgroundColor: 'transparent',
    borderRadius: '12px',
    overflow: 'hidden',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    cursor: 'pointer',
    '&:hover': {
      transform: 'translateY(-8px)',
      boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)'
    }
  },
  header: {
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '280px',
    width: '100%',
    position: 'relative',
    borderRadius: '12px 12px 0 0'
  },
  body: {
    backgroundColor: 'transparent',
    color: '#FFFFFF',
    padding: '1rem 0',
    textAlign: 'left'
  },
  title: {
    fontSize: '1rem',
    fontWeight: 600,
    color: '#FFFFFF',
    marginBottom: '0.5rem',
    lineHeight: 1.3,
    display: '-webkit-box',
    WebkitLineClamp: 2,
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden'
  },
  bookButton: {
    backgroundColor: '#007BFF',
    color: '#FFFFFF',
    padding: '0.5rem 1rem',
    fontSize: '0.9rem',
    fontWeight: 600,
    borderRadius: '6px',
    textTransform: 'none',
    width: '100%',
    '&:hover': {
      backgroundColor: '#0056B3'
    }
  }
});
