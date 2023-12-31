import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { describe, expect, it } from 'vitest';
import App from "../src/App";

describe('App', () => {
    it('should render an error message when it is an empty search', async () => {
      render(<App />);
      const user = userEvent.setup();
      
      // Get the search input and assert its initial state
      const searchInput = screen.getByPlaceholderText('Enter a word...');
      expect(searchInput).toBeInTheDocument();
      expect(searchInput).toHaveValue('');
    
      // Get the search button, click it, and wait for the error message
      const searchButton = screen.getByRole('button', { name: /Search/i });
      expect(searchButton).toBeInTheDocument();
      await user.click(searchButton);
      const errorMessage = await screen.findByText('Empty Search');
      expect(errorMessage).toBeInTheDocument();
    });

    it('should render an error message when it is an incorrect word', async () => {
        render(<App />);
        const user = userEvent.setup();

        // Get the search input and assert its initial state
        const searchInput = screen.getByPlaceholderText('Enter a word...');
        expect(searchInput).toBeInTheDocument();
        expect(searchInput).toHaveValue('');
        
        // Type an incorrect word in the search-input, wait for the value to be updated
        await user.type(searchInput, 'hellooo');
        await waitFor(() => expect(searchInput).toHaveValue('hellooo'));
      
        // Get the search button, click it, and wait for the error message to be displayed
        const searchButton = screen.getByRole('button', { name: /Search/i });
        expect(searchButton).toBeInTheDocument();
        await user.click(searchButton);
        const errorMessage = await screen.findByText('No Definitions Found');
        expect(errorMessage).toBeInTheDocument();
    });
});