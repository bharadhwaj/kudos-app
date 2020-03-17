import { createSelector } from 'reselect';

const selectRegisterState = state => state.register;

export const getOrganisations = () =>
  createSelector(
    selectRegisterState,
    registerState => registerState.organisations
  );

export const getRegisterBody = () =>
  createSelector(selectRegisterState, registerState => {
    const { organisations, ...registerBody } = registerState;
    return registerBody;
  });
