import axios from 'axios';
import { all, put, select, takeLatest } from '@redux-saga/core/effects';

import { kudosAction, loadingAction } from '../actions';

import { actions, urls } from '../constants';

import { userSelector } from '../selectors';

import handleError from '../utils/errorHandler';

/* -----------------------------------------
 *                 WORKERS
 * -----------------------------------------
 */

function* fetchAllKudosWorker() {
  try {
    handleError(axios);

    const userId = yield select(userSelector.getCurrentUserId());

    const requestURL = urls.FETCH_ALL_KUDOS.replace(/<USER_ID>/, userId);

    const authToken = yield select(userSelector.getAuthToken());

    const headers = {
      'Content-Type': 'application/json',
      Authorization: authToken,
    };

    const response = yield axios.get(requestURL, { headers });

    yield put(loadingAction.stopFetchKudosLoading());

    if (response && response.status === 200) {
      const { data } = response;
      yield put(kudosAction.updateKudosData(data.data));
    }
  } catch (error) {
    yield put(loadingAction.stopFetchKudosLoading());
  }
}

function* giveKudosToUserWorker({ payload }) {
  try {
    handleError(axios);

    const userId = yield select(userSelector.getCurrentUserId());

    const requestURL = urls.GIVE_KUDOS_TO_USER.replace(/<USER_ID>/, userId);

    const body = payload;

    const authToken = yield select(userSelector.getAuthToken());

    const headers = {
      'Content-Type': 'application/json',
      Authorization: authToken,
    };

    const response = yield axios.post(requestURL, body, { headers });

    yield put(loadingAction.stopGiveKudosToUserLoading());

    if (response && response.status === 201) {
      const { data } = response;
      const { kudos } = data.data;
      yield put(kudosAction.kudosGivenSuccessfully(kudos));
    }
  } catch (error) {
    yield put(loadingAction.stopGiveKudosToUserLoading());
  }
}

/* -----------------------------------------
 *                 WATCHERS
 * -----------------------------------------
 */

function* fetchAllKudosWatcher() {
  yield takeLatest(actions.KUDOS.FETCH_ALL_KUDOS, fetchAllKudosWorker);
}

function* giveKudosToUserWatcher() {
  yield takeLatest(actions.KUDOS.GIVE_KUDOS_TO_USER, giveKudosToUserWorker);
}

export default function* loginSaga() {
  yield all([fetchAllKudosWatcher(), giveKudosToUserWatcher()]);
}
