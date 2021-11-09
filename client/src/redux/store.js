import { configureStore, combineReducers } from '@reduxjs/toolkit';
import cartReducer from './cartRedux';
import userReducer from './userRedux';

// const rootReducer = combineReducers({ cart: cartReducer });

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    user: userReducer,
  },
});
