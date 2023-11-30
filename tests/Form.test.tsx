import { render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import { describe, expect, it } from 'vitest';
import userEvent from '@testing-library/user-event';
import App from '../src/App';

describe('Form component', () => {
  it('should allow users to search for a word and display the result of the word', async () => {
    render(<App />);
    const user = userEvent.setup();

    const searchInput = screen.getByPlaceholderText('Enter a word...');
    expect(searchInput).toBeInTheDocument();
    await user.type(searchInput, 'hello');
    await waitFor(() => expect(searchInput).toHaveValue('hello'));

    const searchButton = screen.getByRole('button', { name: /Search/i });
    expect(searchButton).toBeInTheDocument();
    await user.click(searchButton);
    await waitFor (() => expect(searchInput).toHaveValue(''));


    //Displaying and checking the results from the API call
    const searchResults = await waitFor(() => screen.getByTestId('search-word'))
    expect(searchResults).toBeInTheDocument();
    expect(screen.getByText('hello')).toBeInTheDocument();
    expect(screen.getByText('noun')).toBeInTheDocument();
    expect(screen.getByText('greeting')).toBeInTheDocument();
    expect(screen.getByText(/bye/i)).toBeInTheDocument();
    expect(screen.getByText(/"Hello!" or an equivalent greeting./i)).toBeInTheDocument();
    expect(screen.getByText(/Is anyone there/i)).toBeInTheDocument();
    expect(screen.getAllByTestId('speaker-phonetics')).toHaveLength(2);
    expect(screen.getByText('/həˈloʊ/')).toBeInTheDocument();
  });
});
