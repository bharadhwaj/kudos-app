import { LOGIN } from '../constants/actions';

export function submitForLogin(email, password) {
  return { type: LOGIN.SUBMIT_FOR_LOGIN, payload: { email, password } };
}

export function resetLoginState() {
  return { type: LOGIN.RESET_LOGIN_STATE };
}
