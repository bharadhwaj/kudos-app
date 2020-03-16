import { toastAction } from '../actions';
import { utils } from '../constants';

import store from './store';

const handleError = axios => {
  axios.interceptors.response.use(
    response => response,
    error => {
      const { status, data } = error.response;
      if (status === utils.APPLICATION_ERROR_STATUS_CODES.UNAUTHORIZED) {
        const { message } = data;
        store.dispatch(
          toastAction.requestToShowToast(
            utils.MESSAGE_VARIANTS.WARNING,
            message
          )
        );
      } else if (status === utils.APPLICATION_ERROR_STATUS_CODES.FORBIDDEN) {
        store.dispatch(
          toastAction.requestToShowToast(
            utils.MESSAGE_VARIANTS.WARNING,
            'You are not allowed to access this.'
          )
        );
      } else if (
        status === utils.APPLICATION_ERROR_STATUS_CODES.MISSING_PARAMS ||
        status === utils.APPLICATION_ERROR_STATUS_CODES.NOT_FOUND
      ) {
        store.dispatch(
          toastAction.requestToShowToast(
            utils.MESSAGE_VARIANTS.WARNING,
            'The request you sent looks incomplete. Please check and try again.'
          )
        );
      } else if (
        status === utils.APPLICATION_ERROR_STATUS_CODES.INTERNAL_SERVER_ERROR
      ) {
        store.dispatch(
          toastAction.requestToShowToast(
            utils.MESSAGE_VARIANTS.ERROR,
            'Some issue occured with the server. Please try again in sometime.'
          )
        );
      }
      return Promise.reject(error);
    }
  );
};

export default handleError;
