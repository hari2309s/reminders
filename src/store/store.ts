import { combineReducers, configureStore, Store } from '@reduxjs/toolkit';
import uiReducer from '../store/features/ui/uiSlice';
import remindersReducer from '../store/features/reminders/remindersSlice';

export const store: Store = configureStore({
  reducer: combineReducers({
    ui: uiReducer,
    reminders: remindersReducer,
  }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
