import React from 'react';

import Button from '@material-ui/core/Button';
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

const GiveKudosArea = props => {
  const { user, canGiveKudos, giveKudosToUser } = props;

  const classes = makeStyles(style)();

  const [comments, typeComment] = React.useState('');

  const handleCommentTyping = event => {
    typeComment(event.target.value);
  };

  const handleButtonClick = event => {
    event.preventDefault();
    giveKudosToUser(user.id, comments);
  };

  const fullName = user.lastName
    ? user.firstName + ' ' + user.lastName
    : user.firstName;

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
                  {user.email}
                </Typography>
              </Grid>
            </Grid>
          </>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Grid container>
            <Grid item xs={12}>
              {!canGiveKudos && (
                <Grid container>
                  <Typography
                    variant="h6"
                    color="textSecondary"
                    className={classes.helperText}
                  >
                    You have given all three kudos this week. Come back next
                    week.
                  </Typography>
                </Grid>
              )}
            </Grid>

            <Grid item xs={12}>
              <TextField
                variant="outlined"
                label="Comments (Optional)"
                multiline
                rows="2"
                value={comments}
                onChange={handleCommentTyping}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <ChatRoundedIcon
                        fontSize="large"
                        className={classes.commentIcon}
                      />
                    </InputAdornment>
                  ),
                }}
                autoFocus
                fullWidth
                disabled={!canGiveKudos}
              />
            </Grid>
            <Grid item xs={12}>
              <Grid
                container
                justify="center"
                className={classes.giveKudosButton}
              >
                <Grid item xs={4}>
                  <Button
                    variant="outlined"
                    color="primary"
                    fullWidth
                    disabled={!canGiveKudos}
                    onClick={handleButtonClick}
                  >
                    Give Kudos
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </>
  );
};

export default GiveKudosArea;
