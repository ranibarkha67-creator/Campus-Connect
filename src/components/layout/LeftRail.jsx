import React from 'react';
import { useApp } from '../../context/AppContext';
import { INTERESTS } from '../../data/mockData';
import { Home, Search, Bell, Bookmark, Users, Calendar, TrendingUp, ChevronRight } from 'lucide-react';

function RailItem({ icon: Icon, label, active, badge, onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        display: 'flex', alignItems: 'center', gap: 12,
        padding: '10px 12px', borderRadius: 8, width: '100%', textAlign: 'left',
        background: active ? 'var(--accent-dim)' : 'transparent',
        color: active ? 'var(--accent)' : 'var(--text-secondary)',
        border: 'none', cursor: 'pointer', fontFamily: 'var(--font-body)',
        fontSize: 14, fontWeight: active ? 600 : 400,
        transition: 'all 0.12s', position: 'relative',
      }}
      onMouseEnter={e => { if (!active) { e.currentTarget.style.background = 'var(--bg-hover)'; e.currentTarget.style.color = 'var(--text-primary)'; } }}
      onMouseLeave={e => { if (!active) { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--text-secondary)'; } }}
    >
      <div style={{ position: 'relative' }}>
        <Icon size={18} strokeWidth={active ? 2.5 : 1.8} />
        {badge > 0 && (
          <span className="badge" style={{ position: 'absolute', top: -5, right: -5, minWidth: 14, height: 14, fontSize: 9 }}>
            {badge > 9 ? '9+' : badge}
          </span>
        )}
      </div>
      {label}
    </button>
  );
}

export default function LeftRail({ activePage, setActivePage }) {
  const { user, unreadCount } = useApp();

  const navItems = [
    { id: 'feed', icon: Home, label: 'Home' },
    { id: 'search', icon: Search, label: 'Discover' },
    { id: 'notifications', icon: Bell, label: 'Notifications', badge: unreadCount },
    { id: 'people', icon: Users, label: 'People' },
    { id: 'events', icon: Calendar, label: 'Events' },
    { id: 'saved', icon: Bookmark, label: 'Saved' },
    { id: 'trending', icon: TrendingUp, label: 'Trending' },
  ];

  const myInterests = INTERESTS.filter(i => user?.interests?.includes(i.id) || ['coding','hackathons'].includes(i.id)).slice(0, 5);

  return (
    <div style={{ position: 'sticky', top: 64, display: 'flex', flexDirection: 'column', gap: 8 }}>
      {/* Profile card */}
      <div className="card">
        <button
          onClick={() => setActivePage('profile')}
          style={{
            display: 'block', width: '100%', background: 'none', border: 'none',
            cursor: 'pointer', padding: 0,
          }}
        >
          <div style={{
            height: 52, background: 'var(--accent)',
            borderRadius: '8px 8px 0 0',
          }} />
          <div style={{ padding: '0 16px 16px', position: 'relative', paddingTop: 0 }}>
            <div style={{ marginTop: -24, marginBottom: 10 }}>
              <div className="avatar avatar-lg" style={{ background: user?.avatarColor || 'var(--accent)', border: '3px solid var(--bg-surface)' }}>
                {user?.initials || 'DU'}
              </div>
            </div>
            <div style={{ textAlign: 'left' }}>
              <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-primary)' }}>{user?.name || 'User'}</div>
              <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{user?.department || 'Campus Connect'}</div>
              <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 2 }}>{user?.university || ''}</div>
            </div>
            <div style={{ marginTop: 12, paddingTop: 12, borderTop: '1px solid var(--border)', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 0 }}>
              {[['Followers', user?.followers || 0], ['Following', user?.following || 0]].map(([label, val]) => (
                <div key={label} style={{ textAlign: 'center', padding: '4px 0' }}>
                  <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--accent)' }}>{val}</div>
                  <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{label}</div>
                </div>
              ))}
            </div>
          </div>
        </button>
      </div>

      {/* Nav */}
      <div className="card" style={{ padding: 8 }}>
        {navItems.map(item => (
          <RailItem key={item.id} {...item} active={activePage === item.id} onClick={() => setActivePage(item.id)} />
        ))}
      </div>

      {/* Communities */}
      <div className="card" style={{ padding: '12px 8px' }}>
        <div style={{ padding: '4px 12px 8px', fontSize: 12, fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
          My Communities
        </div>
        {myInterests.map(interest => (
          <button
            key={interest.id}
            onClick={() => setActivePage('interest-' + interest.id)}
            style={{
              display: 'flex', alignItems: 'center', gap: 10,
              padding: '8px 12px', borderRadius: 8, width: '100%', textAlign: 'left',
              background: activePage === 'interest-' + interest.id ? `${interest.color}12` : 'transparent',
              border: 'none', cursor: 'pointer', fontFamily: 'var(--font-body)', fontSize: 13,
              color: activePage === 'interest-' + interest.id ? interest.color : 'var(--text-secondary)',
              transition: 'all 0.12s',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = 'var(--bg-hover)'; }}
            onMouseLeave={e => { e.currentTarget.style.background = activePage === 'interest-' + interest.id ? `${interest.color}12` : 'transparent'; }}
          >
            <div style={{ width: 8, height: 8, borderRadius: 2, background: interest.color, flexShrink: 0 }} />
            <span style={{ flex: 1 }}>{interest.label}</span>
            <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>{(interest.members / 1000).toFixed(1)}k</span>
          </button>
        ))}
        <button
          onClick={() => setActivePage('search')}
          style={{
            display: 'flex', alignItems: 'center', gap: 6,
            padding: '8px 12px', borderRadius: 8, width: '100%',
            background: 'none', border: 'none', cursor: 'pointer',
            fontFamily: 'var(--font-body)', fontSize: 13, color: 'var(--accent)',
            transition: 'background 0.1s', fontWeight: 500,
          }}
          onMouseEnter={e => e.currentTarget.style.background = 'var(--bg-hover)'}
          onMouseLeave={e => e.currentTarget.style.background = 'none'}
        >
          Discover all communities
          <ChevronRight size={13} />
        </button>
      </div>
    </div>
  );
}
