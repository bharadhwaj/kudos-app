import { REGISTER } from '../constants/actions';

const initialState = {
  organisations: [],
  firstName: null,
  lastName: null,
  email: null,
  organisationId: null,
  password: null,
};

export default function registerReducer(state = initialState, action) {
  switch (action.type) {
    case REGISTER.UPDATE_ORGANISATION_DATA:
      return {
        ...state,
        organisations: action.payload.organisations,
      };

    case REGISTER.REGISTER_USER:
      return {
        ...state,
        firstName: action.payload.userData.firstName,
        lastName: action.payload.userData.lastName,
        email: action.payload.userData.email,
        organisationId: action.payload.userData.organisationId,
        password: action.payload.userData.password,
      };

    default:
      return { ...state };
  }
}
