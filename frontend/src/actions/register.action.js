import { REGISTER } from '../constants/actions';

export function getAllOrganisations() {
  return { type: REGISTER.GET_ALL_ORGANISATIONS };
}

export function updateOrganisationData(organisations) {
  return {
    type: REGISTER.UPDATE_ORGANISATION_DATA,
    payload: { organisations },
  };
}

export function registerUser(userData) {
  return { type: REGISTER.REGISTER_USER, payload: { userData } };
}
