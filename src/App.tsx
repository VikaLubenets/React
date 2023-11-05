import { Route, BrowserRouter, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Details from './react-components/Details/Details';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />}>
          <Route path="details/:id" element={<Details />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
