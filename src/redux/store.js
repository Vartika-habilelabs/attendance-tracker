import { configureStore } from '@reduxjs/toolkit';
import majdoorReducer from './majdoorSlice';
import transactionReducer from './transactionSlice';

export const store = configureStore({
  reducer: {
    majdoors: majdoorReducer,
    transactions: transactionReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'],
      },
    }),
});

export default store; 