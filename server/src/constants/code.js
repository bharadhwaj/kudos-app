export const SUCCESS_CODES = {
  GENERIC_SUCCESS: '1_000_000',
};

export const USER_FAILURE_CODES = {
  USER_ALREADY_EXISTS: '4_001_001',
  USER_NOT_FOUND: '4_001_002',
  INVALID_LOGIN: '4_001_003',
  SELF_KUDOS_NOT_ALLOWED: '4_001_004',
  KUDOS_LIMIT_REACHED: '4_001_005',
  OUTSIDE_ORGANISATION_KUDOS: '4_001_006',
  KUDOS_ALREADY_GIVEN: '4_001_007',
};

export const ORGANISATION_FAILURE_CODES = {
  ORGANISATION_NOT_FOUND: '4_002_001',
};

export const APPLICATION_ERROR_CODES = {
  INTERNAL_SERVER_ERROR: '5_001_000',
  UNAUTHORIZED: '5_001_001',
  FORBIDDEN: '5_001_002',
  MISSING_PARAMS: '5_001_003',
  NOT_FOUND: '5_001_004',
};

export const APPLICATION_ERROR_STATUS_CODES = {
  INTERNAL_SERVER_ERROR: 500,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  MISSING_PARAMS: 422,
  NOT_FOUND: 404,
};
