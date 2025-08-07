import { render, screen } from '@testing-library/react';
import App from './App';
import axios from 'axios';

jest.mock('axios');

test('renders learn react link', async () => {
  // Mock GET /api/values/current
  axios.get.mockImplementation((url) => {
    switch (url) {
      case '/api/values/current':
        return Promise.resolve({ data: { 1: 1, 2: 1, 3: 2 } });
      case '/api/values/all':
        return Promise.resolve({ data: [{ number: 1 }, { number: 2 }, { number: 3 }] });
      default:
        return Promise.resolve({ data: {} });
    }
  });

  render(<App />);

  // This is the original test
  const linkElement = await screen.findByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});