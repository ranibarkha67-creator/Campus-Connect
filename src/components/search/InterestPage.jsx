import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { INTERESTS, MOCK_USERS } from '../../data/mockData';
import PostCard from '../feed/PostCard';
import { ArrowLeft, Users, FileText, BadgeCheck } from 'lucide-react';

export default function InterestPage({ interestId, setActivePage }) {
  const { posts, users, toggleFollow } = useApp();
  const [activeTab, setActiveTab] = useState('posts');
  const [joined, setJoined] = useState(false);

  const interest = INTERESTS.find(i => i.id === interestId);
  if (!interest) return null;

  const interestPosts = posts.filter(p => p.tags?.includes(interestId));
  const interestMembers = MOCK_USERS.filter(u => u.interests?.includes(interestId));

  return (
    <div>
      <button className="btn btn-text" style={{ marginBottom: 8, gap: 6 }} onClick={() => setActivePage('feed')}>
        <ArrowLeft size={16} /> Back
      </button>

      {/* Header */}
      <div className="card" style={{ marginBottom: 8 }}>
        <div style={{ height: 80, background: `linear-gradient(135deg, ${interest.color} 0%, ${interest.color}88 100%)`, borderRadius: '8px 8px 0 0' }} />
        <div style={{ padding: '16px 20px 20px' }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12 }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
                <div style={{ width: 12, height: 12, borderRadius: 3, background: interest.color }} />
                <h1 style={{ fontSize: 22, fontWeight: 700 }}>{interest.label}</h1>
              </div>
              <div style={{ display: 'flex', gap: 20, fontSize: 13, color: 'var(--text-secondary)' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><Users size={13} />{interest.members.toLocaleString()} members</span>
                <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><FileText size={13} />{interestPosts.length} posts</span>
              </div>
            </div>
            <button
              onClick={() => setJoined(!joined)}
              className={`btn btn-sm ${joined ? 'btn-ghost' : 'btn-primary'}`}
              style={{ flexShrink: 0 }}
            >
              {joined ? 'Joined' : 'Join community'}
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div style={{ display: 'flex', borderTop: '1px solid var(--border)' }}>
          {['posts', 'members'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                flex: 1, padding: '12px 0', border: 'none', background: 'none', cursor: 'pointer',
                fontFamily: 'var(--font-body)', fontSize: 14, fontWeight: 600,
                color: activeTab === tab ? 'var(--accent)' : 'var(--text-secondary)',
                borderBottom: `2px solid ${activeTab === tab ? 'var(--accent)' : 'transparent'}`,
                transition: 'all 0.12s',
              }}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {activeTab === 'posts' && (
        interestPosts.length > 0
          ? interestPosts.map(p => <PostCard key={p.id} post={p} setActivePage={setActivePage} />)
          : <div className="card empty-state"><h3>No posts in {interest.label} yet</h3><p>Be the first to share something in this community.</p><button className="btn btn-primary" onClick={() => setActivePage('create')}>Create post</button></div>
      )}

      {activeTab === 'members' && (
        <div className="card">
          {interestMembers.length > 0 ? interestMembers.map(u => (
            <div
              key={u.id}
              style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '14px 16px', cursor: 'pointer', borderBottom: '1px solid var(--border)', transition: 'background 0.1s' }}
              onClick={() => setActivePage('user-' + u.id)}
              onMouseEnter={e => e.currentTarget.style.background = 'var(--bg-hover)'}
              onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
            >
              <div className="avatar avatar-md" style={{ background: u.avatarColor, flexShrink: 0 }}>{u.initials}</div>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span style={{ fontSize: 14, fontWeight: 600 }}>{u.name}</span>
                  {u.isVerified && <BadgeCheck size={13} color="var(--accent)" />}
                </div>
                <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{u.university} · {u.year}</div>
              </div>
              <button
                className={`btn btn-sm ${u.isFollowing ? 'btn-ghost' : 'btn-outline'}`}
                onClick={e => { e.stopPropagation(); toggleFollow(u.id); }}
              >
                {u.isFollowing ? 'Following' : 'Follow'}
              </button>
            </div>
          )) : (
            <div className="empty-state"><h3>No members yet</h3><p>Join this community and invite your peers.</p></div>
          )}
        </div>
      )}
    </div>
  );
}
