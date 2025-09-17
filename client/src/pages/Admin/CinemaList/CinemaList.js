import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core';
import { 
  Box, 
  Grid, 
  Typography, 
  CircularProgress
} from '@material-ui/core';
import { Alert } from '../../../components';
import { ResponsiveDialog } from '../../../components';
import { getCinemas } from '../../../store/actions/cinemas';
import { AddCinema, CinemaToolbar } from './components';
import CinemaCard from '../../Public/components/CinemaCard';

const styles = theme => ({
  root: {
    padding: theme.spacing(3),
  },
  header: {
    marginBottom: theme.spacing(3),
  },
  loadingContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 200,
  },
  errorContainer: {
    margin: theme.spacing(2),
  },
  emptyState: {
    textAlign: 'center',
    padding: theme.spacing(4),
    color: theme.palette.text.secondary,
  },
  cinemaGrid: {
    marginTop: theme.spacing(2),
  },
});

class CinemaList extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      searchTerm: '',
      openEditDialog: false,
      editCinema: null,
    };
  }

  componentDidMount() {
    this.props.getCinemas();
  }

  handleSearchChange = (event) => {
    this.setState({ searchTerm: event.target.value });
  };

  handleAddClick = () => {
    this.setState({
      openEditDialog: true,
      editCinema: null,
    });
  };

  handleEditClick = (event, cinema) => {
    event.preventDefault();
    event.stopPropagation();
    
    this.setState({
      openEditDialog: true,
      editCinema: cinema,
    });
  };

  handleCloseDialog = () => {
    this.setState({
      openEditDialog: false,
      editCinema: null,
    });
    // Refresh the cinema list when dialog closes
    this.props.getCinemas();
  };

  handleRefresh = () => {
    this.props.getCinemas();
  };

  getFilteredCinemas = () => {
    const { cinemas } = this.props;
    const { searchTerm } = this.state;

    if (!searchTerm.trim()) {
      return cinemas;
    }

    const term = searchTerm.toLowerCase();
    return cinemas.filter(cinema =>
      cinema.name.toLowerCase().includes(term) ||
      cinema.city.toLowerCase().includes(term)
    );
  };

  render() {
    const { classes } = this.props;
    const { cinemas, loading, error } = this.props;
    const { openEditDialog, editCinema } = this.state;

    const filteredCinemas = this.getFilteredCinemas();

    return (
      <Box className={classes.root}>
        <Box className={classes.header}>
          <Typography variant="h4" gutterBottom>
            Cinema Management
          </Typography>
          <Typography variant="body1" color="textSecondary">
            Manage your cinema locations, pricing, and availability
          </Typography>
        </Box>

        <CinemaToolbar
          searchTerm={this.state.searchTerm}
          onSearchChange={this.handleSearchChange}
          onAddClick={this.handleAddClick}
          onRefresh={this.handleRefresh}
          loading={loading}
        />

        {error && (
          <Alert severity="error" className={classes.errorContainer}>
            {error}
          </Alert>
        )}

        {loading ? (
          <Box className={classes.loadingContainer}>
            <CircularProgress />
          </Box>
        ) : filteredCinemas.length === 0 ? (
          <Box className={classes.emptyState}>
            <Typography variant="h6" gutterBottom>
              {cinemas.length === 0 ? 'No cinemas found' : 'No cinemas match your search'}
            </Typography>
            <Typography variant="body2">
              {cinemas.length === 0 
                ? 'Get started by adding your first cinema location.'
                : 'Try adjusting your search terms.'
              }
            </Typography>
          </Box>
        ) : (
          <Grid container spacing={3} className={classes.cinemaGrid}>
            {filteredCinemas.map(cinema => (
              <Grid item key={cinema._id} lg={4} md={6} xs={12}>
                <CinemaCard
                  cinema={cinema}
                  onClick={this.handleEditClick}
                />
              </Grid>
            ))}
          </Grid>
        )}

        <ResponsiveDialog
          id="cinema-dialog"
          open={openEditDialog}
          handleClose={this.handleCloseDialog}
          buttonText={editCinema ? 'Save Changes' : 'Create Cinema'}>
          {openEditDialog && (
            <AddCinema
              editCinema={editCinema}
              handleClose={this.handleCloseDialog}
            />
          )}
        </ResponsiveDialog>
      </Box>
    );
  }
}

const mapStateToProps = (state) => ({
  cinemas: state.cinemaState.cinemas,
  loading: state.cinemaState.loading,
  error: state.cinemaState.error,
});

const mapDispatchToProps = {
  getCinemas,
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(CinemaList));
