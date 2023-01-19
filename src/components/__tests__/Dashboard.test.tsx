import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { renderWithProviders } from '../../test-utils';
import Dashboard from '../Dashboard';

describe('<Dashboard />', () => {
  test('renders component properly', () => {
    renderWithProviders(<Dashboard />);

    expect(screen.getByText('All')).toBeInTheDocument();
    expect(screen.getByText('Done')).toBeInTheDocument();
    expect(screen.getByText('Pending')).toBeInTheDocument();

    expect(screen.getByText('Create')).toBeInTheDocument();

    expect(screen.getByText('No reminders available!')).toBeInTheDocument();
  });

  test('clicking on Create button opens Modal', () => {
    renderWithProviders(<Dashboard />);

    expect(screen.queryByTestId('create-modal')).not.toBeInTheDocument();

    const createButton = screen.getByRole('button', { name: 'Create' });

    userEvent.click(createButton);

    expect(screen.getByTestId('create-modal')).toBeInTheDocument();
  });

  test('renders reminders', () => {
    renderWithProviders(<Dashboard />, {
      preloadedState: {
        reminders: {
          reminders: [
            {
              name: 'Buy milk',
              when: '01/02/2023',
              who: 'Cartman',
              createdBy: 'Hari',
              createdAt: new Date().getTime().toString(),
              done: false,
            },
          ],
        },
      },
    });

    expect(
      screen.queryByText('No reminders available!')
    ).not.toBeInTheDocument();

    expect(screen.getAllByTestId('reminder-card')).toHaveLength(1);

    expect(screen.getByText('Buy milk')).toBeInTheDocument();
    expect(screen.getByText('01/02/2023')).toBeInTheDocument();
    expect(screen.getByText('Cartman')).toBeInTheDocument();
    expect(screen.getByText('Hari')).toBeInTheDocument();
  });

  test('clicking on Tab options, filters and renders the correct reminders', () => {
    renderWithProviders(<Dashboard />, {
      preloadedState: {
        reminders: {
          reminders: [
            {
              name: 'Buy KFC',
              when: '01/02/2023',
              who: 'Cartman',
              createdBy: 'Hari',
              createdAt: new Date().getTime().toString(),
              done: false,
            },
            {
              name: 'Buy bread',
              when: '01/02/2023',
              who: 'Kenny',
              createdBy: 'Hari',
              createdAt: new Date().getTime().toString(),
              done: false,
            },
            {
              name: 'Visit farm',
              when: '01/02/2023',
              who: 'Stan',
              createdBy: 'Hari',
              createdAt: new Date().getTime().toString(),
              done: false,
            },
            {
              name: "TP Garisson's house :D",
              when: '01/02/2023',
              who: 'Cartman',
              createdBy: 'Hari',
              createdAt: new Date().getTime().toString(),
              done: true,
            },
          ],
        },
      },
    });

    // shows all the reminders by default
    expect(screen.getAllByTestId('reminder-card')).toHaveLength(4);

    // filter only Done reminders
    userEvent.click(screen.getByRole('button', { name: 'Done' }));

    expect(screen.getAllByTestId('reminder-card')).toHaveLength(1);
    expect(screen.getByText("TP Garisson's house :D")).toBeInTheDocument();
    expect(screen.queryByText('Visit farm')).not.toBeInTheDocument();

    // filter only Pending reminders
    userEvent.click(screen.getByRole('button', { name: 'Pending' }));

    expect(screen.getAllByTestId('reminder-card')).toHaveLength(3);
    expect(
      screen.queryByText("TP Garisson's house :D")
    ).not.toBeInTheDocument();
    expect(screen.getByText('Visit farm')).toBeInTheDocument();
  });
});