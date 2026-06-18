import { useState } from 'react';
import { products, addToCart } from '../store';

const categories = ['All', 'Gummies', 'Capsules', 'Powder'];

export default function Products({ onNavigate }) {
  const [filter, setFilter] = useState('All');
  const [addedMsg, setAddedMsg] = useState(null);

  const filtered = filter === 'All' ? products : products.filter(p => {
    const map = { 'Gummies': '软糖', 'Capsules': '胶囊', 'Powder': '粉剂' };
    return p.category === map[filter];
  });

  const handleAdd = (e, p) => {
    e.stopPropagation();
    addToCart(p.id);
    setAddedMsg(p.name);
    setTimeout(() => setAddedMsg(null), 2000);
  };

  return (
    <div className="pt-[64px]">
      {/* Page header */}
      <section className="bg-white border-b border-surface-100">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-10 py-16">
          <h1 className="text-[36px] md:text-[44px] font-medium text-ritual-navy tracking-tight">Shop All</h1>
          <p className="text-surface-300 text-[15px] mt-3 max-w-[480px]">
            Traceable supplements formulated for real results. Every ingredient, revealed.
          </p>
        </div>
      </section>

      {/* Toast */}
      {addedMsg && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-ritual-navy text-white px-6 py-3 rounded-lg text-[14px] font-medium shadow-lg">
          Added "{addedMsg}" to cart
        </div>
      )}

      {/* Filter bar */}
      <div className="max-w-[1280px] mx-auto px-6 lg:px-10 py-8">
        <div className="flex gap-2 flex-wrap">
          {categories.map(c => (
            <button key={c} onClick={() => setFilter(c)}
              className={`px-5 py-2 rounded-full text-[13px] font-medium transition-all ${
                filter === c
                  ? 'bg-ritual-navy text-white'
                  : 'bg-surface-50 text-surface-300 hover:text-ritual-navy hover:bg-surface-100'
              }`}>
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* Product grid */}
      <div className="max-w-[1280px] mx-auto px-6 lg:px-10 pb-24">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {filtered.map(p => (
            <div key={p.id} onClick={() => onNavigate('product', p.id)} className="group cursor-pointer">
              <div className="bg-surface-50 rounded-2xl aspect-square overflow-hidden relative">
                <img src={p.image} alt={p.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                {p.badge && (
                  <span className="absolute top-3 left-3 badge bg-ritual-navy text-white text-[11px]">
                    {p.badge}
                  </span>
                )}
              </div>
              <div className="mt-4">
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <h3 className="text-[15px] font-medium text-ritual-navy truncate">{p.name}</h3>
                    <p className="text-[12px] text-surface-300 mt-0.5">{p.nameEn}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between mt-3">
                  <div>
                    <span className="text-[15px] font-medium text-ritual-navy">${p.price}</span>
                    {p.originalPrice > p.price && (
                      <span className="text-[13px] text-surface-300 line-through ml-2">${p.originalPrice}</span>
                    )}
                  </div>
                  <button onClick={(e) => handleAdd(e, p)}
                    className="text-[13px] font-medium text-ritual-navy underline underline-offset-4 decoration-surface-300 hover:decoration-ritual-navy transition-all">
                    Add
                  </button>
                </div>
                <div className="flex items-center gap-1 mt-1.5 text-[12px] text-surface-300">
                  <span className="text-ritual-yellow">★</span> {p.rating} ({p.reviews})
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
