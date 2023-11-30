import { render, screen } from '@testing-library/react';
import React from 'react';
import { describe, expect, it } from 'vitest';
import App from '../src/App';

describe('App', () => {
    it('should render an header', async () => {
      render(<App />);
      const header = screen.getByText(/Dictionary App/i);
      expect(header).toBeInTheDocument();
    });
});
