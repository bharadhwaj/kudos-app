import React from 'react';

import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import Hidden from '@material-ui/core/Hidden';
import Typography from '@material-ui/core/Typography';

import { makeStyles } from '@material-ui/core/styles';

import style from './style';

const KudosSummary = props => {
  const {
    kudosStartDate,
    kudosEndDate,
    givenKudosCount,
    receivedKudosCount,
  } = props;

  const kudosStartDateVerbose =
    kudosStartDate &&
    new Date(kudosStartDate).toLocaleString('en-GB', {
      timeZone: 'Asia/Kolkata',
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    });

  const kudosEndDateVerbose =
    kudosEndDate &&
    new Date(kudosEndDate).toLocaleString('en-GB', {
      timeZone: 'Asia/Kolkata',
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    });

  const classes = makeStyles(style)();

  return (
    <>
      <Grid className={classes.summaryArea}>
        <Grid container alignItems="center" justify="space-evenly">
          <Grid item xs={12} md className={classes.cardArea}>
            <Grid container justify="center">
              <Typography gutterBottom variant="h6">
                Start Date
              </Typography>
            </Grid>
            <Grid container justify="center">
              <Typography gutterBottom variant="h5" color="textSecondary">
                {kudosStartDateVerbose || '-'}
              </Typography>
            </Grid>
          </Grid>

          <Divider orientation="vertical" flexItem />

          <Grid item xs={12} md className={classes.cardArea}>
            <Grid container justify="center">
              <Typography gutterBottom variant="h6">
                Kudos Given
              </Typography>
            </Grid>
            <Grid container justify="center">
              <Typography gutterBottom variant="h5" color="textSecondary">
                {givenKudosCount || '-'}
              </Typography>
            </Grid>
          </Grid>

          <Divider orientation="vertical" flexItem />

          <Grid item xs={12} md className={classes.cardArea}>
            <Grid container justify="center">
              <Typography gutterBottom variant="h6">
                Kudos Remaining
              </Typography>
            </Grid>
            <Grid container justify="center">
              <Typography gutterBottom variant="h5" color="textSecondary">
                {3 - givenKudosCount || '-'}
              </Typography>
            </Grid>
          </Grid>

          <Divider orientation="vertical" flexItem />

          <Grid item xs={12} md className={classes.cardArea}>
            <Grid container justify="center">
              <Typography gutterBottom variant="h6">
                Kudos Received
              </Typography>
            </Grid>
            <Grid container justify="center">
              <Typography gutterBottom variant="h5" color="textSecondary">
                {receivedKudosCount || '-'}
              </Typography>
            </Grid>
          </Grid>

          <Divider orientation="vertical" flexItem />

          <Grid item xs={12} md className={classes.cardArea}>
            <Grid container justify="center">
              <Typography gutterBottom variant="h6">
                End Date
              </Typography>
            </Grid>
            <Grid container justify="center">
              <Typography gutterBottom variant="h5" color="textSecondary">
                {kudosEndDateVerbose || '-'}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Hidden smDown>
        <Divider variant="middle" />
      </Hidden>
    </>
  );
};

export default KudosSummary;
