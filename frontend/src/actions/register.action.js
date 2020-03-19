import { REGISTER } from '../constants/actions';

export function registerUser(userData) {
  return { type: REGISTER.REGISTER_USER, payload: { userData } };
}
