import { LOADING } from '../constants/actions';

const initialState = {
  isMainLoading: false,
  isLoginSubmitLoading: false,
};

export default function loadingReducer(state = initialState, action) {
  switch (action.type) {
    case LOADING.START_MAIN_LOADING:
      return {
        ...state,
        isMainLoading: true,
      };

    case LOADING.STOP_MAIN_LOADING:
      return {
        ...state,
        isMainLoading: false,
      };

    case LOADING.START_LOGIN_LOADING:
      return {
        ...state,
        isLoginSubmitLoading: true,
      };

    case LOADING.STOP_LOGIN_LOADING:
      return {
        ...state,
        isLoginSubmitLoading: false,
      };

    default:
      return { ...state };
  }
}
