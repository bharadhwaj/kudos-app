import axios from 'axios';
import { all, put, select, takeLatest } from '@redux-saga/core/effects';
import { push } from 'connected-react-router';

import {
  loadingAction,
  registerAction,
  toastAction,
  userAction,
} from '../actions';

import { actions, urls, utils } from '../constants';

import { registerSelector } from '../selectors';

import handleError from '../utils/errorHandler';
import { updateUserLoginInfo } from '../utils/users';

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

      yield put(registerAction.updateOrganisationData(organisations));
    }
  } catch (error) {
    yield put(loadingAction.stopGetOrganisationsLoading());
  }
}

function* registerSubmitWorker() {
  try {
    handleError(axios);
    const requestURL = urls.REGISTER_URL;

    const body = yield select(registerSelector.getRegisterBody());

    const headers = {
      'Content-Type': 'application/json',
    };

    const response = yield axios.post(requestURL, body, { headers });

    yield put(loadingAction.stopRegisterLoading());

    if (response && response.status === 201) {
      const { data } = response;
      const { message } = data;
      const { user } = data.data;
      console.log('RESPONSE: ', data);

      updateUserLoginInfo(user);

      yield put(
        toastAction.requestToShowToast(utils.MESSAGE_VARIANTS.SUCCESS, message)
      );

      yield put(userAction.updateBasicUserInfo(user));
      yield put(push('/'));
    }
  } catch (error) {
    yield put(loadingAction.stopRegisterLoading());
  }
}

/* -----------------------------------------
 *                 WATCHERS
 * -----------------------------------------
 */

function* getAllOrganisationsWatcher() {
  yield takeLatest(
    actions.REGISTER.GET_ALL_ORGANISATIONS,
    getAllOrganisationsWorker
  );
}

function* registerSubmitWatcher() {
  yield takeLatest(actions.REGISTER.REGISTER_USER, registerSubmitWorker);
}

export default function* registerSaga() {
  yield all([getAllOrganisationsWatcher(), registerSubmitWatcher()]);
}
