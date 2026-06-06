import React from 'react';
import { useApp } from '../../context/AppContext';
import { INTERESTS, MOCK_EVENTS } from '../../data/mockData';
import { TrendingUp, Calendar, ArrowRight, Users } from 'lucide-react';
import { format } from 'date-fns';

export default function RightRail({ setActivePage }) {
  const { users, toggleFollow } = useApp();
  const trending = [...INTERESTS].sort((a, b) => b.members - a.members).slice(0, 5);
  const suggestions = users.filter(u => !u.isFollowing).slice(0, 3);
  const nextEvent = MOCK_EVENTS[0];

  return (
    <div style={{ position: 'sticky', top: 64, display: 'flex', flexDirection: 'column', gap: 12 }}>
      {/* Trending */}
      <div className="card" style={{ padding: '16px 0' }}>
        <div style={{ padding: '0 16px 10px', display: 'flex', alignItems: 'center', gap: 8 }}>
          <TrendingUp size={16} color="var(--accent)" />
          <span style={{ fontSize: 14, fontWeight: 700 }}>Trending communities</span>
        </div>
        {trending.map((interest, i) => (
          <button
            key={interest.id}
            onClick={() => setActivePage('interest-' + interest.id)}
            style={{
              display: 'flex', alignItems: 'center', gap: 10,
              padding: '9px 16px', background: 'none', border: 'none',
              cursor: 'pointer', width: '100%', transition: 'background 0.1s',
            }}
            onMouseEnter={e => e.currentTarget.style.background = 'var(--bg-hover)'}
            onMouseLeave={e => e.currentTarget.style.background = 'none'}
          >
            <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-muted)', width: 18, textAlign: 'right' }}>#{i+1}</span>
            <div style={{ width: 8, height: 8, borderRadius: 2, background: interest.color, flexShrink: 0 }} />
            <div style={{ flex: 1, textAlign: 'left' }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)' }}>{interest.label}</div>
              <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{interest.members.toLocaleString()} members</div>
            </div>
          </button>
        ))}
        <div style={{ padding: '8px 16px 0' }}>
          <button onClick={() => setActivePage('trending')} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--accent)', fontSize: 13, fontWeight: 500, fontFamily: 'var(--font-body)', display: 'flex', alignItems: 'center', gap: 4 }}>
            See all <ArrowRight size={13} />
          </button>
        </div>
      </div>

      {/* Upcoming event */}
      {nextEvent && (
        <div className="card" style={{ padding: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
            <Calendar size={15} color="var(--accent)" />
            <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Upcoming event</span>
          </div>
          <h4 style={{ fontSize: 14, fontWeight: 700, marginBottom: 4 }}>{nextEvent.title}</h4>
          <p style={{ fontSize: 12, color: 'var(--text-secondary)', marginBottom: 10, lineHeight: 1.5 }}>{nextEvent.description}</p>
          <div style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 12 }}>
            {format(nextEvent.date, 'MMM d')} · {nextEvent.members} attending
          </div>
          <button className="btn btn-outline btn-sm" onClick={() => setActivePage('events')} style={{ width: '100%' }}>
            View event
          </button>
        </div>
      )}

      {/* People to follow */}
      <div className="card" style={{ padding: '16px 0' }}>
        <div style={{ padding: '0 16px 10px', display: 'flex', alignItems: 'center', gap: 8 }}>
          <Users size={15} color="var(--accent)" />
          <span style={{ fontSize: 14, fontWeight: 700 }}>People to follow</span>
        </div>
        {suggestions.map(u => (
          <div key={u.id} style={{ padding: '8px 16px', display: 'flex', alignItems: 'center', gap: 10 }}>
            <div className="avatar avatar-sm" style={{ background: u.avatarColor, flexShrink: 0 }}>{u.initials}</div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 13, fontWeight: 600, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{u.name}</div>
              <div style={{ fontSize: 11, color: 'var(--text-muted)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{u.university}</div>
            </div>
            <button className="btn btn-outline btn-sm" onClick={() => toggleFollow(u.id)} style={{ flexShrink: 0 }}>
              Follow
            </button>
          </div>
        ))}
        <div style={{ padding: '8px 16px 0' }}>
          <button onClick={() => setActivePage('people')} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--accent)', fontSize: 13, fontWeight: 500, fontFamily: 'var(--font-body)', display: 'flex', alignItems: 'center', gap: 4 }}>
            View all <ArrowRight size={13} />
          </button>
        </div>
      </div>

      <div style={{ fontSize: 11, color: 'var(--text-muted)', lineHeight: 1.8, padding: '0 4px' }}>
        CampusConnect · Privacy · Terms · Help
      </div>
    </div>
  );
}
