import React from 'react';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import { makeStyles } from '@material-ui/core/styles';

import BusinessRoundedIcon from '@material-ui/icons/BusinessRounded';
import EmailRoundedIcon from '@material-ui/icons/EmailRounded';

import style from './style';

const UserInfo = props => {
  const { user, logout } = props;
  const classes = makeStyles(style)();

  const fullName = user.lastName
    ? user.firstName + ' ' + user.lastName
    : user.firstName;

  return (
    <Card raised={true}>
      <CardContent>
        <Grid container justify="center" className={classes.userInfoElement}>
          <Avatar>{fullName[0].toUpperCase()}</Avatar>
        </Grid>
        <Grid container justify="center" className={classes.userInfoElement}>
          <Typography variant="h5">{fullName}</Typography>
        </Grid>
        <Grid container justify="center" className={classes.userInfoElement}>
          <EmailRoundedIcon className={classes.userInfoIcon} />
          <Typography variant="body1" color="textSecondary">
            {user.email}
          </Typography>
        </Grid>
        <Grid container justify="center" className={classes.userInfoElement}>
          <BusinessRoundedIcon className={classes.userInfoIcon} />
          <Typography variant="body1" color="textSecondary">
            {user.organisation.name}
          </Typography>
        </Grid>
        <Grid container justify="center" className={classes.logoutButton}>
          <Grid item xs={6}>
            <Grid container justify="center">
              <Button
                variant="outlined"
                color="primary"
                fullWidth
                onClick={logout}
              >
                Logout
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default UserInfo;
