import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/homePage';
import './styles/app.css';

export default function App() {
  return (
    <BrowserRouter>
      <main className="container">
        <Routes>
          <Route path="/" element={<Home />}></Route>
        </Routes>
      </main>
    </BrowserRouter>
  );
}
