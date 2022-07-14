/* 
  This is a combined place where our state lives, but also where we receive actions and we dispatch 
  them into our reducers to update the state. 
*/
import {
  compose,
  legacy_createStore as createStore,
  applyMiddleware,
  Middleware,
} from "redux";
import logger from "redux-logger";
import { persistStore, persistReducer, PersistConfig } from "redux-persist";
import storage from "redux-persist/lib/storage";
// import thunk from "redux-thunk";
import createSagaMiddleware from "redux-saga";

import { rootSaga } from "./root-saga";

import { rootReducer } from "./root-reducer";

export type RootState = ReturnType<typeof rootReducer>;

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

type ExtendedPersistConfig = PersistConfig<RootState> & {
  whitelist: (keyof RootState)[];
};

const persistConfig: ExtendedPersistConfig = {
  key: "root", //persist from the root level
  storage, //store into by default the browser's local storage
  whitelist: ["cart"], //blacklist reducers we don't want to persist
};

const sagaMiddleware = createSagaMiddleware();

const persistedReducer = persistReducer(persistConfig, rootReducer);

const middleWares = [
  process.env.NODE_ENV !== "production" && logger,
  sagaMiddleware,
].filter((middleware): middleware is Middleware => Boolean(middleware)); //use logger if not in production mode, otherwise nothing

const composeEnhanser =
  (process.env.NODE_ENV !== "production" &&
    window &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose; //use the redux devtool if there is a window object and there is __REDUX_DEVTOOLS_EXTENSION_COMPOSE__, otherwise use the regular compose

const composedEnhansers = composeEnhanser(applyMiddleware(...middleWares));

export const store = createStore(
  persistedReducer,
  undefined,
  composedEnhansers
);

sagaMiddleware.run(rootSaga);

export const persistor = persistStore(store);
