import { Route, BrowserRouter, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage';
import Details from './pages/Details/Details';
import Page404 from './pages/Page404/Page404';

export default function App() {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<HomePage />}>
          <Route path="details/:id" element={<Details />} />
        </Route>
        <Route path="*" element={<Page404 />} />
      </Routes>
    </div>
  );
}
