import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import appReducer from "./appReducer";
import dataReducer from "./dataReducer";
import { persistStore, persistReducer } from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";
import storage from "redux-persist/lib/storage";
import { composeWithDevTools } from "redux-devtools-extension";

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  // whitelist: ['bookmarks']
};

const rootReducer = combineReducers({ appReducer, dataReducer });

export type rootState = ReturnType<typeof rootReducer>;

const persistedReducer = persistReducer(persistConfig, rootReducer);

//export const store = createStore(rootReducer, applyMiddleware(thunk));

export default () => {
  let store = createStore(
    persistedReducer,
    composeWithDevTools(applyMiddleware(thunk))
  );
  let persistor = persistStore(store);
  return { store, persistor };
};
