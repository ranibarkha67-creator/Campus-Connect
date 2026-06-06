import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { INTERESTS, MOCK_USERS } from '../../data/mockData';
import { Search, Users, Hash, BadgeCheck } from 'lucide-react';

function UserRow({ user, onFollow, onClick }) {
  return (
    <div
      style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '14px 16px', cursor: 'pointer', transition: 'background 0.1s', borderBottom: '1px solid var(--border)' }}
      onMouseEnter={e => e.currentTarget.style.background = 'var(--bg-hover)'}
      onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
      onClick={onClick}
    >
      <div className="avatar avatar-lg" style={{ background: user.avatarColor, flexShrink: 0 }}>{user.initials}</div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 2 }}>
          <span style={{ fontSize: 14, fontWeight: 600 }}>{user.name}</span>
          {user.isVerified && <BadgeCheck size={14} color="var(--accent)" />}
        </div>
        <div style={{ fontSize: 12, color: 'var(--text-secondary)', marginBottom: 4 }}>{user.department} · {user.university}</div>
        <p style={{ fontSize: 13, color: 'var(--text-secondary)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{user.bio}</p>
        <div style={{ display: 'flex', gap: 6, marginTop: 8, flexWrap: 'wrap' }}>
          {user.interests.slice(0, 3).map(id => {
            const interest = INTERESTS.find(i => i.id === id);
            return interest ? (
              <span key={id} className="tag" style={{ background: `${interest.color}10`, color: interest.color, borderColor: `${interest.color}25`, fontSize: 11 }}>
                {interest.label}
              </span>
            ) : null;
          })}
        </div>
      </div>
      <button
        className={`btn btn-sm ${user.isFollowing ? 'btn-ghost' : 'btn-primary'}`}
        onClick={e => { e.stopPropagation(); onFollow(user.id); }}
        style={{ flexShrink: 0 }}
      >
        {user.isFollowing ? 'Following' : 'Follow'}
      </button>
    </div>
  );
}

function InterestCard({ interest, onClick }) {
  return (
    <div
      onClick={onClick}
      style={{
        padding: '16px', border: `1px solid ${interest.color}25`,
        borderRadius: 8, cursor: 'pointer', transition: 'all 0.15s',
        background: `${interest.color}06`,
      }}
      onMouseEnter={e => { e.currentTarget.style.borderColor = interest.color; e.currentTarget.style.background = `${interest.color}12`; }}
      onMouseLeave={e => { e.currentTarget.style.borderColor = `${interest.color}25`; e.currentTarget.style.background = `${interest.color}06`; }}
    >
      <div style={{ width: 10, height: 10, borderRadius: 2, background: interest.color, marginBottom: 10 }} />
      <h3 style={{ fontSize: 14, fontWeight: 700, color: interest.color, marginBottom: 3 }}>{interest.label}</h3>
      <p style={{ fontSize: 12, color: 'var(--text-muted)' }}>{interest.members.toLocaleString()} members</p>
    </div>
  );
}

export default function SearchPage({ setActivePage }) {
  const { users, toggleFollow } = useApp();
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState({ users: [], interests: [] });

  useEffect(() => {
    if (!query.trim()) { setResults({ users: [], interests: [] }); return; }
    setLoading(true);
    const t = setTimeout(() => {
      const q = query.toLowerCase();
      setResults({
        users: MOCK_USERS.filter(u => u.name.toLowerCase().includes(q) || u.university.toLowerCase().includes(q) || u.bio.toLowerCase().includes(q)),
        interests: INTERESTS.filter(i => i.label.toLowerCase().includes(q)),
      });
      setLoading(false);
    }, 280);
    return () => clearTimeout(t);
  }, [query]);

  const showDefault = !query.trim();

  return (
    <div>
      {/* Search bar */}
      <div className="card" style={{ padding: 16, marginBottom: 8 }}>
        <h1 style={{ fontSize: 20, fontWeight: 700, marginBottom: 14 }}>Discover</h1>
        <div style={{ position: 'relative' }}>
          <Search size={16} color="var(--text-muted)" style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
          <input
            className="input"
            style={{ paddingLeft: 40 }}
            placeholder="Search people, communities..."
            value={query}
            onChange={e => setQuery(e.target.value)}
            autoFocus
          />
        </div>
      </div>

      {/* Skeleton */}
      {loading && (
        <div className="card">
          {[1,2,3].map(i => (
            <div key={i} style={{ display: 'flex', gap: 14, padding: '14px 16px', borderBottom: '1px solid var(--border)' }}>
              <div className="skeleton" style={{ width: 48, height: 48, borderRadius: '50%', flexShrink: 0 }} />
              <div style={{ flex: 1 }}>
                <div className="skeleton" style={{ height: 13, width: '45%', marginBottom: 8 }} />
                <div className="skeleton" style={{ height: 11, width: '30%', marginBottom: 6 }} />
                <div className="skeleton" style={{ height: 11, width: '80%' }} />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Results */}
      {!loading && !showDefault && (
        <>
          {results.users.length > 0 && (
            <div className="card" style={{ marginBottom: 8 }}>
              <div style={{ padding: '14px 16px 6px', display: 'flex', alignItems: 'center', gap: 8 }}>
                <Users size={15} color="var(--accent)" />
                <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>People</span>
              </div>
              {results.users.map(u => <UserRow key={u.id} user={u} onFollow={toggleFollow} onClick={() => setActivePage('user-' + u.id)} />)}
            </div>
          )}
          {results.interests.length > 0 && (
            <div className="card" style={{ padding: 16, marginBottom: 8 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
                <Hash size={15} color="var(--accent)" />
                <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Communities</span>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: 10 }}>
                {results.interests.map(i => <InterestCard key={i.id} interest={i} onClick={() => setActivePage('interest-' + i.id)} />)}
              </div>
            </div>
          )}
          {results.users.length === 0 && results.interests.length === 0 && (
            <div className="card empty-state">
              <h3>No results for "{query}"</h3>
              <p>Try different keywords or browse communities below.</p>
            </div>
          )}
        </>
      )}

      {/* Default browse */}
      {showDefault && !loading && (
        <>
          <div className="card" style={{ marginBottom: 8 }}>
            <div style={{ padding: '14px 16px 6px', display: 'flex', alignItems: 'center', gap: 8 }}>
              <Users size={15} color="var(--accent)" />
              <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Suggested people</span>
            </div>
            {users.map(u => <UserRow key={u.id} user={u} onFollow={toggleFollow} onClick={() => setActivePage('user-' + u.id)} />)}
          </div>

          <div className="card" style={{ padding: 16 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
              <Hash size={15} color="var(--accent)" />
              <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Browse communities</span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: 10 }}>
              {INTERESTS.map(i => <InterestCard key={i.id} interest={i} onClick={() => setActivePage('interest-' + i.id)} />)}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
