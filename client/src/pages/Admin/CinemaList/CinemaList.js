import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCinemas } from '../../../store/actions/cinemas';
import { getMovies } from '../../../store/actions/movies'; // Import getMovies
import { withStyles } from '@material-ui/core';
import { CircularProgress, Grid } from '@material-ui/core';
import { AddCinema, CinemaToolbar } from './components';
import { ResponsiveDialog } from '../../../components';
import styles from './styles';
import CinemaCard from '../../Public/components/CinemaCard/CinemaCard';
import { match } from '../../../utils';

class CinemaList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editCinema: null,
      openEditDialog: false,
      search: ''
    };
  }

  componentDidMount() {
    // Fetch both cinemas and movies when the page loads
    this.props.getCinemas();
    this.props.getMovies();
  }

  openEditDialog = cinema => {
    this.setState({ openEditDialog: true, editCinema: cinema });
  };

  CloseEditDialog = () => {
    this.setState({ openEditDialog: false, editCinema: null });
  };

  render() {
    const { classes, cinemas } = this.props;
    const { editCinema, search } = this.state;
    const filteredCinemas = match(search, cinemas, 'name');
    return (
      <div className={classes.root}>
        <CinemaToolbar
          search={this.state.search}
          onChangeSearch={e => this.setState({ search: e.target.value })}
        />
        <div className={classes.content}>
          {!filteredCinemas.length ? (
            <CircularProgress />
          ) : (
            <Grid container spacing={3}>
              {filteredCinemas.map(cinema => (
                <Grid
                  item
                  key={cinema._id}
                  lg={4}
                  md={6}
                  xs={12}
                  onClick={() => this.openEditDialog(cinema)}>
                  <CinemaCard cinema={cinema} />
                </Grid>
              ))}
            </Grid>
          )}
        </div>
        <ResponsiveDialog
          id="Edit-cinema"
          open={this.state.openEditDialog}
          handleClose={() => this.CloseEditDialog()}>
          <AddCinema
            editCinema={editCinema}
            handleClose={() => this.CloseEditDialog()}
          />
        </ResponsiveDialog>
      </div>
    );
  }
}

CinemaList.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapStateToProps = ({ cinemaState }) => ({
  cinemas: cinemaState.cinemas
});

// Add getMovies to the actions
const mapDispatchToProps = { getCinemas, getMovies };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(CinemaList));
