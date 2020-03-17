import { LOADING } from '../constants/actions';

export function startLoginLoading() {
  return { type: LOADING.START_LOGIN_LOADING };
}

export function stopLoginLoading() {
  return { type: LOADING.STOP_LOGIN_LOADING };
}

export function startFetchKudosLoading() {
  return { type: LOADING.START_FETCH_KUDOS_LOADING };
}

export function stopFetchKudosLoading() {
  return { type: LOADING.STOP_FETCH_KUDOS_LOADING };
}

export function startGetUsersOfCurrentOrgLoading() {
  return { type: LOADING.START_GET_USERS_OF_CURRENT_ORG_LOADING };
}

export function stopGetUsersOfCurrentOrgLoading() {
  return { type: LOADING.STOP_GET_USERS_OF_CURRENT_ORG_LOADING };
}

export function startGiveKudosToUserLoading() {
  return { type: LOADING.START_GIVE_KUDOS_TO_USER_LOADING };
}

export function stopGiveKudosToUserLoading() {
  return { type: LOADING.STOP_GIVE_KUDOS_TO_USER_LOADING };
}
