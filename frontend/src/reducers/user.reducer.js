import { USER } from '../constants/actions';
import { checkIfUserIsLoggedIn } from '../utils/users';

const { isLoggedIn, userInfo } = checkIfUserIsLoggedIn();

const notLoggedInInitialState = {
  isLoggedIn: false,
  id: null,
  token: null,
  firstName: null,
  lastName: null,
  email: null,
  organisation: null,
};

const initialState = isLoggedIn ? userInfo : notLoggedInInitialState;

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case USER.UPDATE_BASIC_DATA:
      return {
        ...state,
        isLoggedIn: true,
        id: action.payload.userInfo.id,
        token: action.payload.userInfo.token,
        firstName: action.payload.userInfo.firstName,
        lastName: action.payload.userInfo.lastName,
        email: action.payload.userInfo.email,
        organisation: action.payload.userInfo.organisation,
      };

    case USER.RESET_USER_DATA:
      return {
        ...state,
        ...notLoggedInInitialState,
      };

    default:
      return { ...state };
  }
}
