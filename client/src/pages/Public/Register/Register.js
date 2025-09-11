import React from 'react';
import { connect } from 'react-redux';
import { register as registerAction } from '../../../store/actions/auth';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core';
import {
  Button,
  Checkbox,
  Grid,
  IconButton,
  TextField,
  Typography
} from '@material-ui/core';
import { ArrowBack as ArrowBackIcon } from '@material-ui/icons';
import styles from './styles';
import FileUpload from '../../../components/FileUpload/FileUpload';

class Register extends React.Component {
  state = {
    values: {
      name: '',
      username: '',
      email: '',
      phone: '',
      password: '',
      image: null,
      policy: false
    },
    errors: {}
  };


  handleBack = () => {
    this.props.history.goBack();
  };

  handleFieldChange = (field, value) => {
    this.setState(prevState => ({
      values: { ...prevState.values, [field]: value },
      errors: { ...prevState.errors, [field]: undefined }
    }));
  };

  handleRegister = async (event) => {
    // 1. Stop the browser from reloading the page
    event.preventDefault();

    const { values } = this.state;

    // 2. Basic validation
    const newErrors = {};
    if (!values.name) newErrors.name = 'Full name is required';
    if (!values.username) newErrors.username = 'User name is required';
    if (!values.email) newErrors.email = 'Email address is required';
    if (!values.phone) newErrors.phone = 'Mobile phone is required';
    if (!values.password) newErrors.password = 'Password is required';
    if (Object.keys(newErrors).length > 0) {
      return this.setState({ errors: newErrors });
    }

    try {
      await this.props.registerAction(values, this.props.history);
    } catch (e) {
      // Errors are handled in the action
    }
  };

  render() {
    const { classes } = this.props;
    const { values, errors } = this.state;
    const isValid = values.policy;

    return (
      <div className={classes.root}>
        <Grid className={classes.grid} container>
          <Grid className={classes.bgWrapper} item lg={5}>
            <div className={classes.bg} />
          </Grid>
          <Grid className={classes.content} item lg={7} xs={12}>
            <div className={classes.content}>
              <div className={classes.contentHeader}>
                <IconButton className={classes.backButton} onClick={this.handleBack}>
                  <ArrowBackIcon />
                </IconButton>
              </div>
              <div className={classes.contentBody}>
                {/* Use onSubmit for the form to ensure preventDefault works */}
                <form className={classes.form} onSubmit={this.handleRegister}>
                  <Typography className={classes.title} variant="h2">
                    Create new account
                  </Typography>
                  <Typography className={classes.subtitle} variant="body1">
                    Use your email to create new account... it's free.
                  </Typography>
                  <div className={classes.fields}>
                    <TextField
                      className={classes.textField}
                      label="Full name"
                      name="name"
                      value={values.name}
                      onChange={event => this.handleFieldChange('name', event.target.value)}
                      variant="outlined"
                      error={!!errors.name}
                      helperText={errors.name}
                    />
                    <TextField
                      className={classes.textField}
                      label="User name"
                      name="username"
                      value={values.username}
                      onChange={event => this.handleFieldChange('username', event.target.value)}
                      variant="outlined"
                      error={!!errors.username}
                      helperText={errors.username}
                    />
                    <TextField
                      className={classes.textField}
                      label="Email address"
                      name="email"
                      value={values.email}
                      onChange={event => this.handleFieldChange('email', event.target.value)}
                      variant="outlined"
                      error={!!errors.email}
                      helperText={errors.email}
                    />
                    <TextField
                      className={classes.textField}
                      label="Mobile Phone"
                      name="phone"
                      value={values.phone}
                      variant="outlined"
                      onChange={event => this.handleFieldChange('phone', event.target.value)}
                      error={!!errors.phone}
                      helperText={errors.phone}
                    />
                    <TextField
                      className={classes.textField}
                      label="Password"
                      type="password"
                      value={values.password}
                      variant="outlined"
                      onChange={event => this.handleFieldChange('password', event.target.value)}
                      error={!!errors.password}
                      helperText={errors.password}
                    />
                    <FileUpload
                      className={classes.upload}
                      file={values.image}
                      onUpload={event => {
                        const file = event.target.files[0];
                        this.handleFieldChange('image', file);
                      }}
                    />
                    <div className={classes.policy}>
                      <Checkbox
                        checked={values.policy}
                        className={classes.policyCheckbox}
                        color="primary"
                        name="policy"
                        onChange={() => this.handleFieldChange('policy', !values.policy)}
                      />
                      <Typography className={classes.policyText} variant="body1">
                        I have read the &nbsp;
                        <Link className={classes.policyUrl} to="#">
                          Terms and Conditions
                        </Link>
                        .
                      </Typography>
                    </div>
                  </div>
                  <Button
                    className={classes.registerButton}
                    color="primary"
                    disabled={!isValid}
                    type="submit"
                    size="large"
                    variant="contained">
                    Register now
                  </Button>
                  <Typography className={classes.login} variant="body1">
                    Have an account?{' '}
                    <Link className={classes.loginUrl} to="/login">
                      Login
                    </Link>
                  </Typography>
                </form>
              </div>
            </div>
          </Grid>
        </Grid>
      </div>
    );
  }
}

Register.propTypes = {
  classes: PropTypes.object.isRequired
};

// We only connect to Redux for register action.
export default withStyles(styles)(
  withRouter(connect(null, { registerAction })(Register))
);

