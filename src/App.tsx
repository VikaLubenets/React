import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/home';
import Item from './pages/item';
import './styles/app.css';

export default function App() {
  return (
    <BrowserRouter>
      <main className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="item" element={<Item />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}
