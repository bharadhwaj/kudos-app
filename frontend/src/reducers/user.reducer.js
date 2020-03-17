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

const initialState = {
  currentUser: isLoggedIn ? userInfo : notLoggedInInitialState,
  users: [],
};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case USER.UPDATE_BASIC_DATA:
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          isLoggedIn: true,
          id: action.payload.userInfo.id,
          token: action.payload.userInfo.token,
          firstName: action.payload.userInfo.firstName,
          lastName: action.payload.userInfo.lastName,
          email: action.payload.userInfo.email,
          organisation: action.payload.userInfo.organisation,
        },
      };

    case USER.UPDATE_USERS_OF_CURRENT_ORG:
      return {
        ...state,
        users: [
          ...action.payload.users.filter(
            user => +user.id !== state.currentUser.id
          ),
        ],
      };

    case USER.RESET_USER_DATA:
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          ...notLoggedInInitialState,
        },
        users: [],
      };

    default:
      return { ...state };
  }
}
