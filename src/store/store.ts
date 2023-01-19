import { combineReducers, configureStore, Store } from '@reduxjs/toolkit';
import uiReducer from '../store/features/ui/uiSlice';

export const store: Store = configureStore({
  reducer: combineReducers({
    ui: uiReducer,
  }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
