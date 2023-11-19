import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import App from './App';
import ErrorBoundary from './react-components/ErrorBoundary/ErrorBoundary';
import ErrorMessage from './react-components/ErrorMessage/ErrorMessage';
import { setupStore } from './store';
import { initializeSavedTerm } from './store/reducers/productsReducer';

const store = setupStore();
store.dispatch(initializeSavedTerm());

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ErrorBoundary fallback={<ErrorMessage />}>
      <BrowserRouter>
        <Provider store={store}>
          <App />
        </Provider>
      </BrowserRouter>
    </ErrorBoundary>
  </React.StrictMode>
);
