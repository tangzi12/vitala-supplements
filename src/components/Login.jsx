import { useState } from 'react';
import { login } from '../store';

export default function Login({ onNavigate }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    const result = login(email, password);
    if (result.ok) onNavigate('home');
    else setError(result.error);
  };

  return (
    <div className="pt-[64px]">
      <div className="min-h-[75vh] flex items-center justify-center px-6">
        <div className="w-full max-w-[400px]">
          <div className="text-center mb-10">
            <h1 className="text-[28px] font-medium text-ritual-navy tracking-tight">Welcome back.</h1>
            <p className="text-surface-300 text-[14px] mt-2">Log in to your Vitala account.</p>
          </div>

          {/* Demo hint */}
          <div className="bg-surface-50 border border-surface-100 rounded-lg p-4 mb-6 text-[13px]">
            <p className="font-medium text-ritual-navy mb-1">Demo account</p>
            <p className="text-surface-300">Email: <code className="text-ritual-navy">demo@example.com</code></p>
            <p className="text-surface-300">Password: <code className="text-ritual-navy">demo123</code></p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {error && <div className="bg-red-50 text-red-600 text-[13px] p-3 rounded-lg">{error}</div>}
            <div>
              <label className="block text-[13px] font-medium text-ritual-navy mb-1.5">Email</label>
              <input className="input-field" type="email" value={email}
                onChange={e => setEmail(e.target.value)} placeholder="your@email.com" required />
            </div>
            <div>
              <label className="block text-[13px] font-medium text-ritual-navy mb-1.5">Password</label>
              <input className="input-field" type="password" value={password}
                onChange={e => setPassword(e.target.value)} placeholder="••••••••" required />
            </div>
            <button type="submit" className="btn-primary w-full !py-[14px]">Log in</button>
          </form>

          <p className="text-center text-[14px] text-surface-300 mt-8">
            Don't have an account?{' '}
            <span onClick={() => onNavigate('register')} className="text-ritual-navy font-medium underline underline-offset-4 cursor-pointer hover:opacity-70">
              Create one
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
