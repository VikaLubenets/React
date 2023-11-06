import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import ErrorBoundary from './react-components/ErrorBoundary/ErrorBoundary';
import ErrorMessage from './react-components/ErrorMessage/ErrorMessage';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ErrorBoundary fallback={<ErrorMessage />}>
      <App />
    </ErrorBoundary>
  </React.StrictMode>
);
