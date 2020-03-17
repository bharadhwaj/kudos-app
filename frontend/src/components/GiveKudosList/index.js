import React from 'react';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import { makeStyles } from '@material-ui/core/styles';

import style from './style';

import GiveKudosArea from '../GiveKudosArea';

const GiveKudosList = props => {
  const { availableUsers, canGiveKudos, giveKudosToUser } = props;

  const classes = makeStyles(style)();

  const availableUsersKudosComponent = availableUsers.map(user => (
    <Grid item xs={12} key={user.id} className={classes.kudosUserList}>
      <GiveKudosArea
        user={user}
        canGiveKudos={canGiveKudos}
        giveKudosToUser={giveKudosToUser}
      />
    </Grid>
  ));

  return (
    <Grid item xs={12} md={6}>
      <Grid container justify="center" className={classes.kudosListTitle}>
        <Typography variant="h5" color="textSecondary">
          Give Kudos
        </Typography>
      </Grid>
      <Grid container>
        <>{availableUsersKudosComponent}</>
      </Grid>
    </Grid>
  );
};

export default GiveKudosList;
