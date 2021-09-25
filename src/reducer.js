import { combineReducers } from 'redux';
import AccountReducer from './modules/account/reducer';
import HomeReducer from './modules/home/reducer';
import SearchReducer from './modules/search/reducer';
import BrokerReducer from './modules/broker/reducer';
import NotificationReducer from './modules/notification/reducer';
import { initStateAccount } from './modules/account/reducer';
import { initStateHome } from './modules/home/reducer';
import WatchlistReducer from './modules/watchlist/reducer';
import { initStateWatchlist } from './modules/watchlist/reducer';
import { initStateOrders } from './modules/orders/reducer';
import OrdersReducer from './modules/orders/reducer';
import { initStateSearch } from './modules/search/reducer';
import { initStateBroker } from './modules/broker/reducer';
import { initStateNotification } from './modules/notification/reducer';
import { initStateBuyAsset } from './modules/buy-assets/reducer';
import buyAssetReducer from './modules/buy-assets/reducer';

export const appDefaultReducer = {
  account: initStateAccount,
  home: initStateHome,
  orders: initStateOrders,
  search: initStateSearch,
  broker: initStateBroker,
  watchlist: initStateWatchlist,
  buyAsset: initStateBuyAsset,
  notification: initStateNotification,
};

const appReducer = combineReducers({
  account: AccountReducer,
  home: HomeReducer,
  watchlist: WatchlistReducer,
  orders: OrdersReducer,
  search: SearchReducer,
  broker: BrokerReducer,
  buyAsset: buyAssetReducer,
  notification: NotificationReducer,
});

export default function rootReducer(state, action) {
  let finalState = appReducer(state, action);
  if (action.type === 'RESET_STORE') {
    finalState = appDefaultReducer; //resetReducer(finalState, action);
  }
  return finalState;
}
