import React from 'react';
import { useApp } from '../../context/AppContext';
import { Home, Search, Bell, Users, User } from 'lucide-react';

export default function BottomNav({ activePage, setActivePage }) {
  const { unreadCount } = useApp();

  const items = [
    { id: 'feed', icon: Home, label: 'Home' },
    { id: 'search', icon: Search, label: 'Search' },
    { id: 'notifications', icon: Bell, label: 'Alerts', badge: unreadCount },
    { id: 'people', icon: Users, label: 'People' },
    { id: 'profile', icon: User, label: 'Profile' },
  ];

  return (
    <nav className="bottom-nav">
      {items.map(item => {
        const active = activePage === item.id;
        return (
          <button
            key={item.id}
            onClick={() => setActivePage(item.id)}
            style={{
              flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3,
              padding: '8px 4px', background: 'none', border: 'none', cursor: 'pointer',
              color: active ? 'var(--accent)' : 'var(--text-muted)',
              fontFamily: 'var(--font-body)', fontSize: 10, fontWeight: active ? 600 : 400,
              transition: 'color 0.12s', borderTop: `2px solid ${active ? 'var(--accent)' : 'transparent'}`,
            }}
          >
            <div style={{ position: 'relative' }}>
              <item.icon size={21} strokeWidth={active ? 2.5 : 1.8} />
              {item.badge > 0 && (
                <span className="badge" style={{ position: 'absolute', top: -5, right: -5, minWidth: 14, height: 14, fontSize: 9 }}>
                  {item.badge > 9 ? '9+' : item.badge}
                </span>
              )}
            </div>
            <span>{item.label}</span>
          </button>
        );
      })}
    </nav>
  );
}
