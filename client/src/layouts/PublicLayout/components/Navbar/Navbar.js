import React, { Component, Fragment } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../../../../store/actions/auth';
import { setCity } from '../../../../store/actions/city';
import classnames from 'classnames';
import {
  withStyles,
  Typography,
  List,
  ListItem,
  FormControl,
  Select,
  MenuItem
} from '@material-ui/core';

// Component styles
import styles from './styles';
import UserPopover from './components/UserPopover/UserPopover';

class Navbar extends Component {
  state = {
    showMenu: false,
    scrollPos: window.pageYOffset
    // selectedCity has been removed from local state
  };

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll = () => {
    this.setState({
      scrollPos: window.pageYOffset
    });
  };

  // Handler now dispatches the Redux action
  handleCityChange = event => {
    this.props.setCity(event.target.value);
  };

  render() {
    const { showMenu, scrollPos } = this.state;
    const { classes, isAuth, user, logout, location, selectedCity } = this.props;
    const cities = ['mumbai', 'delhi', 'bangalore'];

    return (
      <Fragment>
        <nav
          className={classnames({
            [classes.navbar]: true,
            [classes.navbarColor]: scrollPos > 30
          })}>
          <Link className={classes.logoLink} to="/">
            <Typography className={classes.logo} variant="h2">
              SHOWMAX
            </Typography>
          </Link>
          
          <div className={classes.navLinks}>
            <Link 
              className={classnames(classes.navLink, {
                [classes.active]: location.pathname === '/'
              })} 
              to="/">
              Home
            </Link>
            <Link 
              className={classnames(classes.navLink, {
                [classes.active]: location.pathname.startsWith('/movie/category/nowShowing')
              })} 
              to="/movie/category/nowShowing">
              Now Showing
            </Link>
            <Link 
              className={classnames(classes.navLink, {
                [classes.active]: location.pathname.startsWith('/movie/category/comingSoon')
              })} 
              to="/movie/category/comingSoon">
              Upcoming Movies
            </Link>
            <Link 
              className={classnames(classes.navLink, {
                [classes.active]: location.pathname === '/cinemas'
              })} 
              to="/cinemas">
              Cinemas
            </Link>
          </div>

          <div className={classes.navAccount}>
            <FormControl>
              <Select
                value={selectedCity}
                onChange={this.handleCityChange}
                className={classes.citySelect}
                classes={{
                  icon: classes.citySelectIcon
                }}>
                {cities.map(city => (
                  <MenuItem key={city} value={city}>
                    {city.charAt(0).toUpperCase() + city.slice(1)}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <UserPopover logout={logout}>
              <List component="nav">
                {isAuth && (
                  <ListItem>
                    <Link
                      className={classes.navLink}
                      to={(user && user.role !== 'guest') ? '/admin/dashboard' : '/mydashboard'}>
                      Dashboard
                    </Link>
                  </ListItem>
                )}

                {isAuth ? (
                  <ListItem>
                    <Link className={classes.navLink} onClick={logout} to="/">
                      Logout
                    </Link>
                  </ListItem>
                ) : (
                  <ListItem>
                    <Link className={classes.navLink} to="/login">
                      Login
                    </Link>
                  </ListItem>
                )}
              </List>
            </UserPopover>
          </div>

          <div className={classes.navMobile}>
            <div 
              className={classes.navIcon}
              onClick={() => this.setState({ showMenu: !showMenu })}
            >
              <div className={classnames(classes.navIconLine, {
                [classes.navIconLine__left]: showMenu
              })} />
              <div className={classnames(classes.navIconLine, {
                [classes.navIconLine__right]: showMenu
              })} />
            </div>
          </div>
        </nav>
        
        <div
          className={classnames(classes.mobileMenu, {
            open: showMenu
          })}>
          <div className={classes.mobileMenuContent}>
            <ul className={classes.mobileNavLinks}>
              <li>
                <Link 
                  className={classes.mobileNavLink} 
                  to="/"
                  onClick={() => this.setState({ showMenu: false })}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link 
                  className={classes.mobileNavLink} 
                  to="/movie/category/nowShowing"
                  onClick={() => this.setState({ showMenu: false })}
                >
                  Movies
                </Link>
              </li>
              <li>
                <Link 
                  className={classes.mobileNavLink} 
                  to="/cinemas"
                  onClick={() => this.setState({ showMenu: false })}
                >
                  Theaters
                </Link>
              </li>
              {isAuth && (
                <li>
                  <Link 
                    className={classes.mobileNavLink}
                    to={(user && user.role !== 'guest') ? '/admin/dashboard' : '/mydashboard'}
                    onClick={() => this.setState({ showMenu: false })}
                  >
                    Dashboard
                  </Link>
                </li>
              )}
              <li>
                {isAuth ? (
                  <Link 
                    className={classes.mobileNavLink} 
                    onClick={() => {
                      logout();
                      this.setState({ showMenu: false });
                    }} 
                    to="/"
                  >
                    Logout
                  </Link>
                ) : (
                  <Link 
                    className={classes.mobileNavLink} 
                    to="/login"
                    onClick={() => this.setState({ showMenu: false })}
                  >
                    Login
                  </Link>
                )}
              </li>
            </ul>
          </div>
        </div>
      </Fragment>
    );
  }
}

// Map the Redux state to the component's props
const mapStateToProps = state => ({
  isAuth: state.authState.isAuthenticated,
  user: state.authState.user,
  selectedCity: state.cityState.selectedCity // Add this line
});

// Map the Redux actions to the component's props
const mapDispatchToProps = {
  logout,
  setCity // Add this line
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(withStyles(styles)(Navbar))
);
