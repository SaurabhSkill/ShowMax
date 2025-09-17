import React from 'react';
import { Divider, Typography, Link } from '@material-ui/core';
import useStyles from './styles';

export default function Footer() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Divider />
      <Typography className={classes.copyright} variant="body1">
        &copy; Saurabh Gupta. 2003
      </Typography>
      <Typography variant="caption">
        Crafted with love |{' '}
        <Link href="https://github.com/SaurabhSkill" target="_blank" rel="noopener">
          @SaurabhSkill
        </Link>
      </Typography>
    </div>
  );
}
