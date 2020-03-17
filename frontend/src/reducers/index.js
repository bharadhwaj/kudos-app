import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import kudosReducer from './kudos.reducer';
import loadingReducer from './loading.reducer';
import loginReducer from './login.reducer';
import registerReducer from './register.reducer';
import toastReducer from './toast.reducer';
import userReducer from './user.reducer';

const rootReducer = history =>
  combineReducers({
    router: connectRouter(history),
    toast: toastReducer,
    register: registerReducer,
    loading: loadingReducer,
    login: loginReducer,
    user: userReducer,
    kudos: kudosReducer,
  });

export default rootReducer;
