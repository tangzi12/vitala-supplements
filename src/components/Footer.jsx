export default function Footer({ onNavigate }) {
  return (
    <footer className="bg-surface-50 border-t border-surface-100">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-10 py-20">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div>
            <span className="text-[20px] font-semibold text-ritual-navy tracking-tight">Vitala</span>
            <p className="text-surface-300 text-[14px] leading-relaxed mt-4 max-w-[220px]">
              Traceable supplements backed by science. Every ingredient, revealed.
            </p>
          </div>
          {/* Shop */}
          <div>
            <h4 className="text-[13px] font-semibold text-ritual-navy uppercase tracking-wider mb-5">Shop</h4>
            <div className="space-y-3 text-[14px] text-surface-300">
              <div onClick={() => onNavigate('products')} className="hover:text-ritual-navy cursor-pointer transition-colors">All Products</div>
              <div onClick={() => onNavigate('products')} className="hover:text-ritual-navy cursor-pointer transition-colors">Ashwagandha</div>
              <div onClick={() => onNavigate('products')} className="hover:text-ritual-navy cursor-pointer transition-colors">Creatine</div>
              <div onClick={() => onNavigate('products')} className="hover:text-ritual-navy cursor-pointer transition-colors">Gummies</div>
            </div>
          </div>
          {/* Learn */}
          <div>
            <h4 className="text-[13px] font-semibold text-ritual-navy uppercase tracking-wider mb-5">Learn</h4>
            <div className="space-y-3 text-[14px] text-surface-300">
              <div className="hover:text-ritual-navy cursor-pointer transition-colors">Our Standards</div>
              <div className="hover:text-ritual-navy cursor-pointer transition-colors">Ingredients</div>
              <div className="hover:text-ritual-navy cursor-pointer transition-colors">Clinical Studies</div>
              <div className="hover:text-ritual-navy cursor-pointer transition-colors">Journal</div>
            </div>
          </div>
          {/* Support */}
          <div>
            <h4 className="text-[13px] font-semibold text-ritual-navy uppercase tracking-wider mb-5">Support</h4>
            <div className="space-y-3 text-[14px] text-surface-300">
              <div className="hover:text-ritual-navy cursor-pointer transition-colors">Contact Us</div>
              <div className="hover:text-ritual-navy cursor-pointer transition-colors">Shipping & Returns</div>
              <div className="hover:text-ritual-navy cursor-pointer transition-colors">FAQ</div>
            </div>
            <div className="flex gap-4 mt-6 text-surface-300">
              <span className="text-[13px] hover:text-ritual-navy cursor-pointer">Instagram</span>
              <span className="text-[13px] hover:text-ritual-navy cursor-pointer">TikTok</span>
            </div>
          </div>
        </div>
        <div className="border-t border-surface-100 mt-16 pt-8 flex flex-col sm:flex-row justify-between text-[12px] text-surface-300">
          <span>© 2026 Vitala. All rights reserved.</span>
          <div className="flex gap-6 mt-2 sm:mt-0">
            <span className="hover:text-ritual-navy cursor-pointer">Privacy Policy</span>
            <span className="hover:text-ritual-navy cursor-pointer">Terms of Service</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
