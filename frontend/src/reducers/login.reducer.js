import { LOGIN } from '../constants/actions';

const initialState = {
  email: null,
  password: null,
};

export default function loginReducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN.SUBMIT_FOR_LOGIN:
      return {
        ...state,
        email: action.payload.email,
        password: action.payload.password,
      };

    case LOGIN.RESET_LOGIN_STATE:
      return {
        ...state,
        email: null,
        password: null,
      };

    default:
      return { ...state };
  }
}
