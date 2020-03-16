import { USER } from '../constants/actions';

export function updateBasicUserInfo(userInfo) {
  return { type: USER.UPDATE_BASIC_DATA, payload: { userInfo } };
}

export function resetUserInfo() {
  return { type: USER.RESET_USER_DATA };
}
