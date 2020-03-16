import { all, delay, put, select, takeEvery } from '@redux-saga/core/effects';

import { toastAction } from '../actions';

import { actions } from '../constants';

import { toastSelector } from '../selectors';

function* showToastWorker() {
  const toastVariant = yield select(toastSelector.getToastVariant());
  const toastMessage = yield select(toastSelector.getToastMessage());

  yield put(toastAction.hideToast());
  yield delay(100);
  yield put(toastAction.showToast(toastVariant, toastMessage));
}

function* showToastWatcher() {
  yield takeEvery(actions.TOAST.REQUEST_TO_SHOW_TOAST, showToastWorker);
}

export default function* toastSaga() {
  yield all([showToastWatcher()]);
}
