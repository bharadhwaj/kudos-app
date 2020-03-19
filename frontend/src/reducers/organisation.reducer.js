import { ORGANISATION } from '../constants/actions';

const initialState = {
  organisations: [],
};

export default function organisationReducer(state = initialState, action) {
  switch (action.type) {
    case ORGANISATION.UPDATE_ORGANISATION_DATA:
      return {
        ...state,
        organisations: action.payload.organisations,
      };

    default:
      return { ...state };
  }
}
