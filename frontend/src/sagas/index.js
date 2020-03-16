import { all, fork } from '@redux-saga/core/effects';

import loginSaga from './login.saga';
import toastSaga from './toast.saga';

export default function* rootSaga() {
  yield all([fork(loginSaga), fork(toastSaga)]);
}
