import { configureStore, combineReducers } from '@reduxjs/toolkit';
import cartReducer from './cartRedux';

// const rootReducer = combineReducers({ cart: cartReducer });

export const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
});
