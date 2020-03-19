import axios from 'axios';
import { all, put, takeLatest } from '@redux-saga/core/effects';

import { loadingAction, organisationAction } from '../actions';

import { actions, urls } from '../constants';

import handleError from '../utils/errorHandler';

/* -----------------------------------------
 *                 WORKERS
 * -----------------------------------------
 */

function* getAllOrganisationsWorker() {
  try {
    handleError(axios);
    const requestURL = urls.GET_ALL_ORGANISATIONS;

    const headers = {
      'Content-Type': 'application/json',
    };

    const response = yield axios.get(requestURL, { headers });

    yield put(loadingAction.stopGetOrganisationsLoading());

    if (response && response.status === 200) {
      const { data } = response;
      const { organisations } = data.data;

      yield put(organisationAction.updateOrganisationData(organisations));
    }
  } catch (error) {
    yield put(loadingAction.stopGetOrganisationsLoading());
  }
}

/* -----------------------------------------
 *                 WATCHERS
 * -----------------------------------------
 */

function* getAllOrganisationsWatcher() {
  yield takeLatest(
    actions.ORGANISATION.GET_ALL_ORGANISATIONS,
    getAllOrganisationsWorker
  );
}

export default function* organisationSaga() {
  yield all([getAllOrganisationsWatcher()]);
}
