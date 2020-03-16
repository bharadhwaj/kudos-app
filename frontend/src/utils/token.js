import { push } from 'connected-react-router';

import { toastAction, userAction } from '../actions';
import { storage, utils } from '../constants';
import { checkIfUserIsLoggedIn, logoutUser } from './users';

const checkTokenExpiration = store => next => action => {
  const tokenExpireAt = +localStorage.getItem(storage.USER.EXPIRE_AT);
  const { isLoggedIn } = checkIfUserIsLoggedIn();

  if (!isLoggedIn && tokenExpireAt) {
    logoutUser();

    store.dispatch(
      toastAction.requestToShowToast(
        utils.MESSAGE_VARIANTS.WARNING,
        'Your session has expired. Please login again.'
      )
    );

    setTimeout(() => {
      store.dispatch(userAction.resetUserInfo());
      store.dispatch(push('/login'));
    }, 3000);
  }

  next(action);
};

export default checkTokenExpiration;
