import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { verifyOtp } from '../../../store/actions/auth';
import { setAlert } from '../../../store/actions/alert';
import { withRouter } from 'react-router-dom';
import {
  Typography,
  TextField,
  Button,
  Grid,
  withStyles
} from '@material-ui/core';
import styles from './styles'; // We will create this file next

function VerifyOtpPage(props) {
  const { classes, history, location, verifyOtp, setAlert, isAuthenticated } = props;
  const [otp, setOtp] = useState('');

  // Redirect if user is already logged in
  useEffect(() => {
    if (isAuthenticated) {
      history.push('/');
    }
  }, [isAuthenticated, history]);

  // Get email from query string
  const searchParams = new URLSearchParams(location.search || '');
  const email = searchParams.get('email') || '';

  if (!email) {
    history.push('/register');
    return null;
  }

  const handleVerify = () => {
    if (otp.length !== 6 || !/^\d{6}$/.test(otp)) {
      return setAlert('Please enter a valid 6-digit OTP.', 'error');
    }
    verifyOtp({ email, otp }, history);
  };

  return (
    <div className={classes.root}>
      <Grid container className={classes.grid}>
        <Grid item lg={5} className={classes.bgWrapper}>
          <div className={classes.bg} />
        </Grid>
        <Grid item lg={7} xs={12} className={classes.content}>
          <div className={classes.content}>
            <div className={classes.contentBody}>
              <form className={classes.form}>
                <Typography variant="h2" className={classes.title}>
                  Verify Your Account
                </Typography>
                <Typography variant="body1" className={classes.subtitle}>
                  A 6-digit verification code has been sent to your email at{' '}
                  <strong>{email}</strong>.
                </Typography>
                <div className={classes.fields}>
                  <TextField
                    className={classes.textField}
                    label="Enter OTP"
                    name="otp"
                    value={otp}
                    onChange={e => setOtp(e.target.value)}
                    variant="outlined"
                    inputProps={{ maxLength: 6 }}
                  />
                </div>
                <Button
                  className={classes.verifyButton}
                  color="primary"
                  onClick={handleVerify}
                  size="large"
                  variant="contained">
                  Verify and Login
                </Button>
              </form>
            </div>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}

const mapStateToProps = state => ({
  isAuthenticated: state.authState.isAuthenticated
});

export default withStyles(styles)(
  withRouter(connect(mapStateToProps, { verifyOtp, setAlert })(VerifyOtpPage))
);
