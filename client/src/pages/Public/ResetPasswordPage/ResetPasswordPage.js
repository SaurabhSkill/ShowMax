import React, { useState } from 'react';
import { connect } from 'react-redux';
import { resetPassword } from '../../../store/actions/auth';
import { setAlert } from '../../../store/actions/alert';
import {
  Typography,
  TextField,
  Button,
  Grid,
  withStyles,
  IconButton
} from '@material-ui/core';
import { ArrowBack as ArrowBackIcon } from '@material-ui/icons';
import styles from './styles'; // We will create this file next

function ResetPasswordPage(props) {
  const { classes, history, location, resetPassword, setAlert } = props;
  const [formData, setFormData] = useState({
    otp: '',
    password: '',
    confirmPassword: ''
  });

  const { otp, password, confirmPassword } = formData;

  // Get email from the state passed by the ForgotPassword page
  const email = location.state ? location.state.email : '';

  if (!email) {
    // Redirect if no email is provided
    history.push('/forgot-password');
    return null;
  }

  const handleBack = () => {
    history.goBack();
  };

  const handleFieldChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleResetPassword = () => {
    if (!otp || !password || !confirmPassword) {
      return setAlert('Please fill in all fields.', 'error');
    }
    if (password !== confirmPassword) {
      return setAlert('Passwords do not match.', 'error');
    }
    resetPassword({ email, otp, password }, history);
  };

  return (
    <div className={classes.root}>
      <Grid container className={classes.grid}>
        <Grid item lg={5} className={classes.bgWrapper}>
          <div className={classes.bg} />
        </Grid>
        <Grid item lg={7} xs={12} className={classes.content}>
          <div className={classes.content}>
            <div className={classes.contentHeader}>
              <IconButton className={classes.backButton} onClick={handleBack}>
                <ArrowBackIcon />
              </IconButton>
            </div>
            <div className={classes.contentBody}>
              <form className={classes.form}>
                <Typography variant="h2" className={classes.title}>
                  Reset Your Password
                </Typography>
                <Typography variant="body1" className={classes.subtitle}>
                  Enter the OTP from your email and your new password.
                </Typography>
                <div className={classes.fields}>
                  <TextField
                    className={classes.textField}
                    label="Enter OTP"
                    name="otp"
                    value={otp}
                    onChange={handleFieldChange}
                    variant="outlined"
                    inputProps={{ maxLength: 6 }}
                  />
                  <TextField
                    className={classes.textField}
                    label="New Password"
                    name="password"
                    type="password"
                    value={password}
                    onChange={handleFieldChange}
                    variant="outlined"
                  />
                  <TextField
                    className={classes.textField}
                    label="Confirm New Password"
                    name="confirmPassword"
                    type="password"
                    value={confirmPassword}
                    onChange={handleFieldChange}
                    variant="outlined"
                  />
                </div>
                <Button
                  className={classes.submitButton}
                  color="primary"
                  onClick={handleResetPassword}
                  size="large"
                  variant="contained">
                  Reset Password
                </Button>
              </form>
            </div>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}

export default withStyles(styles)(
  connect(null, { resetPassword, setAlert })(ResetPasswordPage)
);
