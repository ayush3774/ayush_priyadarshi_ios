import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import SearchComponent from '../Components/SearchComponent';

test('renders correctly and handles input', () => {
  const mockSetSearchQuery = jest.fn(); // Mock the setSearchQuery function

  const {getByPlaceholderText, getByText} = render(
    <SearchComponent setSearchQuery={mockSetSearchQuery} />, // Pass the mocked function as a prop
  );

  const input = getByPlaceholderText('Enter login');
  const button = getByText('Submit');

  // Simulate typing in the input field
  fireEvent.changeText(input, 'johndoe');

  // Simulate pressing the submit button
  fireEvent.press(button);

  // Assert that the mocked function was called with the correct argument
  expect(mockSetSearchQuery).toHaveBeenCalledWith('johndoe');
});
