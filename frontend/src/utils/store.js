import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { routerMiddleware } from 'connected-react-router';

import history from './history';
import rootReducer from '../reducers';
import rootSaga from '../sagas';

import checkTokenExpiration from './token';

const sagaMiddleWare = createSagaMiddleware();

const composeEnhancers =
  process.env.NODE_ENV !== 'production' &&
  typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        shouldHotReload: false,
      })
    : compose;

const enhancers = [
  applyMiddleware(
    sagaMiddleWare,
    checkTokenExpiration,
    routerMiddleware(history)
  ),
];
const store = createStore(rootReducer(history), composeEnhancers(...enhancers));
sagaMiddleWare.run(rootSaga);

export default store;
