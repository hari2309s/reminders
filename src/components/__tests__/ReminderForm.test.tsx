import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { renderWithProviders } from '../../test-utils';
import ReminderForm from '../ReminderForm';

describe('<ReminderForm />', () => {
  const mockedSetIsOpen = jest.fn();

  test('renders component properly', () => {
    renderWithProviders(
      <ReminderForm
        setIsOpen={() => {
          return;
        }}
      />
    );

    expect(
      screen.getByRole('heading', { name: 'New reminder' })
    ).toBeInTheDocument();

    expect(screen.getByLabelText('What')).toBeInTheDocument();
    expect(screen.getByLabelText('When')).toBeInTheDocument();
    expect(screen.getByLabelText('Who')).toBeInTheDocument();

    expect(screen.getByRole('button', { name: 'Cancel' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Create' })).toBeInTheDocument();
  });

  test('filling the form and clicking on Create button dispatches action to create a reminder', async () => {
    const { store } = renderWithProviders(
      <ReminderForm setIsOpen={mockedSetIsOpen} />
    );

    store.dispatch = jest.fn();

    const nameInput = screen.getByLabelText('What');
    expect(nameInput).toBeInTheDocument();

    userEvent.type(nameInput, 'Buy KFC');

    const whenInput = screen.getByLabelText('When');
    expect(whenInput).toBeInTheDocument();

    userEvent.type(whenInput, '2023-01-08');

    const whoInput = screen.getByLabelText('Who');
    expect(whoInput).toBeInTheDocument();

    userEvent.selectOptions(whoInput, 'cartman');

    const options = screen.getAllByTestId('who-option');

    expect((options[0] as HTMLOptionElement).selected).toBeFalsy();
    expect((options[1] as HTMLOptionElement).selected).toBeTruthy();
    expect((options[2] as HTMLOptionElement).selected).toBeFalsy();
    expect((options[3] as HTMLOptionElement).selected).toBeFalsy();

    const createButton = screen.getByRole('button', { name: 'Create' });

    userEvent.click(createButton);

    expect(mockedSetIsOpen).toHaveBeenCalledTimes(1);

    expect(store.dispatch).toHaveBeenCalledTimes(1);

    expect(store.dispatch).toHaveBeenCalledWith({
      payload: {
        createdAt: expect.any(String),
        createdBy: 'Hari',
        done: false,
        id: expect.any(String),
        what: 'Buy KFC',
        when: expect.any(Number),
        who: 'cartman',
      },
      type: 'reminders/createReminder',
    });
  });

  test('clicking on Cancel button closes the modal', () => {
    renderWithProviders(<ReminderForm setIsOpen={mockedSetIsOpen} />);

    const cancelButton = screen.getByRole('button', { name: 'Cancel' });

    userEvent.click(cancelButton);

    expect(mockedSetIsOpen).toHaveBeenCalledTimes(1);
  });
});
