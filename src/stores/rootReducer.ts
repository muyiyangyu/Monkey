/**
 * rootReducer
 * @file
 * @module
 * @auth Yang Xiang
 */
import AsyncStorage from "@react-native-community/async-storage";

import counterSlice from "stores/counterSlice";
import { persistCombineReducers } from "redux-persist";

const reducers = {
  counter: counterSlice
};

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  // There is an issue in the source code of redux-persist (default setTimeout does not cleaning)
  timeout: undefined,
  whitelist: []
};

export const persistedRootReducer = persistCombineReducers(
  persistConfig,
  reducers
);

export type RootState = ReturnType<typeof persistedRootReducer>;

export default persistedRootReducer;
