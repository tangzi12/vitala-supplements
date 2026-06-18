import { useState, useEffect } from 'react';
import { getCart, updateCartItem, removeFromCart, getCartTotal, getCartCount, subscribe, products } from '../store';

export default function Cart({ onNavigate }) {
  const [cart, setCart] = useState(getCart());
  const [total, setTotal] = useState(getCartTotal());
  const [count, setCount] = useState(getCartCount());

  useEffect(() => subscribe(() => {
    setCart(getCart());
    setTotal(getCartTotal());
    setCount(getCartCount());
  }), []);

  const cartWithProducts = cart.map(item => ({
    ...item,
    product: products.find(p => p.id === item.productId),
  })).filter(item => item.product);

  return (
    <div className="pt-[64px]">
      <div className="max-w-[960px] mx-auto px-6 lg:px-10 py-16">
        <h1 className="text-[32px] font-medium text-ritual-navy tracking-tight">Your Cart</h1>
        <p className="text-surface-300 text-[14px] mt-1">{count} {count === 1 ? 'item' : 'items'}</p>

        {cartWithProducts.length === 0 ? (
          <div className="text-center py-24">
            <p className="text-[18px] text-ritual-navy font-medium mb-2">Your cart is empty.</p>
            <p className="text-surface-300 text-[14px] mb-8">Time to explore our traceable supplements.</p>
            <button onClick={() => onNavigate('products')} className="btn-primary">Shop All</button>
          </div>
        ) : (
          <div className="mt-10 grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Items */}
            <div className="lg:col-span-2 space-y-4">
              {cartWithProducts.map(item => (
                <div key={item.productId} className="card p-5 flex gap-5">
                  <img src={item.product.image} alt={item.product.name}
                    className="w-[100px] h-[100px] rounded-xl object-cover cursor-pointer bg-surface-50"
                    onClick={() => onNavigate('product', item.productId)} />
                  <div className="flex-1 min-w-0">
                    <h3 className="text-[15px] font-medium text-ritual-navy cursor-pointer hover:opacity-70"
                      onClick={() => onNavigate('product', item.productId)}>{item.product.name}</h3>
                    <p className="text-[12px] text-surface-300">{item.product.nameEn}</p>
                    <p className="text-[15px] font-medium text-ritual-navy mt-1.5">${item.product.price}</p>
                    <div className="flex items-center gap-4 mt-3">
                      <div className="flex items-center border border-surface-200 rounded-lg">
                        <button onClick={() => updateCartItem(item.productId, item.qty - 1)}
                          className="w-9 h-9 flex items-center justify-center text-ritual-navy hover:bg-surface-50 text-[15px]">−</button>
                        <span className="w-9 text-center text-[13px] font-medium">{item.qty}</span>
                        <button onClick={() => updateCartItem(item.productId, item.qty + 1)}
                          className="w-9 h-9 flex items-center justify-center text-ritual-navy hover:bg-surface-50 text-[15px]">+</button>
                      </div>
                      <button onClick={() => removeFromCart(item.productId)}
                        className="text-[12px] text-surface-300 hover:text-ritual-navy underline underline-offset-4">Remove</button>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-[15px] font-medium text-ritual-navy">${(item.product.price * item.qty).toFixed(2)}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Summary */}
            <div className="lg:col-span-1">
              <div className="card p-6 sticky top-[80px]">
                <h3 className="text-[15px] font-semibold text-ritual-navy mb-4">Order Summary</h3>
                <div className="space-y-2.5 text-[14px]">
                  <div className="flex justify-between"><span className="text-surface-300">Subtotal</span><span className="text-ritual-navy">${total.toFixed(2)}</span></div>
                  <div className="flex justify-between"><span className="text-surface-300">Shipping</span><span className="text-ritual-navy font-medium">Free</span></div>
                  <div className="border-t border-surface-100 pt-3 flex justify-between text-[16px] font-medium">
                    <span className="text-ritual-navy">Total</span><span className="text-ritual-navy">${total.toFixed(2)}</span>
                  </div>
                </div>
                <button onClick={() => onNavigate('checkout')}
                  className="btn-primary w-full text-center mt-6 !py-[14px]">
                  Checkout
                </button>
                <button onClick={() => onNavigate('products')}
                  className="w-full text-center text-[13px] text-surface-300 hover:text-ritual-navy mt-4 underline underline-offset-4">
                  Continue Shopping
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
