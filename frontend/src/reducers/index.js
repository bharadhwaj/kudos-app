import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import loadingReducer from './loading.reducer';
import loginReducer from './login.reducer';
import toastReducer from './toast.reducer';
import userReducer from './user.reducer';

const rootReducer = history =>
  combineReducers({
    router: connectRouter(history),
    toast: toastReducer,
    loading: loadingReducer,
    login: loginReducer,
    user: userReducer,
  });

export default rootReducer;
