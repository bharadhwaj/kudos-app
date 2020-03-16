import { decode } from 'jsonwebtoken';

import { USER, ORGANISATION } from '../constants/storage';

export const updateUserInfo = userInfo => {
  userInfo.id && localStorage.setItem(USER.ID, userInfo.id);
  userInfo.token && localStorage.setItem(USER.TOKEN, userInfo.token);
  userInfo.firstName &&
    localStorage.setItem(USER.FIRSTNAME, userInfo.firstName);
  userInfo.lastName && localStorage.setItem(USER.LASTNAME, userInfo.lastName);
  userInfo.email && localStorage.setItem(USER.EMAIL, userInfo.email);
};

export const updateUserOrganisationInfo = organisationInfo => {
  organisationInfo.id &&
    localStorage.setItem(ORGANISATION.ID, organisationInfo.id);
  organisationInfo.name &&
    localStorage.setItem(ORGANISATION.NAME, organisationInfo.name);
};

export const updateUserLoginInfo = userInfo => {
  const decodedToken = decode(userInfo.token);
  const expiryEpoch = decodedToken && decodedToken.exp * 1000;

  localStorage.setItem(USER.IS_LOGGED_IN, 1);
  localStorage.setItem(USER.EXPIRE_AT, expiryEpoch);
  updateUserInfo(userInfo);
  updateUserOrganisationInfo(userInfo.organisation);
};

export const checkIfUserIsLoggedIn = () => {
  const isLoggedIn = +localStorage.getItem(USER.IS_LOGGED_IN);
  const expireAt = +localStorage.getItem(USER.EXPIRE_AT);

  if (expireAt && isLoggedIn === 1 && new Date(expireAt) > new Date()) {
    const userInfo = {};
    userInfo.isLoggedIn = true;
    userInfo.expireAt = +localStorage.getItem(USER.EXPIRE_AT);
    userInfo.id = +localStorage.getItem(USER.ID);
    userInfo.token = localStorage.getItem(USER.TOKEN);
    userInfo.firstName = localStorage.getItem(USER.FIRSTNAME);
    userInfo.lastName = localStorage.getItem(USER.LASTNAME);
    userInfo.email = localStorage.getItem(USER.EMAIL);

    userInfo.organisation = {};
    userInfo.organisation.id = +localStorage.getItem(ORGANISATION.ID);
    userInfo.organisation.name = localStorage.getItem(ORGANISATION.NAME);

    return { isLoggedIn: true, userInfo };
  }

  return { isLoggedIn: false, userInfo: null };
};

export const removeUserInfo = () => {
  localStorage.removeItem(USER.IS_LOGGED_IN);
  localStorage.removeItem(USER.EXPIRE_AT);
  localStorage.removeItem(USER.ID);
  localStorage.removeItem(USER.TOKEN);
  localStorage.removeItem(USER.FIRSTNAME);
  localStorage.removeItem(USER.LASTNAME);
  localStorage.removeItem(USER.EMAIL);
};

export const removeUserOrganisationInfo = () => {
  localStorage.removeItem(ORGANISATION.ID);
  localStorage.removeItem(ORGANISATION.NAME);
};

export const logoutUser = () => {
  removeUserInfo();
  removeUserOrganisationInfo();
};
