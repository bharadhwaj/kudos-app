import { LOADING } from '../constants/actions';

export function startLoading() {
  return { type: LOADING.START_MAIN_LOADING };
}

export function stopLoading() {
  return { type: LOADING.STOP_MAIN_LOADING };
}

export function startLoginLoading() {
  return { type: LOADING.START_LOGIN_LOADING };
}

export function stopLoginLoading() {
  return { type: LOADING.STOP_LOGIN_LOADING };
}
