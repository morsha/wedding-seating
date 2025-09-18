import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import CategoryPage from './pages/CategoryPage';
import NamesPage from './pages/NamesPage';
import SeatPage from './pages/SeatPage';
import FullMapPage from './pages/FullMapPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/category" element={<CategoryPage />} />
      <Route path="/names" element={<NamesPage />} />
      <Route path="/seat" element={<SeatPage />} />
      <Route path="/fullmap" element={<FullMapPage />} />
    </Routes>
  );
}

export default App;
