import { all, fork } from '@redux-saga/core/effects';

import kudosSaga from './kudos.saga';
import loginSaga from './login.saga';
import registerSaga from './register.saga';
import toastSaga from './toast.saga';
import userSaga from './users.saga';

export default function* rootSaga() {
  yield all([
    fork(kudosSaga),
    fork(loginSaga),
    fork(registerSaga),
    fork(toastSaga),
    fork(userSaga),
  ]);
}
