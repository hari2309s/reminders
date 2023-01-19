import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TabTypes } from '../../../constants';
import { RootState } from '../../store';

interface UiState {
  currentView: TabTypes;
}

const initialState: UiState = {
  currentView: TabTypes.all,
};

export const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    changeView: (state, action: PayloadAction<TabTypes>) => {
      state.currentView = action.payload;
    },
  },
});

export const selectView = (state: RootState) => state.ui.currentView;

export const { changeView } = uiSlice.actions;

export default uiSlice.reducer;
