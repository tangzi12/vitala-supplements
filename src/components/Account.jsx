import { useState, useEffect } from 'react';
import { getCurrentUser, getOrders, logout, subscribe } from '../store';

export default function Account({ onNavigate }) {
  const [user, setUser] = useState(getCurrentUser());
  const [orders, setOrders] = useState(getOrders());

  useEffect(() => subscribe(() => {
    setUser(getCurrentUser());
    setOrders(getOrders());
  }), []);

  if (!user) return (
    <div className="pt-[64px] min-h-[60vh] flex items-center justify-center">
      <div className="text-center">
        <h2 className="text-[22px] font-medium text-ritual-navy">Please log in.</h2>
        <button onClick={() => onNavigate('login')} className="btn-primary mt-6">Log in</button>
      </div>
    </div>
  );

  const handleLogout = () => { logout(); onNavigate('home'); };

  return (
    <div className="pt-[64px]">
      <div className="max-w-[800px] mx-auto px-6 lg:px-10 py-16">
        {/* Profile */}
        <div className="flex items-center justify-between mb-12">
          <div>
            <h1 className="text-[28px] font-medium text-ritual-navy tracking-tight">{user.name}</h1>
            <p className="text-surface-300 text-[14px]">{user.email}</p>
          </div>
          <button onClick={handleLogout} className="text-[13px] text-surface-300 underline underline-offset-4 hover:text-ritual-navy">
            Log out
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-12">
          {[
            { label: 'Orders', value: orders.length },
            { label: 'Active', value: orders.filter(o => o.status !== 'delivered').length },
            { label: 'Total Spent', value: '$' + orders.reduce((s, o) => s + o.total, 0).toFixed(2) },
          ].map((s, i) => (
            <div key={i} className="card p-5">
              <div className="text-[24px] font-medium text-ritual-navy">{s.value}</div>
              <div className="text-[12px] text-surface-300 uppercase tracking-wider mt-1">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Order history */}
        <h2 className="text-[18px] font-medium text-ritual-navy mb-5">Order History</h2>
        {orders.length === 0 ? (
          <div className="card p-12 text-center">
            <p className="text-[15px] text-ritual-navy font-medium mb-1">No orders yet.</p>
            <p className="text-[13px] text-surface-300 mb-6">Ready to start your wellness journey?</p>
            <button onClick={() => onNavigate('products')} className="btn-primary">Shop All</button>
          </div>
        ) : (
          <div className="space-y-3">
            {orders.map(order => (
              <div key={order.id} className="card p-5">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[14px] font-medium text-ritual-navy">{order.id}</span>
                  <span className={`badge text-[11px] ${
                    order.status === 'paid' ? 'bg-surface-50 text-ritual-navy' : 'bg-surface-100 text-surface-300'
                  }`}>{order.statusText}</span>
                </div>
                <div className="text-[13px] text-surface-300">
                  {order.items.map((item, i) => (
                    <span key={i}>{item.name} × {item.qty}{i < order.items.length - 1 ? ', ' : ''}</span>
                  ))}
                </div>
                <div className="flex items-center justify-between mt-2 text-[13px]">
                  <span className="text-surface-300">{new Date(order.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                  <span className="font-medium text-ritual-navy">${order.total.toFixed(2)}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
