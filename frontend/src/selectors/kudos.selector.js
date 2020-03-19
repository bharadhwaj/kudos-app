import { createSelector } from 'reselect';

const selectKudosState = state => state.kudos;

export const getKudosStartDate = () =>
  createSelector(selectKudosState, kudosState => kudosState.kudosStartDate);

export const getKudosEndDate = () =>
  createSelector(selectKudosState, kudosState => kudosState.kudosEndDate);

export const getGivenKudosCount = () =>
  createSelector(selectKudosState, kudosState => kudosState.givenKudosCount);

export const getReceivedKudosCount = () =>
  createSelector(selectKudosState, kudosState => kudosState.receivedKudosCount);

export const getGivenKudos = () =>
  createSelector(selectKudosState, kudosState => kudosState.kudosGiven);

export const getReceivedKudos = () =>
  createSelector(selectKudosState, kudosState => kudosState.kudosReceived);

export const getKudosGivenUserIds = () =>
  createSelector(selectKudosState, kudosState =>
    kudosState.kudosGiven.map(kudos => kudos.receivedByUser.id)
  );
