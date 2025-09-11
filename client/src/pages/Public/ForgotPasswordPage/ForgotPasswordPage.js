import React, { useState } from 'react';
import { connect } from 'react-redux';
import { forgotPassword } from '../../../store/actions/auth';
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

function ForgotPasswordPage(props) {
  const { classes, history, forgotPassword, setAlert } = props;
  const [email, setEmail] = useState('');

  const handleBack = () => {
    history.goBack();
  };

  const handleForgotPassword = () => {
    if (!email) {
      return setAlert('Please enter your email address.', 'error');
    }
    // Pass history to the action to handle redirection
    forgotPassword({ email }, history);
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
                  Forgot Password
                </Typography>
                <Typography variant="body1" className={classes.subtitle}>
                  Enter your email address below and we'll send you a code to reset your password.
                </Typography>
                <div className={classes.fields}>
                  <TextField
                    className={classes.textField}
                    label="Email address"
                    name="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    variant="outlined"
                  />
                </div>
                <Button
                  className={classes.submitButton}
                  color="primary"
                  onClick={handleForgotPassword}
                  size="large"
                  variant="contained">
                  Send OTP
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
  connect(null, { forgotPassword, setAlert })(ForgotPasswordPage)
);
