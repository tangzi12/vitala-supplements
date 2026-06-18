import { useState, useEffect } from 'react';
import { getCurrentUser, logout, getCartCount, subscribe } from '../store';

export default function Header({ onNavigate, currentPage }) {
  const [user, setUser] = useState(getCurrentUser());
  const [cartCount, setCartCount] = useState(getCartCount());
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const unsub = subscribe(() => {
      setUser(getCurrentUser());
      setCartCount(getCartCount());
    });
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll);
    return () => { unsub(); window.removeEventListener('scroll', onScroll); };
  }, []);

  const handleLogout = () => { logout(); onNavigate('home'); setMenuOpen(false); };

  const linkClass = (id) =>
    `text-[14px] font-medium transition-colors cursor-pointer tracking-tight ${
      currentPage === id ? 'text-ritual-navy' : 'text-surface-300 hover:text-ritual-navy'
    }`;

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-white/95 backdrop-blur-sm border-b border-surface-100' : 'bg-white'
    }`}>
      <div className="max-w-[1280px] mx-auto px-6 lg:px-10">
        <div className="flex items-center justify-between h-[64px]">
          {/* Logo — clean wordmark */}
          <div onClick={() => onNavigate('home')} className="cursor-pointer">
            <span className="text-[22px] font-semibold text-ritual-navy tracking-tight">Vitala</span>
          </div>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            <span onClick={() => onNavigate('products')} className={linkClass('products')}>Shop</span>
            <span className={linkClass('about')}>Our Standards</span>
            <span className={linkClass('journal')}>Journal</span>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-5">
            <button onClick={() => onNavigate('cart')} className="relative text-ritual-navy hover:opacity-70 transition-opacity">
              <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-ritual-navy text-white text-[10px] w-[18px] h-[18px] rounded-full flex items-center justify-center font-medium">
                  {cartCount}
                </span>
              )}
            </button>

            {user ? (
              <div className="hidden md:flex items-center gap-4">
                <button onClick={() => onNavigate('account')} className="text-[14px] text-ritual-navy font-medium hover:opacity-70">
                  Account
                </button>
                <button onClick={handleLogout} className="text-[13px] text-surface-300 hover:text-ritual-navy">Log out</button>
              </div>
            ) : (
              <button onClick={() => onNavigate('login')} className="hidden md:block text-[14px] font-medium text-ritual-navy hover:opacity-70">
                Log in
              </button>
            )}

            {/* Mobile hamburger */}
            <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden text-ritual-navy">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                {menuOpen
                  ? <path strokeLinecap="round" d="M6 18L18 6M6 6l12 12" />
                  : <path strokeLinecap="round" d="M4 6h16M4 12h16M4 18h16" />
                }
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden py-6 border-t border-surface-100">
            <div onClick={() => { onNavigate('products'); setMenuOpen(false); }}
                 className="py-3 text-[15px] text-ritual-navy font-medium cursor-pointer">Shop</div>
            <div className="py-3 text-[15px] text-ritual-navy font-medium cursor-pointer">Our Standards</div>
            <div className="py-3 text-[15px] text-ritual-navy font-medium cursor-pointer">Journal</div>
            {user ? (
              <>
                <div onClick={() => { onNavigate('account'); setMenuOpen(false); }}
                     className="py-3 text-[15px] text-ritual-navy font-medium cursor-pointer">Account</div>
                <div onClick={handleLogout} className="py-3 text-[14px] text-surface-300 cursor-pointer">Log out</div>
              </>
            ) : (
              <div onClick={() => { onNavigate('login'); setMenuOpen(false); }}
                   className="py-3 text-[15px] text-ritual-navy font-medium cursor-pointer">Log in</div>
            )}
          </div>
        )}
      </div>
    </header>
  );
}
