import { render, screen } from '@testing-library/react';
import App from './App';

test('renders BIM Viewer brand', () => {
  render(<App />);
  expect(screen.getByText(/BIM Viewer/i)).toBeInTheDocument();
});
