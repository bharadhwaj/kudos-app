import { KUDOS } from '../constants/actions';

const initialState = {
  kudosStartDate: null,
  kudosEndDate: null,
  givenKudosCount: 0,
  kudosGiven: [],
  receivedKudosCount: 0,
  kudosReceived: [],
};

export default function kudosReducer(state = initialState, action) {
  switch (action.type) {
    case KUDOS.UPDATE_KUDOS_DATA:
      return {
        ...state,
        kudosStartDate: action.payload.kudosData.kudosStartDate,
        kudosEndDate: action.payload.kudosData.kudosEndDate,
        givenKudosCount: action.payload.kudosData.givenKudosCount,
        kudosGiven: [...action.payload.kudosData.kudosGiven],
        receivedKudosCount: action.payload.kudosData.receivedKudosCount,
        kudosReceived: [...action.payload.kudosData.kudosReceived],
      };

    case KUDOS.KUDOS_GIVEN_SUCCESSFULLY:
      return {
        ...state,
        givenKudosCount: state.givenKudosCount + 1,
        kudosGiven: [...state.kudosGiven, action.payload.kudos],
      };

    default:
      return { ...state };
  }
}
