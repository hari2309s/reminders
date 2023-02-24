import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../store';

export interface Reminder {
  id: string;
  what: string;
  when: number;
  who: string;
  createdAt: string;
  createdBy: string;
  done: boolean;
}

interface RemindersState {
  reminders: Reminder[];
}

const initialState: RemindersState = {
  reminders: [],
};

export const remindersSlice = createSlice({
  name: 'reminders',
  initialState,
  reducers: {
    createReminder: (state, action: PayloadAction<Reminder>) => {
      state.reminders = [...state.reminders, action.payload];
    },
    updateReminder: (state, action: PayloadAction<string>) => {
      const reminderIndex = state.reminders.findIndex(
        (reminder) => reminder.id === action.payload
      );
      if (reminderIndex > -1) {
        state.reminders[reminderIndex].done = true;
      }
    },
    deleteReminder: (state, action: PayloadAction<string>) => {
      state.reminders = state.reminders.filter(
        (reminder) => reminder.id !== action.payload
      );
    },
  },
});

export const selectReminders = (state: RootState) => state.reminders.reminders;

export const { createReminder, updateReminder, deleteReminder } =
  remindersSlice.actions;

export default remindersSlice.reducer;
