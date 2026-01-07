import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core';
import { Grid } from '@material-ui/core';
import { AccountProfile, AccountDetails } from './components';

// Component styles
const styles = theme => ({
  root: {
    padding: theme.spacing(4)
  }
});

class Account extends Component {
  static propTypes = {
    user: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired
  };

  render() {
    const { classes, user } = this.props;
    return (
      <div className={classes.root}>
        <Grid container spacing={4}>
          <Grid item lg={4} md={6} xl={4} xs={12}>
            <AccountProfile user={user} />
          </Grid>
          <Grid item lg={8} md={6} xl={8} xs={12}>
            <AccountDetails user={user} />
          </Grid>
        </Grid>
      </div>
    );
  }
}

Account.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapStateToProps = ({ authState }) => ({
  user: authState.user
});

export default connect(mapStateToProps)(withStyles(styles)(Account));
