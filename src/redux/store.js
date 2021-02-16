import { combinedReducers } from './mainReducer';
import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { mainSaga } from './mainSaga';
import { persistReducer, persistCombineReducers } from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';

const sagaMiddleware = createSagaMiddleware();

/**
 * this app uses React Native Debugger, but it works without it
 */

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const middlewares = [sagaMiddleware /** more middlewares if any goes here */];

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['app'],
};
const persistedReducer = persistCombineReducers(
  persistConfig,
  combinedReducers,
);

const store = createStore(
  persistedReducer,
  composeEnhancers(applyMiddleware(...middlewares)),
);

sagaMiddleware.run(mainSaga);

export { store };
