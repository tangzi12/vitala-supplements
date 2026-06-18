import { useState } from 'react';
import { getCart, getCartTotal, getCurrentUser, placeOrder, products } from '../store';

export default function Checkout({ onNavigate }) {
  const user = getCurrentUser();
  const cart = getCart();
  const total = getCartTotal();
  const [step, setStep] = useState('shipping');
  const [shipping, setShipping] = useState({ name: '', email: '', phone: '', address: '', city: '', zip: '', country: 'US' });
  const [payment, setPayment] = useState({ method: 'credit', cardNumber: '', expiry: '', cvc: '', nameOnCard: '' });
  const [order, setOrder] = useState(null);
  const [errors, setErrors] = useState({});

  if (!user) return (
    <div className="pt-[64px] min-h-[60vh] flex items-center justify-center">
      <div className="text-center">
        <h2 className="text-[22px] font-medium text-ritual-navy">Please log in to continue.</h2>
        <button onClick={() => onNavigate('login')} className="btn-primary mt-6">Log in</button>
      </div>
    </div>
  );

  if (cart.length === 0 && !order) return (
    <div className="pt-[64px] min-h-[60vh] flex items-center justify-center">
      <div className="text-center">
        <h2 className="text-[22px] font-medium text-ritual-navy">Your cart is empty.</h2>
        <button onClick={() => onNavigate('products')} className="btn-primary mt-6">Shop All</button>
      </div>
    </div>
  );

  if (step === 'done' && order) return (
    <div className="pt-[64px]">
      <div className="max-w-[560px] mx-auto px-6 py-24 text-center">
        <h2 className="text-[32px] font-medium text-ritual-navy tracking-tight">Order confirmed.</h2>
        <p className="text-surface-300 text-[14px] mt-2">Order #{order.id}</p>
        <div className="card p-6 mt-8 text-left">
          {order.items.map((item, i) => (
            <div key={i} className="flex justify-between text-[14px] py-1.5">
              <span className="text-ritual-navy">{item.name} × {item.qty}</span>
              <span className="text-surface-300">${(item.price * item.qty).toFixed(2)}</span>
            </div>
          ))}
          <div className="border-t border-surface-100 mt-3 pt-3 flex justify-between text-[16px] font-medium text-ritual-navy">
            <span>Total</span><span>${order.total.toFixed(2)}</span>
          </div>
        </div>
        <div className="flex gap-3 mt-8">
          <button onClick={() => onNavigate('account')} className="btn-outline flex-1">View Orders</button>
          <button onClick={() => onNavigate('products')} className="btn-primary flex-1">Continue Shopping</button>
        </div>
      </div>
    </div>
  );

  const validateShipping = () => {
    const e = {};
    if (!shipping.name.trim()) e.name = 'Name is required';
    if (!shipping.email.trim() || !shipping.email.includes('@')) e.email = 'Valid email required';
    if (!shipping.address.trim()) e.address = 'Address is required';
    if (!shipping.city.trim()) e.city = 'City is required';
    if (!shipping.zip.trim()) e.zip = 'ZIP is required';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const validatePayment = () => {
    const e = {};
    const card = payment.cardNumber.replace(/\s/g, '');
    if (card.length < 13) e.cardNumber = 'Enter a valid card number';
    if (!payment.expiry.trim() || !payment.expiry.includes('/')) e.expiry = 'MM/YY';
    if (!payment.cvc.trim() || payment.cvc.length < 3) e.cvc = 'CVC required';
    if (!payment.nameOnCard.trim()) e.nameOnCard = 'Name on card required';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = () => {
    const result = placeOrder(shipping, payment);
    if (result.ok) { setOrder(result.order); setStep('done'); }
  };

  const formatCard = (v) => v.replace(/\s/g, '').replace(/(\d{4})/g, '$1 ').trim().slice(0, 19);
  const steps = ['shipping', 'payment', 'confirm'];
  const stepLabels = ['Shipping', 'Payment', 'Review'];

  return (
    <div className="pt-[64px]">
      <div className="max-w-[640px] mx-auto px-6 lg:px-10 py-16">
        {/* Step indicator */}
        <div className="flex items-center justify-center gap-3 mb-12">
          {steps.map((s, i) => (
            <div key={s} className="flex items-center gap-3">
              <span className={`text-[13px] font-medium ${step === s ? 'text-ritual-navy' : 'text-surface-300'}`}>
                {stepLabels[i]}
              </span>
              {i < 2 && <span className="text-surface-200">—</span>}
            </div>
          ))}
        </div>

        {step === 'shipping' && (
          <div>
            <h2 className="text-[24px] font-medium text-ritual-navy tracking-tight mb-8">Shipping information</h2>
            <div className="space-y-5">
              <div className="grid grid-cols-2 gap-5">
                <div>
                  <label className="block text-[13px] font-medium text-ritual-navy mb-1.5">Name *</label>
                  <input className="input-field" value={shipping.name} onChange={e => setShipping({...shipping, name: e.target.value})} placeholder="John Doe" />
                  {errors.name && <p className="text-red-500 text-[12px] mt-1">{errors.name}</p>}
                </div>
                <div>
                  <label className="block text-[13px] font-medium text-ritual-navy mb-1.5">Email *</label>
                  <input className="input-field" type="email" value={shipping.email} onChange={e => setShipping({...shipping, email: e.target.value})} placeholder="john@email.com" />
                  {errors.email && <p className="text-red-500 text-[12px] mt-1">{errors.email}</p>}
                </div>
              </div>
              <div>
                <label className="block text-[13px] font-medium text-ritual-navy mb-1.5">Phone</label>
                <input className="input-field" value={shipping.phone} onChange={e => setShipping({...shipping, phone: e.target.value})} placeholder="+1 (555) 000-0000" />
              </div>
              <div>
                <label className="block text-[13px] font-medium text-ritual-navy mb-1.5">Address *</label>
                <input className="input-field" value={shipping.address} onChange={e => setShipping({...shipping, address: e.target.value})} placeholder="Street address" />
                {errors.address && <p className="text-red-500 text-[12px] mt-1">{errors.address}</p>}
              </div>
              <div className="grid grid-cols-3 gap-5">
                <div>
                  <label className="block text-[13px] font-medium text-ritual-navy mb-1.5">City *</label>
                  <input className="input-field" value={shipping.city} onChange={e => setShipping({...shipping, city: e.target.value})} placeholder="City" />
                  {errors.city && <p className="text-red-500 text-[12px] mt-1">{errors.city}</p>}
                </div>
                <div>
                  <label className="block text-[13px] font-medium text-ritual-navy mb-1.5">ZIP *</label>
                  <input className="input-field" value={shipping.zip} onChange={e => setShipping({...shipping, zip: e.target.value})} placeholder="10001" />
                  {errors.zip && <p className="text-red-500 text-[12px] mt-1">{errors.zip}</p>}
                </div>
                <div>
                  <label className="block text-[13px] font-medium text-ritual-navy mb-1.5">Country</label>
                  <select className="input-field" value={shipping.country} onChange={e => setShipping({...shipping, country: e.target.value})}>
                    <option value="US">United States</option><option value="CA">Canada</option><option value="UK">United Kingdom</option>
                    <option value="AU">Australia</option><option value="SG">Singapore</option>
                  </select>
                </div>
              </div>
            </div>
            <button onClick={() => validateShipping() && setStep('payment')} className="btn-primary w-full mt-8 !py-[14px]">
              Continue to Payment
            </button>
          </div>
        )}

        {step === 'payment' && (
          <div>
            <h2 className="text-[24px] font-medium text-ritual-navy tracking-tight mb-8">Payment</h2>
            <div className="card p-6">
              <div className="flex gap-3 mb-6">
                {['credit', 'paypal'].map(m => (
                  <button key={m} onClick={() => setPayment({...payment, method: m})}
                    className={`flex-1 py-3 rounded-lg border text-[14px] font-medium transition-all ${
                      payment.method === m ? 'border-ritual-navy bg-surface-50 text-ritual-navy' : 'border-surface-200 text-surface-300'
                    }`}>
                    {m === 'credit' ? 'Credit Card' : 'PayPal'}
                  </button>
                ))}
              </div>

              {payment.method === 'credit' && (
                <div className="space-y-5">
                  <div>
                    <label className="block text-[13px] font-medium text-ritual-navy mb-1.5">Card Number</label>
                    <input className="input-field font-mono" value={payment.cardNumber}
                      onChange={e => setPayment({...payment, cardNumber: formatCard(e.target.value)})}
                      placeholder="4242 4242 4242 4242" maxLength={19} />
                    {errors.cardNumber && <p className="text-red-500 text-[12px] mt-1">{errors.cardNumber}</p>}
                  </div>
                  <div className="grid grid-cols-2 gap-5">
                    <div>
                      <label className="block text-[13px] font-medium text-ritual-navy mb-1.5">Expiry</label>
                      <input className="input-field" value={payment.expiry}
                        onChange={e => setPayment({...payment, expiry: e.target.value.replace(/[^0-9/]/g, '').slice(0, 5)})}
                        placeholder="MM/YY" maxLength={5} />
                      {errors.expiry && <p className="text-red-500 text-[12px] mt-1">{errors.expiry}</p>}
                    </div>
                    <div>
                      <label className="block text-[13px] font-medium text-ritual-navy mb-1.5">CVC</label>
                      <input className="input-field" value={payment.cvc}
                        onChange={e => setPayment({...payment, cvc: e.target.value.replace(/\D/g, '').slice(0, 4)})}
                        placeholder="123" maxLength={4} />
                      {errors.cvc && <p className="text-red-500 text-[12px] mt-1">{errors.cvc}</p>}
                    </div>
                  </div>
                  <div>
                    <label className="block text-[13px] font-medium text-ritual-navy mb-1.5">Name on Card</label>
                    <input className="input-field" value={payment.nameOnCard}
                      onChange={e => setPayment({...payment, nameOnCard: e.target.value})} placeholder="JOHN DOE" />
                    {errors.nameOnCard && <p className="text-red-500 text-[12px] mt-1">{errors.nameOnCard}</p>}
                  </div>
                </div>
              )}

              {payment.method === 'paypal' && (
                <div className="text-center py-8 text-surface-300 text-[14px]">
                  <p>You'll be redirected to PayPal to complete payment.</p>
                  <p className="text-[12px] mt-1">(Demo mode — no actual charge)</p>
                </div>
              )}
            </div>
            <div className="flex gap-4 mt-6">
              <button onClick={() => setStep('shipping')} className="btn-outline flex-1">← Back</button>
              <button onClick={() => validatePayment() && setStep('confirm')} className="btn-primary flex-1 !py-[14px]">
                Review Order
              </button>
            </div>
          </div>
        )}

        {step === 'confirm' && (
          <div>
            <h2 className="text-[24px] font-medium text-ritual-navy tracking-tight mb-8">Review your order</h2>
            <div className="card p-6 space-y-5">
              <div>
                <h3 className="text-[13px] font-semibold text-surface-300 uppercase tracking-wider mb-2">Shipping to</h3>
                <p className="text-[14px] text-ritual-navy">{shipping.name}</p>
                <p className="text-[13px] text-surface-300">{shipping.address}, {shipping.city}, {shipping.zip}</p>
              </div>
              <div className="border-t border-surface-100 pt-5">
                <h3 className="text-[13px] font-semibold text-surface-300 uppercase tracking-wider mb-2">Payment</h3>
                <p className="text-[14px] text-ritual-navy">
                  {payment.method === 'credit' ? `Card ending in ${payment.cardNumber.slice(-4)}` : 'PayPal'}
                </p>
              </div>
              <div className="border-t border-surface-100 pt-5">
                <h3 className="text-[13px] font-semibold text-surface-300 uppercase tracking-wider mb-3">Items</h3>
                {cart.map(item => {
                  const p = products.find(p => p.id === item.productId);
                  return p ? (
                    <div key={item.productId} className="flex justify-between text-[14px] py-1">
                      <span className="text-ritual-navy">{p.name} × {item.qty}</span>
                      <span className="text-surface-300">${(p.price * item.qty).toFixed(2)}</span>
                    </div>
                  ) : null;
                })}
                <div className="flex justify-between text-[16px] font-medium text-ritual-navy mt-3 pt-3 border-t border-surface-100">
                  <span>Total</span><span>${total.toFixed(2)}</span>
                </div>
              </div>
            </div>
            <div className="flex gap-4 mt-6">
              <button onClick={() => setStep('payment')} className="btn-outline flex-1">← Back</button>
              <button onClick={handleSubmit} className="btn-primary flex-1 !py-[14px] !bg-ritual-navy">
                Place Order — ${total.toFixed(2)}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
