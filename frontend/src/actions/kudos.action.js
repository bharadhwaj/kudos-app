import { KUDOS } from '../constants/actions';

export function fetchAllKudos() {
  return {
    type: KUDOS.FETCH_ALL_KUDOS,
  };
}

export function updateKudosData(kudosData) {
  return {
    type: KUDOS.UPDATE_KUDOS_DATA,
    payload: { kudosData },
  };
}

export function giveKudosToUser(receiverUserId, comments = null) {
  return {
    type: KUDOS.GIVE_KUDOS_TO_USER,
    payload: { receiverUserId, comments },
  };
}

export function kudosGivenSuccessfully(kudos) {
  return {
    type: KUDOS.KUDOS_GIVEN_SUCCESSFULLY,
    payload: { kudos },
  };
}
