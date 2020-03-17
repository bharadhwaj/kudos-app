// ------------------ LOADING ACTIONS ------------------ //
export const LOADING = {
  START_LOGIN_LOADING: 'kudos/Loading/START_LOGIN_LOADING',
  STOP_LOGIN_LOADING: 'kudos/Loading/STOP_LOGIN_LOADING',
  START_FETCH_KUDOS_LOADING: 'kudos/Loading/START_FETCH_KUDOS_LOADING',
  STOP_FETCH_KUDOS_LOADING: 'kudos/Loading/STOP_FETCH_KUDOS_LOADING',
  START_GET_USERS_OF_CURRENT_ORG_LOADING:
    'kudosApp/User/START_GET_USERS_OF_CURRENT_ORG_LOADING',
  STOP_GET_USERS_OF_CURRENT_ORG_LOADING:
    'kudosApp/User/STOP_GET_USERS_OF_CURRENT_ORG_LOADING',
  START_GIVE_KUDOS_TO_USER_LOADING:
    'kudos/Loading/START_GIVE_KUDOS_TO_USER_LOADING',
  STOP_GIVE_KUDOS_TO_USER_LOADING:
    'kudos/Loading/STOP_GIVE_KUDOS_TO_USER_LOADING',
};

// ------------------ TOAST ACTIONS ------------------ //
export const TOAST = {
  REQUEST_TO_SHOW_TOAST: 'kudosApp/Toast/REQUEST_TO_SHOW_TOAST',
  SHOW_TOAST: 'kudosApp/Toast/SHOW_TOAST',
  HIDE_TOAST: 'kudosApp/Toast/HIDE_TOAST',
};

// ------------------ LOGIN ACTIONS ------------------ //
export const LOGIN = {
  SUBMIT_FOR_LOGIN: 'kudosApp/Login/SUBMIT_FOR_LOGIN',
  RESET_LOGIN_STATE: 'kudosApp/Login/RESET_LOGIN_STATE',
};

// ------------------ USER ACTIONS ------------------ //
export const USER = {
  UPDATE_BASIC_DATA: 'kudosApp/User/UPDATE_BASIC_DATA',
  RESET_USER_DATA: 'kudosApp/User/RESET_USER_DATA',
  GET_USERS_OF_CURRENT_ORG: 'kudosApp/User/GET_USERS_OF_CURRENT_ORG',
  UPDATE_USERS_OF_CURRENT_ORG: 'kudosApp/User/UPDATE_USERS_OF_CURRENT_ORGs',
};

// ------------------ KUDOS ACTIONS ------------------ //
export const KUDOS = {
  FETCH_ALL_KUDOS: 'kudosApp/Kudos/FETCH_ALL_KUDOS',
  UPDATE_KUDOS_DATA: 'kudosApp/Kudos/UPDATE_KUDOS_DATA',
  GIVE_KUDOS_TO_USER: 'kudosApp/Kudos/GIVE_KUDOS_TO_USER',
  KUDOS_GIVEN_SUCCESSFULLY: 'kudosApp/Kudos/KUDOS_GIVEN_SUCCESSFULLY',
};
