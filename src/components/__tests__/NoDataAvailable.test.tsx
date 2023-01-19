import { screen } from '@testing-library/react';
import React from 'react';
import { renderWithProviders } from '../../test-utils';
import NoDataAvailable from '../NoDataAvailable';

describe('<NoDataAvailable />', () => {
  test('renders component properly', () => {
    renderWithProviders(<NoDataAvailable />);

    expect(screen.getByText('No reminders available!')).toBeInTheDocument();
  });
});
