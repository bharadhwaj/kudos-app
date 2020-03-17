const BASE_URL = process.env.REACT_APP_API_BASE_URL;

export const GET_ALL_ORGANISATIONS = `${BASE_URL}/organisations`;
export const REGISTER_URL = `${BASE_URL}/users`;
export const LOGIN_URL = `${BASE_URL}/users/login`;
export const FETCH_ALL_KUDOS = `${BASE_URL}/users/<USER_ID>/kudos`;
export const GIVE_KUDOS_TO_USER = `${BASE_URL}/users/<USER_ID>/kudos`;
export const GET_ALL_USERS_OF_CURRENT_ORGANISATION = `${BASE_URL}/organisations/<ORGANISATION_ID>/users`;
