import { ORGANISATION } from '../constants/actions';

export function getAllOrganisations() {
  return { type: ORGANISATION.GET_ALL_ORGANISATIONS };
}

export function updateOrganisationData(organisations) {
  return {
    type: ORGANISATION.UPDATE_ORGANISATION_DATA,
    payload: { organisations },
  };
}
