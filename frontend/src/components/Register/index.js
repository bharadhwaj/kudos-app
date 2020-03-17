import React from 'react';

import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import InputLabel from '@material-ui/core/InputLabel';
import Link from '@material-ui/core/Link';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

import { makeStyles } from '@material-ui/core/styles';

import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

import style from './style';

import { regex } from '../../constants';

const Register = props => {
  const { onRegisterSubmit, isRegisterSubmitLoading, organisations } = props;

  const classes = makeStyles(style)();

  const [firstName, setFirstNameValue] = React.useState('');
  const [firstNameError, setFirstNameError] = React.useState(false);

  const [lastName, setLastNameValue] = React.useState('');
  const [lastNameError, setLastNameError] = React.useState(false);

  const [email, setEmailValue] = React.useState('');
  const [emailError, setEmailError] = React.useState(false);

  const [password, setPasswordValue] = React.useState('');
  const [passwordVisible, setPasswordVisibility] = React.useState(false);

  const [organisationId, setOrganisationValue] = React.useState(
    (organisations && organisations[0] && organisations[0].id) || 1
  );

  const handleFirstNameTyping = event => {
    if (
      regex.FIRST_NAME_TYPING.test(event.target.value) ||
      event.target.value === ''
    ) {
      setFirstNameError(false);
    } else {
      setFirstNameError(true);
    }
    setFirstNameValue(event.target.value);
  };

  const checkFirstName = event => {
    if (regex.FIRST_NAME.test(event.target.value)) {
      setFirstNameError(false);
    } else {
      setFirstNameError(true);
    }
  };

  const handleLastNameTyping = event => {
    if (
      regex.LAST_NAME_TYPING.test(event.target.value) ||
      event.target.value === ''
    ) {
      setLastNameError(false);
    } else {
      setLastNameError(true);
    }
    setLastNameValue(event.target.value);
  };

  const checkLastName = event => {
    if (regex.LAST_NAME.test(event.target.value) || event.target.value === '') {
      setLastNameError(false);
    } else {
      setLastNameError(true);
    }
  };

  const handleEmailTyping = event => {
    if (
      regex.EMAIL_TYPING.test(event.target.value) ||
      event.target.value === ''
    ) {
      setEmailError(false);
    } else {
      setEmailError(true);
    }
    setEmailValue(event.target.value);
  };

  const checkEmail = event => {
    if (regex.EMAIL.test(event.target.value)) {
      setEmailError(false);
    } else {
      setEmailError(true);
    }
  };

  const handlePasswordTyping = event => {
    setPasswordValue(event.target.value);
  };

  const handleTogglePasswordVisibility = () => {
    setPasswordVisibility(!passwordVisible);
  };

  const handleOrganisationSelect = event => {
    setOrganisationValue(event.target.value);
  };

  const handleRegisterSubmit = event => {
    event.preventDefault();
    onRegisterSubmit({ firstName, lastName, email, password, organisationId });
  };

  const organisationList = organisations.map(organisation => (
    <MenuItem key={organisation.id} value={organisation.id}>
      {organisation.name}
    </MenuItem>
  ));

  return (
    <>
      <Grid container spacing={1} justify="center" alignContent="center">
        <Grid item xs={12}>
          <Grid container justify="center" className={classes.registerElement}>
            <Typography variant="h4">Register</Typography>
          </Grid>
          <form onSubmit={handleRegisterSubmit}>
            <Grid
              container
              justify="center"
              className={classes.registerElement}
            >
              <Grid item xs={10} sm={8} md={6} lg={3}>
                <TextField
                  id="firstName"
                  variant="outlined"
                  label="First Name"
                  placeholder="John"
                  value={firstName}
                  onChange={handleFirstNameTyping}
                  onBlur={checkFirstName}
                  error={firstNameError}
                  helperText={firstNameError && 'Invalid First name format.'}
                  InputLabelProps={{ shrink: true }}
                  autoFocus
                  fullWidth
                />
              </Grid>
            </Grid>

            <Grid
              container
              justify="center"
              className={classes.registerElement}
            >
              <Grid item xs={10} sm={8} md={6} lg={3}>
                <TextField
                  id="lastName"
                  variant="outlined"
                  label="Last Name (Optional)"
                  placeholder="Smith"
                  value={lastName}
                  onChange={handleLastNameTyping}
                  onBlur={checkLastName}
                  error={lastNameError}
                  helperText={lastNameError && 'Invalid Last name format.'}
                  InputLabelProps={{ shrink: true }}
                  fullWidth
                />
              </Grid>
            </Grid>

            <Grid
              container
              justify="center"
              className={classes.registerElement}
            >
              <Grid item xs={10} sm={8} md={6} lg={3}>
                <TextField
                  id="email"
                  variant="outlined"
                  label="Email"
                  placeholder="johnsmith@example"
                  value={email}
                  onChange={handleEmailTyping}
                  onBlur={checkEmail}
                  error={emailError}
                  helperText={emailError && 'Invalid email format.'}
                  InputLabelProps={{ shrink: true }}
                  fullWidth
                />
              </Grid>
            </Grid>

            <Grid
              container
              justify="center"
              className={classes.registerElement}
            >
              <Grid item xs={10} sm={8} md={6} lg={3}>
                <TextField
                  id="password"
                  variant="outlined"
                  type={passwordVisible ? 'text' : 'password'}
                  label="Password"
                  placeholder="●●●●●●●●"
                  value={password}
                  onChange={handlePasswordTyping}
                  InputLabelProps={{ shrink: true }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          edge="end"
                          onClick={handleTogglePasswordVisibility}
                        >
                          {passwordVisible ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  fullWidth
                />
              </Grid>
            </Grid>

            <Grid
              container
              justify="center"
              className={classes.registerElement}
            >
              <Grid item xs={10} sm={8} md={6} lg={3}>
                <FormControl variant="outlined" fullWidth>
                  <InputLabel id="select-organisation-label">
                    Organisation
                  </InputLabel>
                  <Select
                    labelId="select-organisation-label"
                    id="select-organisation"
                    value={organisationId}
                    onChange={handleOrganisationSelect}
                    labelWidth={95}
                    fullWidth
                  >
                    {organisationList}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>

            <Grid
              container
              justify="center"
              className={classes.registerElement}
            >
              <Grid item xs={10} sm={8} md={6} lg={3}>
                <Button
                  variant="outlined"
                  color="primary"
                  size="large"
                  disabled={emailError || email === '' || password === ''}
                  onClick={handleRegisterSubmit}
                  fullWidth
                >
                  {!isRegisterSubmitLoading ? 'Register' : <CircularProgress />}
                </Button>
              </Grid>
            </Grid>
          </form>
        </Grid>
        <Grid container justify="center" className={classes.registerElement}>
          <Grid item xs={10} sm={8} md={6} lg={3}>
            <Grid container justify="center">
              <Typography variant="subtitle1">
                Existing user? <Link href={'/login'}>Login Here.</Link>
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default Register;
