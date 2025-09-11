import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../../../../store/actions/auth';
import { setCity } from '../../../../store/actions/city'; // Import the new action
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
    // Get selectedCity from props, which are mapped from Redux state
    const { classes, isAuth, user, logout, selectedCity } = this.props;
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
              ShowMax
            </Typography>
          </Link>
          <div className={classes.navLinks}>
            <Link className={classes.navLink} to="/">
              Home
            </Link>
            <Link className={classes.navLink} to="/movie/category/nowShowing">
              Now Showing
            </Link>
            <Link className={classes.navLink} to="/movie/category/comingSoon">
              Coming Soon
            </Link>
            <Link className={classes.navLink} to="/cinemas">
              Cinemas
            </Link>
          </div>

          <div className={classes.navAccount}>
            <FormControl>
              <Select
                value={selectedCity} // Use selectedCity from props
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
                {user && (
                  <ListItem>
                    <Link
                      className={classes.navLink}
                      to={
                        user.role !== 'guest'
                          ? '/admin/dashboard'
                          : '/mydashboard'
                      }>
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
            {/* Mobile menu icon */}
          </div>
        </nav>
        <div
          className={classnames({
            [classes.navActive]: showMenu,
            [classes.nav]: true
          })}>
          {/* Mobile menu content */}
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Navbar));
