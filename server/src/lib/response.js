import { message, code } from '../constants';

const response = {
  CREATE_USER: {
    SUCCESS: {
      success: true,
      // responseCode: code.CREATE_USER.SUCCESS,
      message: message.CREATE_USER.SUCCESS,
      results: {},
    },
    USER_EXISTS: {
      responseCode: 409,
      response: {
        success: false,
        // responseCode: code.CREATE_USER.USER_EXISTS,
        message: message.CREATE_USER.USER_EXISTS,
        messageObj: {},
      },
    },
  },
  FOLLOW_USER: {
    SUCCESS: {
      success: true,
      responseCode: code.FOLLOW_USER.SUCCESS,
      message: message.FOLLOW_USER.SUCCESS,
      results: {},
    },
    ALREADY_FOLLOWS: {
      success: false,
      responseCode: code.FOLLOW_USER.ALREADY_FOLLOWS,
      message: message.FOLLOW_USER.ALREADY_FOLLOWS,
      messageObj: {},
    },
    FOLLOW_USER_BLOCKED: {
      success: false,
      responseCode: code.FOLLOW_USER.FOLLOW_USER_BLOCKED,
      message: message.FOLLOW_USER.FOLLOW_USER_BLOCKED,
      messageObj: {},
    },
    ORIGIN_USER_BLOCKED: {
      success: false,
      responseCode: code.FOLLOW_USER.ORIGIN_USER_BLOCKED,
      message: message.FOLLOW_USER.ORIGIN_USER_BLOCKED,
      messageObj: {},
    },
    INVALID_USER_ID: {
      success: false,
      responseCode: code.FOLLOW_USER.INVALID_USER_ID,
      message: message.FOLLOW_USER.INVALID_USER_ID,
      messageObj: {},
    },
    INVALID_FOLLOW_USER_ID: {
      success: false,
      responseCode: code.FOLLOW_USER.INVALID_FOLLOW_USER_ID,
      message: message.FOLLOW_USER.INVALID_FOLLOW_USER_ID,
      messageObj: {},
    },
  },
  BLOCK_USER: {
    SUCCESS: {
      success: true,
      responseCode: code.BLOCK_USER.SUCCESS,
      message: message.BLOCK_USER.SUCCESS,
      results: {},
    },
    ALREADY_BLOCKED: {
      success: false,
      responseCode: code.BLOCK_USER.ALREADY_BLOCKED,
      message: message.BLOCK_USER.ALREADY_BLOCKED,
      messageObj: {},
    },
    INVALID_BLOCKING_USER_ID: {
      success: false,
      responseCode: code.BLOCK_USER.INVALID_BLOCKING_USER_ID,
      message: message.BLOCK_USER.INVALID_BLOCKING_USER_ID,
      messageObj: {},
    },
    INVALID_BLOCKED_USER_ID: {
      success: false,
      responseCode: code.BLOCK_USER.INVALID_BLOCKED_USER_ID,
      message: message.BLOCK_USER.INVALID_BLOCKED_USER_ID,
      messageObj: {},
    },
  },
  UNBLOCK_USER: {
    SUCCESS: {
      success: true,
      responseCode: code.UNBLOCK_USER.SUCCESS,
      message: message.UNBLOCK_USER.SUCCESS,
      results: {},
    },
    INVALID_UNBLOCKING_USER_ID: {
      success: false,
      responseCode: code.UNBLOCK_USER.INVALID_UNBLOCKING_USER_ID,
      message: message.UNBLOCK_USER.INVALID_UNBLOCKING_USER_ID,
      messageObj: {},
    },
    INVALID_UNBLOCKED_USER_ID: {
      success: false,
      responseCode: code.UNBLOCK_USER.INVALID_UNBLOCKED_USER_ID,
      message: message.UNBLOCK_USER.INVALID_UNBLOCKED_USER_ID,
      messageObj: {},
    },
  },
  GET_FOLLOWING_LIST: {
    SUCCESS: {
      success: true,
      responseCode: code.GET_FOLLOWING_LIST.SUCCESS,
      message: message.GET_FOLLOWING_LIST.SUCCESS,
      results: {},
    },
    INVALID_USER_ID: {
      success: false,
      responseCode: code.GET_FOLLOWING_LIST.INVALID_USER_ID,
      message: message.GET_FOLLOWING_LIST.INVALID_USER_ID,
      messageObj: {},
    },
  },
  GET_USER_PROFILE: {
    SUCCESS: {
      success: true,
      responseCode: code.GET_USER_PROFILE.SUCCESS,
      message: message.GET_USER_PROFILE.SUCCESS,
      results: {},
    },
    INVALID_USER_ID: {
      success: false,
      responseCode: code.GET_USER_PROFILE.INVALID_USER_ID,
      message: message.GET_USER_PROFILE.INVALID_USER_ID,
      messageObj: {},
    },
    INVALID_VISITING_USER_ID: {
      success: false,
      responseCode: code.GET_USER_PROFILE.INVALID_VISITING_USER_ID,
      message: message.GET_USER_PROFILE.INVALID_VISITING_USER_ID,
      messageObj: {},
    },
  },

  APPLICATION_ERROR: {
    UNAUTHORIZED: {
      success: false,
      responseCode: code.APPLICATION_ERROR.UNAUTHORIZED,
      message: message.APPLICATION_ERROR.UNAUTHORIZED,
      messageObj: {},
    },
    MISSING_AUTH: {
      success: false,
      responseCode: code.APPLICATION_ERROR.MISSING_AUTH,
      message: message.APPLICATION_ERROR.MISSING_AUTH,
      messageObj: {},
    },
    MISSING_PARAMS: {
      success: false,
      responseCode: code.APPLICATION_ERROR.MISSING_PARAMS,
      message: message.APPLICATION_ERROR.MISSING_PARAMS,
      messageObj: {},
    },
    NOT_FOUND: message.APPLICATION_ERROR.NOT_FOUND,
    SERVER_ERROR: {
      success: false,
      responseCode: code.APPLICATION_ERROR.SERVER_ERROR,
      message: message.APPLICATION_ERROR.SERVER_ERROR,
      messageObj: {},
    },
  },
};

export default response;
