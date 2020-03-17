import React from 'react';

import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';

const Loading = () => {
  return (
    <Grid container justify="center">
      <CircularProgress />
    </Grid>
  );
};

export default Loading;
