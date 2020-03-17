import axios from 'axios';
import { all, put, select, takeLatest } from '@redux-saga/core/effects';

import { userAction, loadingAction } from '../actions';

import { actions, urls } from '../constants';

import { userSelector } from '../selectors';

import handleError from '../utils/errorHandler';

/* -----------------------------------------
 *                 WORKERS
 * -----------------------------------------
 */

function* getUsersofCurrentOrganisationWorker() {
  try {
    handleError(axios);

    const organisationId = yield select(
      userSelector.getCurrentUserOrganisationId()
    );

    const requestURL = urls.GET_ALL_USERS_OF_CURRENT_ORGANISATION.replace(
      /<ORGANISATION_ID>/,
      organisationId
    );

    const authToken = yield select(userSelector.getAuthToken());

    const headers = {
      'Content-Type': 'application/json',
      Authorization: authToken,
    };

    const response = yield axios.get(requestURL, { headers });

    yield put(loadingAction.stopGetUsersOfCurrentOrgLoading());

    if (response && response.status === 200) {
      const { data } = response;
      const { users } = data.data;

      yield put(userAction.updateUserOfCurrentOrganisation(users));
    }
  } catch (error) {
    yield put(loadingAction.stopGetUsersOfCurrentOrgLoading());
  }
}

/* -----------------------------------------
 *                 WATCHERS
 * -----------------------------------------
 */

function* getUsersofCurrentOrganisationWatcher() {
  yield takeLatest(
    actions.USER.GET_USERS_OF_CURRENT_ORG,
    getUsersofCurrentOrganisationWorker
  );
}

export default function* loginSaga() {
  yield all([getUsersofCurrentOrganisationWatcher()]);
}
