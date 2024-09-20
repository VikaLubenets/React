import { Route, BrowserRouter, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage';
import Details from './pages/Details/Details';

export default function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Routes>
          <Route path="/" element={<HomePage />}>
            <Route path="details/:id" element={<Details />} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}
