import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import ReduxThunk from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import logger from 'redux-logger';
import rootReducer from './reducers';
import rootSaga from './sagas';

const persistConfig = {
  key: 'root',
  storage: storage,
  whitelist: ['users', 'companies'],
};

const pReducer = persistReducer(persistConfig, rootReducer);

const sagaMiddleware = createSagaMiddleware();
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(pReducer, composeEnhancers(applyMiddleware(ReduxThunk, logger, sagaMiddleware)));

sagaMiddleware.run(rootSaga);

export default store;
