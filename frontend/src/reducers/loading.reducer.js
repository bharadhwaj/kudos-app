import { LOADING } from '../constants/actions';

const initialState = {
  isLoginSubmitLoading: false,
  isFetchKudosLoading: false,
  isGetUsersOfCurrenOrgLoading: false,
  isGiveKudosToUserLoading: false,
};

export default function loadingReducer(state = initialState, action) {
  switch (action.type) {
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

    case LOADING.START_FETCH_KUDOS_LOADING:
      return {
        ...state,
        isFetchKudosLoading: true,
      };

    case LOADING.STOP_FETCH_KUDOS_LOADING:
      return {
        ...state,
        isFetchKudosLoading: false,
      };

    case LOADING.START_GET_USERS_OF_CURRENT_ORG_LOADING:
      return {
        ...state,
        isGetUsersOfCurrenOrgLoading: true,
      };

    case LOADING.STOP_GET_USERS_OF_CURRENT_ORG_LOADING:
      return {
        ...state,
        isGetUsersOfCurrenOrgLoading: false,
      };

    case LOADING.START_GIVE_KUDOS_TO_USER_LOADING:
      return {
        ...state,
        isGiveKudosToUserLoading: true,
      };

    case LOADING.STOP_GIVE_KUDOS_TO_USER_LOADING:
      return {
        ...state,
        isGiveKudosToUserLoading: false,
      };

    default:
      return { ...state };
  }
}
