import React from 'react';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import { makeStyles } from '@material-ui/core/styles';

import style from './style';

import GivenKudosArea from '../GivenKudosArea';

const GivenKudosList = props => {
  const { kudosGiven } = props;

  const classes = makeStyles(style)();

  const givenKudosAreaComponent = kudosGiven.map(kudos => (
    <Grid item xs={12} key={kudos.id} className={classes.kudosList}>
      <GivenKudosArea kudos={kudos} />
    </Grid>
  ));

  return (
    <Grid item xs={12} md={6}>
      <Grid container justify="center" className={classes.kudosListTitle}>
        <Typography variant="h5" color="textSecondary">
          Given Kudos
        </Typography>
      </Grid>
      <Grid container>
        <>{givenKudosAreaComponent}</>
      </Grid>
    </Grid>
  );
};

export default GivenKudosList;
