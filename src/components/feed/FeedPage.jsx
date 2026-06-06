import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { INTERESTS } from '../../data/mockData';
import PostCard from './PostCard';
import CreatePost from './CreatePost';
import { Plus, Image, FileText } from 'lucide-react';

function SkeletonPost() {
  return (
    <div className="card" style={{ padding: 16, marginBottom: 8 }}>
      <div style={{ display: 'flex', gap: 12, marginBottom: 14 }}>
        <div className="skeleton" style={{ width: 40, height: 40, borderRadius: '50%', flexShrink: 0 }} />
        <div style={{ flex: 1 }}>
          <div className="skeleton" style={{ height: 13, width: '40%', marginBottom: 8 }} />
          <div className="skeleton" style={{ height: 11, width: '28%', marginBottom: 6 }} />
          <div className="skeleton" style={{ height: 11, width: '18%' }} />
        </div>
      </div>
      <div className="skeleton" style={{ height: 13, width: '100%', marginBottom: 7 }} />
      <div className="skeleton" style={{ height: 13, width: '90%', marginBottom: 7 }} />
      <div className="skeleton" style={{ height: 13, width: '70%', marginBottom: 16 }} />
      <div style={{ display: 'flex', gap: 8, paddingTop: 12, borderTop: '1px solid var(--border)' }}>
        {[1,2,3,4].map(i => <div key={i} className="skeleton" style={{ flex: 1, height: 32, borderRadius: 8 }} />)}
      </div>
    </div>
  );
}

export default function FeedPage({ setActivePage }) {
  const { posts, user } = useApp();
  const [loading, setLoading] = useState(true);
  const [showCreate, setShowCreate] = useState(false);
  const [activeFilter, setActiveFilter] = useState('all');

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(t);
  }, []);

  const filters = [
    { id: 'all', label: 'All posts' },
    { id: 'following', label: 'Following' },
    ...INTERESTS.filter(i => user?.interests?.includes(i.id)).slice(0, 3).map(i => ({ id: i.id, label: i.label })),
  ];

  const filteredPosts = posts.filter(p => {
    if (activeFilter === 'all' || activeFilter === 'following') return true;
    return p.tags?.includes(activeFilter);
  });

  return (
    <div>
      {/* Create post card */}
      <div className="card" style={{ padding: '12px 16px', marginBottom: 8 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
          <div className="avatar avatar-md" style={{ background: user?.avatarColor || 'var(--accent)' }}>
            {user?.initials || 'DU'}
          </div>
          <button
            onClick={() => setShowCreate(true)}
            style={{
              flex: 1, height: 40, padding: '0 14px',
              background: 'var(--bg-elevated)', border: '1px solid var(--border)',
              borderRadius: 20, cursor: 'pointer', textAlign: 'left',
              fontFamily: 'var(--font-body)', fontSize: 14, color: 'var(--text-muted)',
              transition: 'border-color 0.12s',
            }}
            onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--text-secondary)'}
            onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border)'}
          >
            Start a post, {user?.name?.split(' ')[0] || 'there'}
          </button>
        </div>
        <div style={{ display: 'flex', gap: 0, paddingTop: 4, borderTop: '1px solid var(--border)' }}>
          {[
            { icon: Image, label: 'Photo', color: '#0a66c2' },
            { icon: FileText, label: 'Article', color: '#d97706' },
            { icon: Plus, label: 'More', color: '#057642' },
          ].map(item => (
            <button
              key={item.label}
              onClick={() => setShowCreate(true)}
              style={{
                flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                padding: '8px 4px', background: 'none', border: 'none', cursor: 'pointer',
                borderRadius: 8, fontFamily: 'var(--font-body)', fontSize: 13, fontWeight: 600,
                color: 'var(--text-secondary)', transition: 'background 0.12s',
              }}
              onMouseEnter={e => e.currentTarget.style.background = 'var(--bg-hover)'}
              onMouseLeave={e => e.currentTarget.style.background = 'none'}
            >
              <item.icon size={16} color={item.color} />
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* Filter tabs */}
      <div style={{ display: 'flex', gap: 6, marginBottom: 8, overflowX: 'auto', scrollbarWidth: 'none', padding: '0 0 2px' }}>
        {filters.map(f => (
          <button
            key={f.id}
            onClick={() => setActiveFilter(f.id)}
            style={{
              padding: '7px 14px', borderRadius: 20, border: 'none',
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

      {/* Posts */}
      {loading
        ? [1,2,3].map(i => <SkeletonPost key={i} />)
        : filteredPosts.length > 0
          ? filteredPosts.map(post => <PostCard key={post.id} post={post} setActivePage={setActivePage} />)
          : (
            <div className="card empty-state">
              <h3>Nothing here yet</h3>
              <p>Follow more people or explore communities to see posts here.</p>
              <button className="btn btn-primary" onClick={() => setActivePage('search')}>Discover people</button>
            </div>
          )
      }

      {showCreate && <CreatePost onClose={() => setShowCreate(false)} />}
    </div>
  );
}
