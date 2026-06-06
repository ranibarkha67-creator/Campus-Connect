import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { INTERESTS } from '../../data/mockData';
import { Eye, EyeOff, Mail, Lock, User, ArrowRight, Check, BookOpen } from 'lucide-react';

export default function AuthPage() {
  const [mode, setMode] = useState('login');
  const [form, setForm] = useState({ name: '', email: '', password: '', university: '', year: '' });
  const [selectedInterests, setSelectedInterests] = useState([]);
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const { login } = useApp();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (mode === 'signup') { setMode('interests'); return; }
    setLoading(true);
    await new Promise(r => setTimeout(r, 800));
    login({ name: form.name || 'Demo User', email: form.email });
    setLoading(false);
  };

  const finishSignup = async () => {
    if (selectedInterests.length === 0) return;
    setLoading(true);
    await new Promise(r => setTimeout(r, 600));
    login({ name: form.name, email: form.email, interests: selectedInterests });
    setLoading(false);
  };

  const toggleInterest = (id) =>
    setSelectedInterests(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);

  if (mode === 'interests') {
    return (
      <div style={{ minHeight: '100vh', background: 'var(--bg-base)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
        <div style={{ width: '100%', maxWidth: 560, background: 'var(--bg-surface)', border: '1px solid var(--border)', borderRadius: 16, padding: '40px 40px', boxShadow: 'var(--shadow)' }} className="anim-up">
          <div style={{ marginBottom: 28 }}>
            <h1 style={{ fontSize: 22, fontWeight: 700, marginBottom: 6 }}>Select your interests</h1>
            <p style={{ fontSize: 14, color: 'var(--text-secondary)' }}>Choose topics you care about to personalize your feed</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8, marginBottom: 28 }}>
            {INTERESTS.map(interest => {
              const active = selectedInterests.includes(interest.id);
              return (
                <button
                  key={interest.id}
                  onClick={() => toggleInterest(interest.id)}
                  style={{
                    padding: '10px 8px', borderRadius: 8, cursor: 'pointer',
                    border: `1.5px solid ${active ? interest.color : 'var(--border)'}`,
                    background: active ? `${interest.color}12` : 'var(--bg-elevated)',
                    color: active ? interest.color : 'var(--text-secondary)',
                    fontFamily: 'var(--font-body)', fontSize: 13, fontWeight: active ? 600 : 400,
                    transition: 'all 0.15s', display: 'flex', alignItems: 'center',
                    justifyContent: 'space-between', gap: 4,
                  }}
                >
                  <span>{interest.label}</span>
                  {active && <Check size={13} />}
                </button>
              );
            })}
          </div>
          <button
            className="btn btn-primary btn-lg"
            style={{ width: '100%' }}
            onClick={finishSignup}
            disabled={loading || selectedInterests.length === 0}
          >
            {loading ? 'Setting up profile...' : `Continue (${selectedInterests.length} selected)`}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-base)', display: 'flex' }}>
      {/* Left Hero */}
      <div className="auth-hero" style={{
        flex: 1, background: 'var(--accent)', display: 'flex', alignItems: 'flex-start',
        justifyContent: 'center', padding: '80px 60px', flexDirection: 'column',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 48 }}>
          <BookOpen size={32} color="#fff" />
          <span style={{ fontFamily: 'var(--font-display)', fontSize: 24, fontWeight: 800, color: '#fff' }}>CampusConnect</span>
        </div>
        <h1 style={{ fontSize: 42, fontWeight: 800, color: '#fff', lineHeight: 1.2, marginBottom: 20, maxWidth: 400 }}>
          Welcome to your campus community
        </h1>
        <p style={{ fontSize: 17, color: 'rgba(255,255,255,0.8)', lineHeight: 1.7, maxWidth: 380 }}>
          Connect with students who share your interests. From hackathons to music, find your people.
        </p>
        <div style={{ marginTop: 40, display: 'flex', flexDirection: 'column', gap: 14 }}>
          {['Join interest-based communities', 'Collaborate on projects and events', 'Build your student network'].map(item => (
            <div key={item} style={{ display: 'flex', alignItems: 'center', gap: 10, color: 'rgba(255,255,255,0.9)', fontSize: 15 }}>
              <div style={{ width: 20, height: 20, borderRadius: '50%', background: 'rgba(255,255,255,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Check size={12} color="#fff" />
              </div>
              {item}
            </div>
          ))}
        </div>
      </div>

      {/* Right Form */}
      <div className="auth-form-wrap" style={{
        width: 440, display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '40px 48px', background: 'var(--bg-surface)',
      }}>
        <div style={{ width: '100%' }} className="anim-up">
          <div style={{ marginBottom: 32 }}>
            <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 6 }}>
              {mode === 'login' ? 'Sign in' : 'Create account'}
            </h2>
            <p style={{ fontSize: 14, color: 'var(--text-secondary)' }}>
              {mode === 'login' ? 'Welcome back to CampusConnect' : 'Join your campus community today'}
            </p>
          </div>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {mode === 'signup' && (
              <div>
                <label style={{ display: 'block', fontSize: 13, fontWeight: 600, marginBottom: 5, color: 'var(--text-secondary)' }}>Full Name</label>
                <div style={{ position: 'relative' }}>
                  <User size={15} color="var(--text-muted)" style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
                  <input className="input" style={{ paddingLeft: 36 }} type="text" placeholder="Your full name" value={form.name} onChange={e => setForm({...form, name: e.target.value})} required />
                </div>
              </div>
            )}
            <div>
              <label style={{ display: 'block', fontSize: 13, fontWeight: 600, marginBottom: 5, color: 'var(--text-secondary)' }}>University Email</label>
              <div style={{ position: 'relative' }}>
                <Mail size={15} color="var(--text-muted)" style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
                <input className="input" style={{ paddingLeft: 36 }} type="email" placeholder="you@university.edu" value={form.email} onChange={e => setForm({...form, email: e.target.value})} required />
              </div>
            </div>
            <div>
              <label style={{ display: 'block', fontSize: 13, fontWeight: 600, marginBottom: 5, color: 'var(--text-secondary)' }}>Password</label>
              <div style={{ position: 'relative' }}>
                <Lock size={15} color="var(--text-muted)" style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
                <input className="input" style={{ paddingLeft: 36, paddingRight: 40 }} type={showPass ? 'text' : 'password'} placeholder="6+ characters" value={form.password} onChange={e => setForm({...form, password: e.target.value})} required minLength={6} />
                <button type="button" onClick={() => setShowPass(!showPass)} style={{ position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', display: 'flex' }}>
                  {showPass ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>
            {mode === 'signup' && (
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 120px', gap: 10 }}>
                <div>
                  <label style={{ display: 'block', fontSize: 13, fontWeight: 600, marginBottom: 5, color: 'var(--text-secondary)' }}>University</label>
                  <input className="input" type="text" placeholder="IIT Delhi" value={form.university} onChange={e => setForm({...form, university: e.target.value})} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: 13, fontWeight: 600, marginBottom: 5, color: 'var(--text-secondary)' }}>Year</label>
                  <select className="input" value={form.year} onChange={e => setForm({...form, year: e.target.value})} style={{ appearance: 'none' }}>
                    <option value="">Year</option>
                    <option>1st Year</option><option>2nd Year</option><option>3rd Year</option><option>4th Year</option><option>Postgrad</option>
                  </select>
                </div>
              </div>
            )}
            <button type="submit" className="btn btn-primary" style={{ width: '100%', height: 40, fontSize: 15, marginTop: 4 }} disabled={loading}>
              {loading ? 'Please wait...' : mode === 'login' ? 'Sign in' : 'Continue'}
              {!loading && <ArrowRight size={16} />}
            </button>
          </form>

          <div style={{ display: 'flex', alignItems: 'center', gap: 12, margin: '20px 0' }}>
            <div style={{ flex: 1, height: 1, background: 'var(--border)' }} />
            <span style={{ fontSize: 13, color: 'var(--text-muted)' }}>or</span>
            <div style={{ flex: 1, height: 1, background: 'var(--border)' }} />
          </div>

          <button
            className="btn btn-ghost"
            style={{ width: '100%', height: 40, fontSize: 14 }}
            onClick={() => login({ name: 'Demo User', email: 'demo@university.edu' })}
          >
            Continue as Demo User
          </button>

          <p style={{ textAlign: 'center', fontSize: 13, color: 'var(--text-secondary)', marginTop: 24 }}>
            {mode === 'login' ? "Don't have an account? " : 'Already have an account? '}
            <button
              onClick={() => setMode(mode === 'login' ? 'signup' : 'login')}
              style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--accent)', fontWeight: 600, fontSize: 13, fontFamily: 'var(--font-body)' }}
            >
              {mode === 'login' ? 'Sign up' : 'Sign in'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
