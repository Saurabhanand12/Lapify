import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authSlice from  './authSlice.js';

import { persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST,PURGE,REGISTER} from "redux-persist";
import storageModule from "redux-persist/lib/storage";

const storage = storageModule.default || storageModule;

const rootReducer = combineReducers({
    auth : authSlice,
});

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export default store;
