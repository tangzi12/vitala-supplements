import { useState } from 'react';
import { products, addToCart } from '../store';

export default function ProductDetail({ productId, onNavigate }) {
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  const p = products.find(p => p.id === productId);
  if (!p) return <div className="pt-[64px] text-center py-20 text-ritual-navy">Product not found.</div>;

  const handleAdd = () => {
    addToCart(p.id, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 2500);
  };

  return (
    <div className="pt-[64px]">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-10 py-12">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-[13px] text-surface-300 mb-10">
          <span onClick={() => onNavigate('home')} className="hover:text-ritual-navy cursor-pointer">Home</span>
          <span>/</span>
          <span onClick={() => onNavigate('products')} className="hover:text-ritual-navy cursor-pointer">Shop All</span>
          <span>/</span>
          <span className="text-ritual-navy">{p.name}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Image */}
          <div className="bg-surface-50 rounded-2xl aspect-square overflow-hidden">
            <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
          </div>

          {/* Details */}
          <div className="flex flex-col justify-center max-w-[460px]">
            <h1 className="text-[32px] md:text-[40px] font-medium text-ritual-navy tracking-tight leading-tight">
              {p.name}
            </h1>
            <p className="text-surface-300 text-[15px] mt-1">{p.nameEn}</p>

            {/* Rating */}
            <div className="flex items-center gap-3 mt-4">
              <span className="text-ritual-yellow text-[16px]">★★★★★</span>
              <span className="text-[14px] text-ritual-navy font-medium">{p.rating}</span>
              <span className="text-[13px] text-surface-300">({p.reviews} reviews)</span>
            </div>

            {/* Price */}
            <div className="mt-6">
              <span className="text-[28px] font-medium text-ritual-navy">${p.price}</span>
              {p.originalPrice > p.price && (
                <>
                  <span className="text-[18px] text-surface-300 line-through ml-3">${p.originalPrice}</span>
                  <span className="ml-3 badge bg-ritual-yellow-light text-ritual-navy text-[12px]">
                    Save ${(p.originalPrice - p.price).toFixed(2)}
                  </span>
                </>
              )}
            </div>

            {/* Description */}
            <p className="text-[15px] text-surface-300 mt-6 leading-relaxed">{p.description}</p>

            {/* Qty + Add */}
            <div className="flex items-center gap-4 mt-8">
              <div className="flex items-center border border-surface-200 rounded-lg">
                <button onClick={() => setQty(Math.max(1, qty - 1))}
                  className="w-11 h-11 flex items-center justify-center text-ritual-navy hover:bg-surface-50 text-[18px]">−</button>
                <span className="w-12 text-center text-[15px] font-medium text-ritual-navy">{qty}</span>
                <button onClick={() => setQty(qty + 1)}
                  className="w-11 h-11 flex items-center justify-center text-ritual-navy hover:bg-surface-50 text-[18px]">+</button>
              </div>
              <button onClick={handleAdd} className="btn-primary flex-1 text-center !py-[14px]">
                {added ? '✓ Added!' : 'Add to Cart'}
              </button>
            </div>
            {p.stock < 100 && (
              <p className="text-[12px] text-surface-300 mt-3">Only {p.stock} left in stock</p>
            )}

            {/* Benefits */}
            <div className="mt-10 space-y-2.5">
              <h3 className="text-[15px] font-semibold text-ritual-navy mb-3">Key Benefits</h3>
              {p.benefits.map((b, i) => (
                <div key={i} className="flex items-center gap-2.5 text-[14px] text-surface-300">
                  <svg className="w-4 h-4 text-ritual-navy flex-shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  {b}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Specs / Ingredients / Directions tabs */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="card p-8">
            <h3 className="text-[15px] font-semibold text-ritual-navy mb-4">Product Details</h3>
            <div className="space-y-3 text-[14px]">
              {Object.entries(p.specs).map(([k, v]) => (
                <div key={k} className="flex justify-between">
                  <span className="text-surface-300">{k}</span>
                  <span className="text-ritual-navy font-medium text-right">{v}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="card p-8">
            <h3 className="text-[15px] font-semibold text-ritual-navy mb-4">Ingredients</h3>
            <p className="text-[14px] text-surface-300 leading-relaxed">{p.ingredients}</p>
          </div>
          <div className="card p-8">
            <h3 className="text-[15px] font-semibold text-ritual-navy mb-4">Suggested Use</h3>
            <p className="text-[14px] text-surface-300 leading-relaxed">{p.directions}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
