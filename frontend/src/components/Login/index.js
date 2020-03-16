import React from 'react';

import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import Link from '@material-ui/core/Link';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

import { makeStyles } from '@material-ui/core/styles';

import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

import style from './style';

import { regex } from '../../constants';

const Login = props => {
  const { onLoginSubmit, isLoginSubmitLoading } = props;

  const classes = makeStyles(style)();

  const [email, setEmailValue] = React.useState('johnsmith@example.com');
  const [emailError, setEmailError] = React.useState(false);
  const [password, setPasswordValue] = React.useState('password');
  const [passwordVisible, setPasswordVisibility] = React.useState(false);

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
    if (regex.EMAIL.test(event.target.value) || event.target.value === '') {
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

  const handleLoginSubmit = event => {
    event.preventDefault();
    onLoginSubmit(email, password);
  };

  return (
    <>
      <Grid container spacing={1} justify="center" alignContent="center">
        <Grid item xs={12}>
          <Grid container justify="center" className={classes.loginElement}>
            <Typography variant="h4">Login</Typography>
          </Grid>
          <form onSubmit={handleLoginSubmit}>
            <Grid container justify="center" className={classes.loginElement}>
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
                  autoFocus
                  fullWidth
                />
              </Grid>
            </Grid>
            <Grid container justify="center" className={classes.loginElement}>
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
            <Grid container justify="center" className={classes.loginElement}>
              <Grid item xs={10} sm={8} md={6} lg={3}>
                <Button
                  variant="outlined"
                  color="primary"
                  size="large"
                  disabled={emailError || email === '' || password === ''}
                  onClick={handleLoginSubmit}
                  fullWidth
                >
                  {!isLoginSubmitLoading ? 'Login' : <CircularProgress />}
                </Button>
              </Grid>
            </Grid>
          </form>
        </Grid>
        <Grid container justify="center" className={classes.loginElement}>
          <Grid item xs={10} sm={8} md={6} lg={3}>
            <Grid container justify="center">
              <Typography variant="subtitle1">
                Not our user yet? <Link href={'/register'}>Register Here.</Link>
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default Login;
