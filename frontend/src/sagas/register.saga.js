import axios from 'axios';
import { all, put, takeLatest } from '@redux-saga/core/effects';
import { push } from 'connected-react-router';

import { loadingAction, toastAction, userAction } from '../actions';

import { actions, urls, utils } from '../constants';

import handleError from '../utils/errorHandler';
import { updateUserLoginInfo } from '../utils/users';

/* -----------------------------------------
 *                 WORKERS
 * -----------------------------------------
 */

function* registerSubmitWorker({ payload }) {
  try {
    handleError(axios);
    const requestURL = urls.REGISTER_URL;

    const body = payload.userData;

    const headers = {
      'Content-Type': 'application/json',
    };

    const response = yield axios.post(requestURL, body, { headers });

    yield put(loadingAction.stopRegisterLoading());

    if (response && response.status === 201) {
      const { data } = response;
      const { message } = data;
      const { user } = data.data;

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

function* registerSubmitWatcher() {
  yield takeLatest(actions.REGISTER.REGISTER_USER, registerSubmitWorker);
}

export default function* registerSaga() {
  yield all([registerSubmitWatcher()]);
}
