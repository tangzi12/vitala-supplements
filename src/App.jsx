import { useState, useCallback } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/Home';
import Products from './components/Products';
import ProductDetail from './components/ProductDetail';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import Login from './components/Login';
import Register from './components/Register';
import Account from './components/Account';

export default function App() {
  const [page, setPage] = useState('home');
  const [productId, setProductId] = useState(null);

  const handleNavigate = useCallback((target, id) => {
    setProductId(id || null);
    setPage(target);
    window.scrollTo(0, 0);
  }, []);

  const renderPage = () => {
    switch (page) {
      case 'home': return <Home onNavigate={handleNavigate} />;
      case 'products': return <Products onNavigate={handleNavigate} />;
      case 'product': return <ProductDetail productId={productId} onNavigate={handleNavigate} />;
      case 'cart': return <Cart onNavigate={handleNavigate} />;
      case 'checkout': return <Checkout onNavigate={handleNavigate} />;
      case 'login': return <Login onNavigate={handleNavigate} />;
      case 'register': return <Register onNavigate={handleNavigate} />;
      case 'account': return <Account onNavigate={handleNavigate} />;
      default: return <Home onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className="min-h-screen bg-cream font-body">
      <Header onNavigate={handleNavigate} currentPage={page} />
      <main>{renderPage()}</main>
      <Footer onNavigate={handleNavigate} />
    </div>
  );
}
