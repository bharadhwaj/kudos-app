import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import kudosReducer from './kudos.reducer';
import loadingReducer from './loading.reducer';
import organisationReducer from './organisation.reducer';
import toastReducer from './toast.reducer';
import userReducer from './user.reducer';

const rootReducer = history =>
  combineReducers({
    router: connectRouter(history),
    toast: toastReducer,
    loading: loadingReducer,
    organisation: organisationReducer,
    user: userReducer,
    kudos: kudosReducer,
  });

export default rootReducer;
