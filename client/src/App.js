import React, { Component } from 'react';
import { ThemeProvider } from '@material-ui/core/styles';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from './store/actions';
import theme from './theme';
import { Alert } from './components';
import { pageCursors } from './utils';
import Routes from './Routes';
// Removed global stylesheet for designless baseline
import 'typeface-montserrat';
import { CssBaseline } from '@material-ui/core';

class App extends Component {
  componentDidMount() {
    store.dispatch(loadUser());
    pageCursors();
  }
  render() {
    return (
      <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
        <Provider store={store}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <Alert />
            <Routes />
            <div className="cursor" id="cursor" />
            <div className="cursor2" id="cursor2" />
            <div className="cursor3" id="cursor3" />
          </ThemeProvider>
        </Provider>
      </GoogleOAuthProvider>
    );
  }
}

// Google Client ID loaded from environment

export default App;
