import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { Reminder } from '../../store/features/reminders/remindersSlice';
import { renderWithProviders } from '../../test-utils';
import ReminderCard from '../ReminderCard';

describe('<ReminderCard />', () => {
  const reminderProps: Reminder = {
    id: '123',
    name: 'Buy chicken',
    when: '12/02/2023',
    who: 'Kenny',
    createdAt: new Date().getTime().toString(),
    createdBy: 'Hari',
    done: false,
  };

  test('renders component properly', () => {
    renderWithProviders(<ReminderCard {...reminderProps} />);

    expect(screen.getByText('Buy chicken')).toBeInTheDocument();
    expect(screen.getByText('12/02/2023')).toBeInTheDocument();
    expect(screen.getByText('Kenny')).toBeInTheDocument();
    expect(screen.getByText('Hari')).toBeInTheDocument();
  });

  test('clicking on Mark as done button dispatches action to update the reminder', () => {
    const { store } = renderWithProviders(<ReminderCard {...reminderProps} />);

    store.dispatch = jest.fn();

    const doneButton = screen.getByRole('button', { name: 'Mark as done' });

    userEvent.click(doneButton);

    expect(store.dispatch).toHaveBeenCalledTimes(1);
  });
});
