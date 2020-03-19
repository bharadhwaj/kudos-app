import { createSelector } from 'reselect';

const selectOrganisationState = state => state.organisation;

export const getOrganisations = () =>
  createSelector(
    selectOrganisationState,
    organisationState => organisationState.organisations
  );
