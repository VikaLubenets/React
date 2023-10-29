import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import ErrorBoundary from '../react-components/errorBoundary';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ErrorBoundary fallback="Error has been occured. Try again later">
      <App />
    </ErrorBoundary>
  </React.StrictMode>
);
