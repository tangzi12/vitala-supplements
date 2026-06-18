import { useState } from 'react';
import { register } from '../store';

export default function Register({ onNavigate }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    if (password !== confirm) { setError('Passwords do not match'); return; }
    if (password.length < 6) { setError('Password must be at least 6 characters'); return; }
    const result = register(name, email, password);
    if (result.ok) onNavigate('home');
    else setError(result.error);
  };

  return (
    <div className="pt-[64px]">
      <div className="min-h-[75vh] flex items-center justify-center px-6">
        <div className="w-full max-w-[400px]">
          <div className="text-center mb-10">
            <h1 className="text-[28px] font-medium text-ritual-navy tracking-tight">Create your account.</h1>
            <p className="text-surface-300 text-[14px] mt-2">Join Vitala and start your wellness journey.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {error && <div className="bg-red-50 text-red-600 text-[13px] p-3 rounded-lg">{error}</div>}
            <div>
              <label className="block text-[13px] font-medium text-ritual-navy mb-1.5">Full Name</label>
              <input className="input-field" value={name}
                onChange={e => setName(e.target.value)} placeholder="Your name" required />
            </div>
            <div>
              <label className="block text-[13px] font-medium text-ritual-navy mb-1.5">Email</label>
              <input className="input-field" type="email" value={email}
                onChange={e => setEmail(e.target.value)} placeholder="your@email.com" required />
            </div>
            <div>
              <label className="block text-[13px] font-medium text-ritual-navy mb-1.5">Password</label>
              <input className="input-field" type="password" value={password}
                onChange={e => setPassword(e.target.value)} placeholder="At least 6 characters" required />
            </div>
            <div>
              <label className="block text-[13px] font-medium text-ritual-navy mb-1.5">Confirm Password</label>
              <input className="input-field" type="password" value={confirm}
                onChange={e => setConfirm(e.target.value)} placeholder="Re-enter password" required />
            </div>
            <button type="submit" className="btn-primary w-full !py-[14px]">Create Account</button>
          </form>

          <p className="text-center text-[14px] text-surface-300 mt-8">
            Already have an account?{' '}
            <span onClick={() => onNavigate('login')} className="text-ritual-navy font-medium underline underline-offset-4 cursor-pointer hover:opacity-70">
              Log in
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
