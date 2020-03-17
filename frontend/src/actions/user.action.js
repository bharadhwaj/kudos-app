import { USER } from '../constants/actions';

export function updateBasicUserInfo(userInfo) {
  return { type: USER.UPDATE_BASIC_DATA, payload: { userInfo } };
}

export function resetUserInfo() {
  return { type: USER.RESET_USER_DATA };
}

export function getUsersOfCurrentOrganisation() {
  return { type: USER.GET_USERS_OF_CURRENT_ORG };
}

export function updateUserOfCurrentOrganisation(users) {
  return { type: USER.UPDATE_USERS_OF_CURRENT_ORG, payload: { users } };
}
