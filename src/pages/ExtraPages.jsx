import React from 'react';
import { useApp } from '../context/AppContext';
import { INTERESTS } from '../data/mockData';
import PostCard from '../components/feed/PostCard';
import { BadgeCheck, TrendingUp, Bookmark, Users } from 'lucide-react';

/* ─── PEOPLE PAGE ─── */
export function PeoplePage({ setActivePage }) {
  const { users, toggleFollow } = useApp();

  return (
    <div>
      <div className="card" style={{ marginBottom: 8 }}>
        <div style={{ padding: '16px 16px 14px', borderBottom: '1px solid var(--border)' }}>
          <h1 style={{ fontSize: 20, fontWeight: 700, marginBottom: 3 }}>People</h1>
          <p style={{ fontSize: 13, color: 'var(--text-secondary)' }}>
            Connect with students who share your interests
          </p>
        </div>

        {users.map(u => (
          <div
            key={u.id}
            style={{
              display: 'flex', alignItems: 'flex-start', gap: 14,
              padding: '16px', borderBottom: '1px solid var(--border)',
              cursor: 'pointer', transition: 'background 0.1s',
            }}
            onClick={() => setActivePage('user-' + u.id)}
            onMouseEnter={e => e.currentTarget.style.background = 'var(--bg-hover)'}
            onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
          >
            <div className="avatar avatar-lg" style={{ background: u.avatarColor, flexShrink: 0 }}>{u.initials}</div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 2 }}>
                <span style={{ fontSize: 14, fontWeight: 600 }}>{u.name}</span>
                {u.isVerified && <BadgeCheck size={14} color="var(--accent)" />}
              </div>
              <div style={{ fontSize: 12, color: 'var(--text-secondary)', marginBottom: 6 }}>
                {u.department} · {u.university} · {u.year}
              </div>
              <p style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: 10 }}>{u.bio}</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                {u.interests.slice(0, 3).map(id => {
                  const interest = INTERESTS.find(i => i.id === id);
                  return interest ? (
                    <span key={id} className="tag" style={{ background: `${interest.color}10`, color: interest.color, borderColor: `${interest.color}25`, fontSize: 11 }}>
                      {interest.label}
                    </span>
                  ) : null;
                })}
              </div>
              <div style={{ display: 'flex', gap: 16, marginTop: 10, fontSize: 12, color: 'var(--text-muted)' }}>
                <span><strong style={{ color: 'var(--text-primary)', fontWeight: 600 }}>{u.followers.toLocaleString()}</strong> followers</span>
                <span><strong style={{ color: 'var(--text-primary)', fontWeight: 600 }}>{u.posts}</strong> posts</span>
              </div>
            </div>
            <button
              className={`btn btn-sm ${u.isFollowing ? 'btn-ghost' : 'btn-primary'}`}
              onClick={e => { e.stopPropagation(); toggleFollow(u.id); }}
              style={{ flexShrink: 0 }}
            >
              {u.isFollowing ? 'Following' : 'Follow'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── TRENDING PAGE ─── */
export function TrendingPage({ setActivePage }) {
  const { posts } = useApp();
  const topPosts = [...posts].sort((a, b) => b.likes - a.likes);
  const sortedInterests = [...INTERESTS].sort((a, b) => b.members - a.members);

  return (
    <div>
      {/* Trending communities */}
      <div className="card" style={{ marginBottom: 8 }}>
        <div style={{ padding: '16px 16px 12px', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: 8 }}>
          <TrendingUp size={18} color="var(--accent)" />
          <h1 style={{ fontSize: 20, fontWeight: 700 }}>Trending</h1>
        </div>
        <div style={{ padding: '14px 16px' }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 12 }}>
            Top communities
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: 8 }}>
            {sortedInterests.map((interest, i) => (
              <button
                key={interest.id}
                onClick={() => setActivePage('interest-' + interest.id)}
                style={{
                  padding: '12px', borderRadius: 8, textAlign: 'left',
                  border: `1px solid ${interest.color}20`,
                  background: `${interest.color}06`,
                  cursor: 'pointer', transition: 'all 0.15s',
                  fontFamily: 'var(--font-body)',
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = interest.color; e.currentTarget.style.background = `${interest.color}12`; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = `${interest.color}20`; e.currentTarget.style.background = `${interest.color}06`; }}
              >
                <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-muted)', marginBottom: 6 }}>#{i + 1}</div>
                <div style={{ width: 8, height: 8, borderRadius: 2, background: interest.color, marginBottom: 6 }} />
                <div style={{ fontSize: 13, fontWeight: 700, color: interest.color, marginBottom: 2 }}>{interest.label}</div>
                <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{interest.members.toLocaleString()} members</div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Top posts */}
      <div style={{ marginBottom: 8 }}>
        <div style={{ padding: '4px 0 8px', fontSize: 12, fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
          Top posts
        </div>
        {topPosts.map(post => <PostCard key={post.id} post={post} setActivePage={setActivePage} />)}
      </div>
    </div>
  );
}

/* ─── SAVED PAGE ─── */
export function SavedPage({ setActivePage }) {
  const { posts } = useApp();
  const savedPosts = posts.filter(p => p.saved);

  return (
    <div>
      <div className="card" style={{ marginBottom: 8 }}>
        <div style={{ padding: '16px', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: 8 }}>
          <Bookmark size={18} color="var(--accent)" />
          <div>
            <h1 style={{ fontSize: 20, fontWeight: 700 }}>Saved posts</h1>
            <p style={{ fontSize: 13, color: 'var(--text-secondary)', marginTop: 2 }}>
              {savedPosts.length} {savedPosts.length === 1 ? 'post' : 'posts'} saved
            </p>
          </div>
        </div>
      </div>

      {savedPosts.length > 0
        ? savedPosts.map(post => <PostCard key={post.id} post={post} setActivePage={setActivePage} />)
        : (
          <div className="card empty-state">
            <h3>Nothing saved yet</h3>
            <p>Click the bookmark icon on any post to save it here for later.</p>
            <button className="btn btn-primary" onClick={() => setActivePage('feed')}>Browse feed</button>
          </div>
        )
      }
    </div>
  );
}
