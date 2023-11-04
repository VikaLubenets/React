import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/HomePage';

export default function App() {
  return (
    <BrowserRouter>
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />}>
            {/* <Route path="/" element={(props) => <Details {...props} />} /> */}
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}
