import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from '../../App';
import { MemoryRouter } from 'react-router-dom';

test('404 page is displayed when navigating to an invalid route', () => {
  const badRoute = '/some/bad/route';

  render(
    <MemoryRouter initialEntries={[badRoute]}>
      <App />
    </MemoryRouter>
  );

  expect(screen.getByText('Page not found')).toBeInTheDocument();
});
