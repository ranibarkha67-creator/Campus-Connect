import React, { useState } from 'react';
import { MOCK_EVENTS, MOCK_USERS, INTERESTS } from '../../data/mockData';
import { Calendar, Users, Clock, Plus, MapPin, ChevronRight } from 'lucide-react';
import { format, formatDistanceToNow } from 'date-fns';

function EventCard({ event }) {
  const [joined, setJoined] = useState(false);
  const organizer = MOCK_USERS.find(u => u.id === event.organizer) || MOCK_USERS[0];
  const interest = INTERESTS.find(i => i.id === event.interest);
  const isFull = event.members >= event.maxMembers;
  const spotsLeft = event.maxMembers - event.members;
  const pct = Math.round((event.members / event.maxMembers) * 100);

  const typeColor = {
    hackathon: '#0a66c2',
    workshop: '#057642',
    competition: '#d97706',
  }[event.type] || '#64748b';

  return (
    <div
      className="card"
      style={{ marginBottom: 8, transition: 'box-shadow 0.15s' }}
      onMouseEnter={e => e.currentTarget.style.boxShadow = 'var(--shadow)'}
      onMouseLeave={e => e.currentTarget.style.boxShadow = 'none'}
    >
      <div style={{ height: 4, background: typeColor, borderRadius: '8px 8px 0 0' }} />
      <div style={{ padding: '16px' }}>
        {/* Badge row */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
          <span style={{
            padding: '3px 10px', borderRadius: 20, fontSize: 11, fontWeight: 700,
            background: `${typeColor}12`, color: typeColor,
            textTransform: 'uppercase', letterSpacing: '0.05em',
          }}>
            {event.type}
          </span>
          {interest && (
            <span className="tag" style={{ background: `${interest.color}10`, color: interest.color, borderColor: `${interest.color}25`, fontSize: 11 }}>
              {interest.label}
            </span>
          )}
        </div>

        {/* Title */}
        <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 6 }}>{event.title}</h3>
        <p style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: 14 }}>{event.description}</p>

        {/* Meta */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, marginBottom: 14, fontSize: 13, color: 'var(--text-muted)' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
            <Calendar size={13} />{format(event.date, 'MMM d, yyyy')}
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
            <Clock size={13} />{formatDistanceToNow(event.date, { addSuffix: true })}
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
            <Users size={13} />{event.members}/{event.maxMembers} attending
          </span>
        </div>

        {/* Roles wanted */}
        {event.lookingFor?.length > 0 && (
          <div style={{ marginBottom: 14 }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-muted)', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Looking for
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              {event.lookingFor.map(role => (
                <span key={role} className="tag">{role}</span>
              ))}
            </div>
          </div>
        )}

        {/* Progress */}
        <div style={{ marginBottom: 14 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: 'var(--text-muted)', marginBottom: 5 }}>
            <span>{event.members} attending</span>
            <span>{isFull ? 'Full' : `${spotsLeft} spots left`}</span>
          </div>
          <div style={{ height: 4, background: 'var(--bg-elevated)', borderRadius: 999 }}>
            <div style={{
              height: '100%', borderRadius: 999,
              width: `${Math.min(pct, 100)}%`,
              background: isFull ? 'var(--error)' : typeColor,
              transition: 'width 0.6s ease',
            }} />
          </div>
        </div>

        {/* Footer */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: 12, borderTop: '1px solid var(--border)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div className="avatar avatar-sm" style={{ background: organizer.avatarColor }}>{organizer.initials}</div>
            <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>
              Organized by <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{organizer.name}</span>
            </span>
          </div>
          <button
            className={`btn btn-sm ${joined ? 'btn-ghost' : isFull ? 'btn-ghost' : 'btn-primary'}`}
            disabled={isFull && !joined}
            onClick={() => setJoined(!joined)}
          >
            {joined ? 'Joined' : isFull ? 'Full' : 'Join'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function EventsPage() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [showCreate, setShowCreate] = useState(false);

  const filters = [
    { id: 'all', label: 'All events' },
    { id: 'hackathon', label: 'Hackathons' },
    { id: 'workshop', label: 'Workshops' },
    { id: 'competition', label: 'Competitions' },
  ];

  const filtered = activeFilter === 'all'
    ? MOCK_EVENTS
    : MOCK_EVENTS.filter(e => e.type === activeFilter);

  return (
    <div>
      {/* Header */}
      <div className="card" style={{ padding: '16px', marginBottom: 8 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
          <div>
            <h1 style={{ fontSize: 20, fontWeight: 700, marginBottom: 3 }}>Events & Collaborations</h1>
            <p style={{ fontSize: 13, color: 'var(--text-secondary)' }}>Find teams, join events, collaborate with peers</p>
          </div>
          <button className="btn btn-primary btn-sm" onClick={() => setShowCreate(true)}>
            <Plus size={14} /> Create
          </button>
        </div>

        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 0, background: 'var(--bg-elevated)', borderRadius: 8, overflow: 'hidden' }}>
          {[
            { label: 'Active Events', value: '24' },
            { label: 'Team Openings', value: '8' },
            { label: 'This Weekend', value: '3' },
          ].map((stat, i) => (
            <div key={stat.label} style={{ padding: '14px', textAlign: 'center', borderRight: i < 2 ? '1px solid var(--border)' : 'none' }}>
              <div style={{ fontSize: 22, fontWeight: 700, color: 'var(--accent)' }}>{stat.value}</div>
              <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Filters */}
      <div style={{ display: 'flex', gap: 6, marginBottom: 8, overflowX: 'auto', scrollbarWidth: 'none', padding: '2px 0' }}>
        {filters.map(f => (
          <button
            key={f.id}
            onClick={() => setActiveFilter(f.id)}
            style={{
              padding: '7px 14px', borderRadius: 20,
              fontFamily: 'var(--font-body)', fontSize: 13, fontWeight: 500,
              cursor: 'pointer', whiteSpace: 'nowrap', transition: 'all 0.12s',
              background: activeFilter === f.id ? 'var(--accent)' : 'var(--bg-surface)',
              color: activeFilter === f.id ? '#fff' : 'var(--text-secondary)',
              border: activeFilter === f.id ? 'none' : '1px solid var(--border)',
            }}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Events */}
      {filtered.length > 0
        ? filtered.map(event => <EventCard key={event.id} event={event} />)
        : (
          <div className="card empty-state">
            <h3>No events found</h3>
            <p>Be the first to create one in this category.</p>
            <button className="btn btn-primary" onClick={() => setShowCreate(true)}>Create event</button>
          </div>
        )
      }

      {/* Create event modal placeholder */}
      {showCreate && (
        <div className="modal-overlay" onClick={e => e.target === e.currentTarget && setShowCreate(false)}>
          <div className="modal" style={{ padding: 24 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
              <h2 style={{ fontSize: 18, fontWeight: 700 }}>Create an event</h2>
              <button onClick={() => setShowCreate(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-secondary)', fontSize: 20, lineHeight: 1 }}>×</button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {[
                { label: 'Event title', placeholder: 'e.g. Hackathon 2024' },
                { label: 'Description', placeholder: 'Describe your event...' },
              ].map(field => (
                <div key={field.label}>
                  <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: 'var(--text-secondary)', marginBottom: 5 }}>{field.label}</label>
                  <input className="input" placeholder={field.placeholder} />
                </div>
              ))}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <div>
                  <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: 'var(--text-secondary)', marginBottom: 5 }}>Date</label>
                  <input className="input" type="date" />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: 'var(--text-secondary)', marginBottom: 5 }}>Type</label>
                  <select className="input" style={{ appearance: 'none' }}>
                    <option>Hackathon</option>
                    <option>Workshop</option>
                    <option>Competition</option>
                  </select>
                </div>
              </div>
            </div>
            <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end', marginTop: 20, paddingTop: 16, borderTop: '1px solid var(--border)' }}>
              <button className="btn btn-ghost" onClick={() => setShowCreate(false)}>Cancel</button>
              <button className="btn btn-primary" onClick={() => setShowCreate(false)}>Create event</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
