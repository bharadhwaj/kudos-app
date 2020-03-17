import React from 'react';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import { makeStyles } from '@material-ui/core/styles';

import style from './style';

import ReceivedKudosArea from '../ReceivedKudosArea';

const ReceivedKudosList = props => {
  const { kudosReceived } = props;

  const classes = makeStyles(style)();

  const receivedKudosAreaComponent = kudosReceived.map(kudos => (
    <Grid item xs={12} key={kudos.id} className={classes.kudosList}>
      <ReceivedKudosArea kudos={kudos} />
    </Grid>
  ));

  return (
    <Grid item xs={12} md={6}>
      <Grid container justify="center" className={classes.kudosListTitle}>
        <Typography variant="h5" color="textSecondary">
          Received Kudos
        </Typography>
      </Grid>
      <Grid container>
        <>{receivedKudosAreaComponent}</>
      </Grid>
    </Grid>
  );
};

export default ReceivedKudosList;
