import React from 'react';

import Grid from '@material-ui/core/Grid';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

import { makeStyles } from '@material-ui/core/styles';

import ChatRoundedIcon from '@material-ui/icons/ChatRounded';
import EmailRoundedIcon from '@material-ui/icons/EmailRounded';
import ExpandMoreIcon from '@material-ui/icons/ExpandMoreRounded';

import style from './style';

const GivenKudosArea = props => {
  const { kudos } = props;

  console.log('KDUOS: ', kudos);

  const classes = makeStyles(style)();

  const fullName = kudos.receivedByUser.lastName
    ? kudos.receivedByUser.firstName + ' ' + kudos.receivedByUser.lastName
    : kudos.receivedByUser.firstName;

  return (
    <>
      <ExpansionPanel>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="kudos-user-area"
        >
          <>
            <Grid container>
              <Grid item xs={12}>
                <Typography variant="h5">{fullName}</Typography>
              </Grid>
              <Grid item xs={12}>
                <EmailRoundedIcon className={classes.kudosAreaIcon} />
                <Typography
                  variant="body1"
                  color="textSecondary"
                  display="inline"
                >
                  {kudos.receivedByUser.email}
                </Typography>
              </Grid>
            </Grid>
          </>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <TextField
            variant="outlined"
            label="Comments"
            multiline
            rows="2"
            value={kudos.comments || '-'}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <ChatRoundedIcon fontSize="large" />
                </InputAdornment>
              ),
            }}
            disabled
            fullWidth
          />
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </>
  );
};

export default GivenKudosArea;
