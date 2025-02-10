import { configureStore , combineReducers} from '@reduxjs/toolkit'
import userReducer from './user/userSlice';
import themeReducer from './theme/themeSlice';
import {persistReducer ,persistStore} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { theme } from 'flowbite-react';


const rootReducer=combineReducers({
    user:userReducer,
    theme:themeReducer,
})

const persistconfig={
    key:'root',
    storage,
    version:1,
}

const persistedReducer=persistReducer(persistconfig,rootReducer)
export const store = configureStore({
  reducer: persistedReducer,
  middleware:(getDefaultMiddleware)=>getDefaultMiddleware({
    serializableCheck:false,
  })
});

export const persistor=persistStore(store);