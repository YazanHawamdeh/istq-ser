import { combineReducers } from 'redux';

import Layout from './layout/reducer';
import USERS_STORE from './users/reducers';
import UTILS_STORE from './utils/reducers';
import ORDERS_STORE from './order/reducers';
import STOCK_STORE from './stocks/reducers';
import LOOKUPS_STORE from './lookups/reducers';

const rootReducer = combineReducers({ Layout, USERS_STORE, UTILS_STORE, ORDERS_STORE, STOCK_STORE, LOOKUPS_STORE });

export default rootReducer;
