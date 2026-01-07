import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import moment from 'moment';
import { withStyles } from '@material-ui/core';
import { Avatar, Typography } from '@material-ui/core';
import {
  Portlet,
  PortletContent
} from '../../../../../components';

// Component styles
import styles from './styles';

class AccountProfile extends Component {
  render() {
    const { user, classes, className } = this.props;
    const safeUser = user || {};
    const rootClassName = classNames(classes.root, className);

    return (
      <Portlet className={rootClassName}>
        <PortletContent>
          <div className={classes.details}>
            <div className={classes.info}>
              <Typography variant="h2">{safeUser.name || 'User'}</Typography>
              <Typography className={classes.emailText} variant="body1">
                {safeUser.email || ''}
              </Typography>
              <Typography className={classes.dateText} variant="body1">
                Join at: {safeUser.createdAt ? moment(safeUser.createdAt).format('DD/MM/YYYY') : ''}
              </Typography>
            </div>
            <Avatar
              className={classes.avatar}
              src={'/images/avatars/avatar.png'}
            />
          </div>
        </PortletContent>
      </Portlet>
    );
  }
}

AccountProfile.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired
};

export default withStyles(styles)(AccountProfile);
