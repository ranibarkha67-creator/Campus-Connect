import React, { useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { MOCK_USERS } from '../../data/mockData';
import { ThumbsUp, UserPlus, MessageSquare, Users } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

const TYPE_CONFIG = {
  like:    { icon: ThumbsUp,    color: '#0a66c2' },
  follow:  { icon: UserPlus,    color: '#057642' },
  comment: { icon: MessageSquare, color: '#0891b2' },
  collab:  { icon: Users,       color: '#d97706' },
};

export default function NotificationsPage() {
  const { notifications, markNotificationsRead, users } = useApp();
  const getUser = (id) => users.find(u => u.id === id) || MOCK_USERS[0];

  useEffect(() => {
    const t = setTimeout(markNotificationsRead, 2000);
    return () => clearTimeout(t);
  }, []);

  const newNotifs = notifications.filter(n => !n.read);
  const oldNotifs = notifications.filter(n => n.read);

  return (
    <div>
      <div className="card" style={{ marginBottom: 8 }}>
        <div style={{ padding: '16px 16px 0', borderBottom: '1px solid var(--border)', marginBottom: 0 }}>
          <h1 style={{ fontSize: 20, fontWeight: 700, marginBottom: 16 }}>Notifications</h1>
        </div>

        {notifications.length === 0 && (
          <div className="empty-state">
            <h3>All caught up</h3>
            <p>Notifications about likes, comments, and followers will appear here.</p>
          </div>
        )}

        {newNotifs.length > 0 && (
          <div>
            <div style={{ padding: '14px 16px 6px', fontSize: 12, fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>New</div>
            {newNotifs.map(n => <NotifItem key={n.id} notif={n} user={getUser(n.userId)} isNew />)}
          </div>
        )}

        {oldNotifs.length > 0 && (
          <div>
            <div style={{ padding: '14px 16px 6px', fontSize: 12, fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Earlier</div>
            {oldNotifs.map(n => <NotifItem key={n.id} notif={n} user={getUser(n.userId)} />)}
          </div>
        )}
      </div>
    </div>
  );
}

function NotifItem({ notif, user, isNew }) {
  const cfg = TYPE_CONFIG[notif.type] || TYPE_CONFIG.like;
  const Icon = cfg.icon;

  return (
    <div
      style={{
        display: 'flex', alignItems: 'center', gap: 12,
        padding: '12px 16px', cursor: 'pointer', transition: 'background 0.1s',
        background: isNew ? 'var(--accent-dim)' : 'transparent',
        borderBottom: '1px solid var(--border)',
      }}
      onMouseEnter={e => e.currentTarget.style.background = 'var(--bg-hover)'}
      onMouseLeave={e => e.currentTarget.style.background = isNew ? 'var(--accent-dim)' : 'transparent'}
    >
      <div style={{ position: 'relative', flexShrink: 0 }}>
        <div className="avatar avatar-md" style={{ background: user.avatarColor }}>{user.initials}</div>
        <div style={{
          position: 'absolute', bottom: -2, right: -2,
          width: 18, height: 18, borderRadius: '50%',
          background: cfg.color, border: '2px solid var(--bg-surface)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <Icon size={9} color="#fff" />
        </div>
      </div>
      <div style={{ flex: 1 }}>
        <p style={{ fontSize: 14, lineHeight: 1.4 }}>
          <strong style={{ fontWeight: 600 }}>{user.name}</strong>{' '}
          <span style={{ color: 'var(--text-secondary)' }}>{notif.message}</span>
        </p>
        <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>
          {formatDistanceToNow(new Date(notif.timestamp), { addSuffix: true })}
        </span>
      </div>
      {isNew && <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--accent)', flexShrink: 0 }} />}
    </div>
  );
}
