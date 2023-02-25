import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { Reminder } from '../../store/features/reminders/remindersSlice';
import { renderWithProviders } from '../../test-utils';
import ReminderCard from '../ReminderCard';

describe('<ReminderCard />', () => {
  const reminderProps: Reminder = {
    id: '123',
    what: 'Buy chicken',
    when: 1696617000000,
    who: 'Kenny',
    createdAt: new Date().getTime().toString(),
    createdBy: 'Hari',
    done: false,
  };

  const mockedSetShowDeleteModal = jest.fn();

  test('renders component properly', () => {
    renderWithProviders(
      <ReminderCard
        {...reminderProps}
        setShowDeleteModal={mockedSetShowDeleteModal}
      />
    );

    expect(screen.getByText('Buy chicken')).toBeInTheDocument();
    expect(screen.getByText('Kenny')).toBeInTheDocument();
  });

  test.skip('clicking on Mark as done button dispatches action to update the reminder', () => {
    const { store } = renderWithProviders(
      <ReminderCard
        {...reminderProps}
        setShowDeleteModal={mockedSetShowDeleteModal}
      />,
      {
        preloadedState: {
          reminders: {
            reminders: [reminderProps],
          },
        },
      }
    );

    store.dispatch = jest.fn();

    const doneButton = screen.getByRole('button', { name: 'Mark as done' });

    userEvent.click(doneButton);

    expect(store.dispatch).toHaveBeenCalledTimes(1);
  });

  test('clicking on Delete button setShowDeleteModal with respective reminder id ', () => {
    const { store } = renderWithProviders(
      <ReminderCard
        {...reminderProps}
        setShowDeleteModal={mockedSetShowDeleteModal}
      />,
      {
        preloadedState: {
          reminders: {
            reminders: [reminderProps],
          },
        },
      }
    );

    store.dispatch = jest.fn();

    const deleteButton = screen.getByRole('button', { name: 'Delete' });

    userEvent.click(deleteButton);

    expect(mockedSetShowDeleteModal).toHaveBeenCalledTimes(1);
    expect(mockedSetShowDeleteModal).toHaveBeenCalledWith('123');
  });
});
