import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import Dealers from './pages/Dealers';
import News from './pages/News';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:slug" element={<ProductDetail />} />
        <Route path="/dealers" element={<Dealers />} />
        <Route path="/news" element={<News />} />
      </Routes>
    </Router>
  );
}

export default App;
