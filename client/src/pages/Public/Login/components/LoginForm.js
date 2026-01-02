import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/styles';
import { Button, TextField, Typography, Box, InputAdornment, IconButton } from '@material-ui/core';
import { 
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon,
  Person as PersonIcon,
  Email as EmailIcon,
  Lock as LockIcon
} from '@material-ui/icons';
import { Link, withRouter } from 'react-router-dom';
import { login } from '../../../../store/actions';

const useStyles = makeStyles(theme => ({
  form: {
    width: '100%',
    maxWidth: '400px',
    margin: '0 auto'
  },
  
  title: {
    fontSize: '2rem',
    fontWeight: 700,
    color: '#1F2937',
    marginBottom: '0.5rem',
    textAlign: 'center',
    letterSpacing: '-0.01em'
  },
  
  subtitle: {
    color: '#4B5563',
    fontSize: '1rem',
    textAlign: 'center',
    marginBottom: '2.5rem',
    fontWeight: 400
  },
  
  fields: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem',
    marginBottom: '1rem'
  },
  
  textField: {
    '& .MuiOutlinedInput-root': {
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      borderRadius: '12px',
      border: '1px solid rgba(218, 165, 32, 0.2)',
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      
      '& fieldset': {
        border: 'none'
      },
      
      '&:hover': {
        backgroundColor: 'rgba(0, 0, 0, 0.9)',
        border: '1px solid #DAA520',
        transform: 'translateY(-1px)',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
      },
      
      '&.Mui-focused': {
        backgroundColor: 'rgba(0, 0, 0, 0.9)',
        border: '1px solid #DAA520',
        boxShadow: '0 0 0 3px rgba(218, 165, 32, 0.2), 0 4px 12px rgba(0, 0, 0, 0.15)',
        transform: 'translateY(-1px)'
      }
    },
    
    '& .MuiInputLabel-root': {
      color: '#4B5563',
      fontSize: '0.9rem',
      fontWeight: 500,
      transform: 'translate(3.5rem, 1rem) scale(1)',
      
      '&.Mui-focused, &.MuiInputLabel-shrink': {
        color: '#DAA520',
        transform: 'translate(3.5rem, -0.5rem) scale(0.75)'
      }
    },
    
    '& .MuiOutlinedInput-input': {
      color: '#FFFFFF',
      fontSize: '1rem',
      padding: '1rem 1rem 1rem 3.5rem',
      
      '&::placeholder': {
        color: '#9CA3AF',
        opacity: 1
      }
    }
  },
  
  inputIcon: {
    position: 'absolute',
    left: '1.2rem',
    top: '50%',
    transform: 'translateY(-50%)',
    color: '#FFFFFF',
    fontSize: '1.1rem',
    pointerEvents: 'none',
    zIndex: 1
  },
  
  passwordToggle: {
    color: '#4B5563',
    '&:hover': {
      color: '#DAA520'
    }
  },
  
  forgotPassword: {
    textAlign: 'right',
    marginBottom: '2rem'
  },
  
  forgotPasswordLink: {
    color: '#4B5563',
    textDecoration: 'none',
    fontSize: '0.9rem',
    fontWeight: 500,
    transition: 'color 0.3s ease',
    
    '&:hover': {
      color: '#DAA520'
    }
  },
  
  loginButton: {
    width: '100%',
    padding: '1rem',
    fontSize: '1rem',
    fontWeight: 600,
    borderRadius: '12px',
    textTransform: 'none',
    background: 'linear-gradient(135deg, #DAA520, #FFD700)',
    color: theme.palette.primary.contrastText,
    border: 'none',
    boxShadow: '0 4px 16px rgba(218, 165, 32, 0.4)',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    marginBottom: '2rem',
    
    '&:hover': {
      background: 'linear-gradient(135deg, #FFD700, #DAA520)',
      transform: 'translateY(-2px)',
      boxShadow: '0 6px 20px rgba(218, 165, 32, 0.6)'
    },
    
    '&:active': {
      transform: 'translateY(0)',
      boxShadow: '0 2px 8px rgba(218, 165, 32, 0.4)'
    },
    
    '&:disabled': {
      background: '#F5F5F5',
      color: '#9CA3AF',
      transform: 'none',
      boxShadow: 'none'
    }
  },
  
  divider: {
    display: 'flex',
    alignItems: 'center',
    margin: '2rem 0',
    
    '&::before, &::after': {
      content: '""',
      flex: 1,
      height: '1px',
      background: 'rgba(255, 255, 255, 0.1)'
    }
  },
  
  dividerText: {
    color: '#6C7293',
    fontSize: '0.85rem',
    padding: '0 1rem',
    fontWeight: 500
  },
  
  register: {
    textAlign: 'center',
    color: '#4B5563',
    fontSize: '0.95rem',
    fontWeight: 400
  },
  
  registerLink: {
    color: '#DAA520',
    textDecoration: 'none',
    fontWeight: 600,
    marginLeft: '0.5rem',
    transition: 'color 0.3s ease',
    
    '&:hover': {
      color: '#B8860B'
    }
  },
  
  // Input field wrapper for icon positioning
  inputWrapper: {
    position: 'relative'
  }
}));

function LoginForm(props) {
  const { isAuthenticated, user, redirect, history } = props;
  const classes = useStyles();
  const [values, setValues] = useState({ username: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

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

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  // Determine if the input looks like an email
  const isEmailInput = values.username.includes('@');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!values.username || !values.password) return;
    
    setIsLoading(true);
    try {
      await props.login(values.username, values.password, history);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form className={classes.form} onSubmit={handleSubmit}>
      <Typography className={classes.title} variant="h2">
        Sign In
      </Typography>
      
      <Typography className={classes.subtitle}>
        Enter your credentials to access your account
      </Typography>

      <div className={classes.fields}>
        <div className={classes.inputWrapper}>
          {isEmailInput ? <EmailIcon className={classes.inputIcon} /> : <PersonIcon className={classes.inputIcon} />}
          <TextField
            className={classes.textField}
            label="Username or Email"
            name="username"
            onChange={handleFieldChange}
            type="text"
            value={values.username}
            variant="outlined"
            placeholder="Enter your username or email"
            required
            fullWidth
          />
        </div>
        
        <div className={classes.inputWrapper}>
          <LockIcon className={classes.inputIcon} />
          <TextField
            className={classes.textField}
            label="Password"
            name="password"
            onChange={handleFieldChange}
            type={showPassword ? 'text' : 'password'}
            value={values.password}
            variant="outlined"
            placeholder="Enter your password"
            required
            fullWidth
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    className={classes.passwordToggle}
                    onClick={handleTogglePassword}
                    edge="end"
                    aria-label="toggle password visibility"
                  >
                    {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                  </IconButton>
                </InputAdornment>
              )
            }}
          />
        </div>
      </div>

      <Box className={classes.forgotPassword}>
        <Link className={classes.forgotPasswordLink} to="/forgot-password">
          Forgot password?
        </Link>
      </Box>

      <Button
        className={classes.loginButton}
        type="submit"
        disabled={isLoading || !values.username || !values.password}
        size="large"
        variant="contained"
      >
        {isLoading ? 'Signing in...' : 'Sign In'}
      </Button>
      
      <Typography className={classes.register}>
        Don't have an account?
        <Link className={classes.registerLink} to="/register">
          Sign up
        </Link>
      </Typography>
    </form>
  );
}

const mapStateToProps = state => ({
  isAuthenticated: state.authState.isAuthenticated,
  user: state.authState.user
});

export default withRouter(connect(mapStateToProps, { login })(
  LoginForm
));
