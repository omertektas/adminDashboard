import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import CounterPage from './pages/CounterPage';
import FoodPage from './pages/FoodPage';

function App() {
  return (
    <BrowserRouter>
      <nav style={{ textAlign: 'center', marginBottom: '20px' }}>
        <Link to="/">Ana Sayfa</Link> |{' '}
        <Link to="/counter">Sayaç</Link> |{' '}
        <Link to="/food">Yemek Listesi</Link>
      </nav>
    
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/counter" element={<CounterPage />} />
        <Route path="/food" element={<FoodPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
