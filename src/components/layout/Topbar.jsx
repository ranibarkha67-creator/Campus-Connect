import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { BookOpen, Home, Users, Bell, Bookmark, Calendar, Search, Sun, Moon, LogOut, User, Zap, Plus } from 'lucide-react';

export default function Topbar({ activePage, setActivePage }) {
  const { theme, toggleTheme, unreadCount, user, logout } = useApp();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [searchVal, setSearchVal] = useState('');

  const navItems = [
    { id: 'feed', icon: Home, label: 'Home' },
    { id: 'people', icon: Users, label: 'People' },
    { id: 'events', icon: Calendar, label: 'Events' },
    { id: 'notifications', icon: Bell, label: 'Notifications', badge: unreadCount },
    { id: 'saved', icon: Bookmark, label: 'Saved' },
  ];

  return (
    <header className="topbar">
      <div className="topbar-inner">
        {/* Logo */}
        <button
          onClick={() => setActivePage('feed')}
          style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'none', border: 'none', cursor: 'pointer', flexShrink: 0, textDecoration: 'none' }}
        >
          <div style={{ width: 34, height: 34, borderRadius: 8, background: 'var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <BookOpen size={18} color="#fff" />
          </div>
          <span style={{ fontFamily: 'var(--font-display)', fontSize: 17, fontWeight: 800, color: 'var(--text-primary)', display: 'none' }} className="logo-text">CampusConnect</span>
        </button>

        {/* Search */}
        <div className="topbar-search" style={{ flex: 1, maxWidth: 280, position: 'relative' }}>
          <Search size={14} color="var(--text-muted)" style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
          <input
            className="input"
            style={{ paddingLeft: 32, height: 34, fontSize: 13, borderRadius: 20, background: 'var(--bg-elevated)' }}
            placeholder="Search"
            value={searchVal}
            onChange={e => setSearchVal(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter') { setActivePage('search'); setSearchVal(''); } }}
            onFocus={() => setActivePage('search')}
          />
        </div>

        {/* Nav items */}
        <nav style={{ display: 'flex', alignItems: 'stretch', flex: 1, justifyContent: 'center' }}>
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => setActivePage(item.id)}
              className={`nav-item ${activePage === item.id ? 'active' : ''}`}
              title={item.label}
            >
              <div style={{ position: 'relative' }}>
                <item.icon size={20} strokeWidth={activePage === item.id ? 2.5 : 1.8} />
                {item.badge > 0 && (
                  <span className="badge" style={{ position: 'absolute', top: -6, right: -6, minWidth: 14, height: 14, fontSize: 9 }}>
                    {item.badge > 9 ? '9+' : item.badge}
                  </span>
                )}
              </div>
              <span>{item.label}</span>
            </button>
          ))}
        </nav>

        {/* Right actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 4, flexShrink: 0 }}>
          <button
            className="btn btn-primary btn-sm"
            onClick={() => setActivePage('create')}
            style={{ gap: 4 }}
          >
            <Plus size={14} />
            <span style={{ display: 'none' }} className="btn-label">Post</span>
          </button>

          <button
            onClick={toggleTheme}
            className="btn btn-text"
            style={{ width: 34, height: 34, padding: 0, borderRadius: 8 }}
            title={theme === 'dark' ? 'Light mode' : 'Dark mode'}
          >
            {theme === 'dark' ? <Sun size={17} /> : <Moon size={17} />}
          </button>

          {/* User menu */}
          <div style={{ position: 'relative' }}>
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4, borderRadius: 8, display: 'flex', alignItems: 'center', gap: 6 }}
            >
              <div className="avatar avatar-sm" style={{ background: user?.avatarColor || 'var(--accent)' }}>
                {user?.initials || 'DU'}
              </div>
            </button>

            {showUserMenu && (
              <>
                <div style={{ position: 'fixed', inset: 0, zIndex: 99 }} onClick={() => setShowUserMenu(false)} />
                <div style={{
                  position: 'absolute', top: '100%', right: 0, marginTop: 8,
                  background: 'var(--bg-surface)', border: '1px solid var(--border)',
                  borderRadius: 12, padding: 8, minWidth: 200, zIndex: 100,
                  boxShadow: 'var(--shadow-lg)',
                }}>
                  <div style={{ padding: '10px 12px', borderBottom: '1px solid var(--border)', marginBottom: 4 }}>
                    <div style={{ fontSize: 14, fontWeight: 600 }}>{user?.name}</div>
                    <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{user?.university || 'University'}</div>
                  </div>
                  {[
                    { icon: User, label: 'View Profile', action: () => { setActivePage('profile'); setShowUserMenu(false); } },
                    { icon: Zap, label: 'Trending', action: () => { setActivePage('trending'); setShowUserMenu(false); } },
                  ].map(item => (
                    <button key={item.label} onClick={item.action} style={{
                      display: 'flex', alignItems: 'center', gap: 10, width: '100%',
                      padding: '9px 12px', background: 'none', border: 'none', cursor: 'pointer',
                      borderRadius: 8, fontFamily: 'var(--font-body)', fontSize: 13,
                      color: 'var(--text-primary)', transition: 'background 0.1s',
                    }}
                    onMouseEnter={e => e.currentTarget.style.background = 'var(--bg-hover)'}
                    onMouseLeave={e => e.currentTarget.style.background = 'none'}
                    >
                      <item.icon size={15} color="var(--text-secondary)" />
                      {item.label}
                    </button>
                  ))}
                  <div style={{ height: 1, background: 'var(--border)', margin: '4px 0' }} />
                  <button onClick={logout} style={{
                    display: 'flex', alignItems: 'center', gap: 10, width: '100%',
                    padding: '9px 12px', background: 'none', border: 'none', cursor: 'pointer',
                    borderRadius: 8, fontFamily: 'var(--font-body)', fontSize: 13,
                    color: 'var(--error)', transition: 'background 0.1s',
                  }}
                  onMouseEnter={e => e.currentTarget.style.background = 'var(--bg-hover)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'none'}
                  >
                    <LogOut size={15} />Sign out
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
