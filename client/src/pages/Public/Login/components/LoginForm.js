import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/styles';
import { Button, TextField, Typography } from '@material-ui/core';
import { Link, withRouter } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import { login, googleLogin } from '../../../../store/actions';

const useStyles = makeStyles(theme => ({
  form: {
    paddingLeft: '100px',
    paddingRight: '100px',
    paddingBottom: '125px',
    flexBasis: '700px',
    [theme.breakpoints.down('sm')]: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2)
    }
  },
  title: {
    color: theme.palette.common.contrastText,
    marginTop: theme.spacing(3)
  },
  socialLogin: {
    margin: theme.spacing(4, 0)
  },
  fields: {
    marginTop: theme.spacing(2)
  },
  textField: {
    width: '100%',
    '& + & ': {
      marginTop: theme.spacing(2)
    }
  },
  loginButton: {
    marginTop: theme.spacing(2),
    width: '100%'
  },
  register: {
    marginTop: theme.spacing(2),
    color: theme.palette.text.secondary
  },
  registerUrl: {
    color: theme.palette.primary.main,
    fontWeight: 'bold',
    '&:hover': {
      color: theme.palette.primary.main
    }
  },
  forgotPassword: {
    marginTop: theme.spacing(1),
    textAlign: 'right'
  },
  forgotPasswordUrl: {
    color: theme.palette.text.secondary,
    '&:hover': {
      color: theme.palette.primary.main
    }
  }
}));

function LoginForm(props) {
  const { googleLogin, isAuthenticated, user, redirect, history } = props;
  const classes = useStyles();
  const [values, setValues] = useState({ username: '', password: '' });

  useEffect(() => {
    if (isAuthenticated && redirect) {
      if (user && user.role === 'superadmin')
        return history.push('/admin/dashboard');
      return history.push('/');
    }
  }, [isAuthenticated, user, redirect, history]);

  const handleFieldChange = e =>
    setValues({
      ...values,
      [e.target.name]: e.target.value
    });

  const handleGoogleSuccess = credentialResponse => {
    googleLogin({ tokenId: credentialResponse.credential }, history);
  };

  const handleGoogleFailure = () => {
    console.log('Login Failed');
  };

  return (
    <form className={classes.form}>
      <Typography className={classes.title} variant="h2">
        Sign in
      </Typography>

      <div className={classes.socialLogin}>
        <GoogleLogin
          onSuccess={handleGoogleSuccess}
          onError={handleGoogleFailure}
          useOneTap={false}
          ux_mode="popup"
          width="300"
        />
      </div>

      <div className={classes.fields}>
        <TextField
          className={classes.textField}
          label="username"
          name="username"
          onChange={event => handleFieldChange(event)}
          type="text"
          value={values.username}
          variant="outlined"
        />
        <TextField
          className={classes.textField}
          label="Password"
          name="password"
          onChange={event => handleFieldChange(event)}
          type="password"
          value={values.password}
          variant="outlined"
        />
      </div>

      <Typography className={classes.forgotPassword} variant="body2">
        <Link className={classes.forgotPasswordUrl} to="/forgot-password">
          Forgot password?
        </Link>
      </Typography>

      <Button
        className={classes.loginButton}
        color="primary"
        onClick={() => props.login(values.username, values.password, history)}
        size="large"
        variant="contained">
        Login now
      </Button>
      <Typography className={classes.register} variant="body1">
        Don't have an account?
        <Link className={classes.registerUrl} to="/register">
          register
        </Link>
      </Typography>
    </form>
  );
}

const mapStateToProps = state => ({
  isAuthenticated: state.authState.isAuthenticated,
  user: state.authState.user
});

// --- FIX: Removed 'facebookLogin' from the connect function ---
export default withRouter(connect(mapStateToProps, { login, googleLogin })(
  LoginForm
));
