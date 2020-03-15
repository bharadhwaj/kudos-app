export const USER_MESSAGES = {
  CREATE_USER_SUCCESS: 'User created successfully.',
  LOGIN_SUCCESS: 'User logged in successfully.',
  GET_USERS_BY_ORGANISATION: 'Fetched the list of users from the organisation.',
  USER_ALREADY_EXISTS: 'User with this email already exist.',
  USER_NOT_FOUND: 'User with this email is not found. Try signing up!',
  INVALID_LOGIN: 'Invalid email or password.',
};

export const ORGANISATION_MESSAGES = {
  FETCH_ALL_ORGANISATIONS: 'Organisation data fetched successfully.',
  ORGANISATION_NOT_FOUND: "Organisation with this ID doesn't exist",
};

export const APPLICATION_ERROR_MESSAGES = {
  INTERNAL_SERVER_ERROR: 'Internal Server Error.',
  UNAUTHORIZED: 'Authentication required perform this action.',
  FORBIDDEN: 'Not Authorized to perform this action.',
  MISSING_PARAMS: 'Invalid or Incorrect or Missing parameters in the request.',
  NOT_FOUND:
    "We appreciate your excitement.👏 But sadly, this route doesn't serve anything. 🙁",
};
