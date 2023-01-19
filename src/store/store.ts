import {
  combineReducers,
  configureStore,
  PreloadedState,
} from '@reduxjs/toolkit';
import uiReducer from '../store/features/ui/uiSlice';
import remindersReducer from '../store/features/reminders/remindersSlice';

const rootReducer = combineReducers({
  reminders: remindersReducer,
  ui: uiReducer,
});

export const setupStore = (preloadedState?: PreloadedState<RootState>) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
