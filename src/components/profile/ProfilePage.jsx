import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { MOCK_USERS, INTERESTS, CURRENT_USER } from '../../data/mockData';
import PostCard from '../feed/PostCard';
import { Github, Linkedin, MapPin, BookOpen, Calendar, FileText, Bookmark, ArrowLeft, BadgeCheck, UserPlus, MessageSquare } from 'lucide-react';

export default function ProfilePage({ userId, setActivePage }) {
  const { user: currentUser, users, posts, toggleFollow } = useApp();
  const [activeTab, setActiveTab] = useState('posts');
  const isOwn = !userId || userId === 'current';

  const profileUser = isOwn
    ? { ...CURRENT_USER, ...currentUser }
    : users.find(u => u.id === userId) || MOCK_USERS[0];

  const userPosts = posts.filter(p => p.authorId === (isOwn ? 'current' : userId));
  const savedPosts = posts.filter(p => p.saved);
  const interests = INTERESTS.filter(i => profileUser?.interests?.includes(i.id));

  const tabs = [
    { id: 'posts', label: 'Posts', icon: FileText, count: userPosts.length },
    ...(isOwn ? [{ id: 'saved', label: 'Saved', icon: Bookmark, count: savedPosts.length }] : []),
  ];

  return (
    <div>
      {!isOwn && (
        <button className="btn btn-text" style={{ marginBottom: 8, gap: 6 }} onClick={() => setActivePage('feed')}>
          <ArrowLeft size={16} /> Back
        </button>
      )}

      {/* Profile card */}
      <div className="card" style={{ marginBottom: 8, overflow: 'visible' }}>
        {/* Cover */}
        <div style={{ height: 100, background: `linear-gradient(135deg, var(--accent) 0%, ${profileUser?.avatarColor || 'var(--accent)'} 100%)`, borderRadius: '8px 8px 0 0' }} />

        <div style={{ padding: '0 20px 20px' }}>
          {/* Avatar row */}
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginTop: -40, marginBottom: 12 }}>
            <div className="avatar avatar-2xl" style={{
              background: profileUser?.avatarColor || 'var(--accent)',
              border: '4px solid var(--bg-surface)',
              boxShadow: 'var(--shadow)',
            }}>
              {profileUser?.initials || 'U'}
            </div>
            <div style={{ display: 'flex', gap: 8, paddingBottom: 4 }}>
              {isOwn ? (
                <button className="btn btn-outline btn-sm">Edit profile</button>
              ) : (
                <>
                  <button className="btn btn-outline btn-sm" style={{ gap: 5 }}>
                    <MessageSquare size={13} />Message
                  </button>
                  <button
                    className={`btn btn-sm ${profileUser?.isFollowing ? 'btn-ghost' : 'btn-primary'}`}
                    onClick={() => toggleFollow(profileUser.id)}
                    style={{ gap: 5 }}
                  >
                    <UserPlus size={13} />
                    {profileUser?.isFollowing ? 'Following' : 'Follow'}
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Name & info */}
          <div style={{ marginBottom: 14 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 3 }}>
              <h1 style={{ fontSize: 22, fontWeight: 700 }}>{profileUser?.name}</h1>
              {profileUser?.isVerified && <BadgeCheck size={20} color="var(--accent)" />}
            </div>
            <p style={{ fontSize: 14, color: 'var(--text-secondary)', marginBottom: 10, lineHeight: 1.5 }}>
              {profileUser?.bio}
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, fontSize: 13, color: 'var(--text-muted)' }}>
              {profileUser?.university && <span style={{ display: 'flex', alignItems: 'center', gap: 5 }}><MapPin size={13} />{profileUser.university}</span>}
              {profileUser?.department && <span style={{ display: 'flex', alignItems: 'center', gap: 5 }}><BookOpen size={13} />{profileUser.department}</span>}
              {profileUser?.year && <span style={{ display: 'flex', alignItems: 'center', gap: 5 }}><Calendar size={13} />{profileUser.year}</span>}
            </div>
          </div>

          {/* Stats */}
          <div style={{ display: 'flex', gap: 24, marginBottom: 16 }}>
            {[
              ['Posts', profileUser?.posts || userPosts.length],
              ['Followers', profileUser?.followers || 0],
              ['Following', profileUser?.following || 0],
            ].map(([label, val]) => (
              <div key={label}>
                <div style={{ fontSize: 18, fontWeight: 700, color: 'var(--accent)' }}>{val >= 1000 ? `${(val/1000).toFixed(1)}k` : val}</div>
                <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{label}</div>
              </div>
            ))}
          </div>

          {/* Interests */}
          {interests.length > 0 && (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 14 }}>
              {interests.map(i => (
                <span key={i.id} className="tag" style={{ background: `${i.color}10`, color: i.color, borderColor: `${i.color}25` }}>
                  {i.label}
                </span>
              ))}
            </div>
          )}

          {/* Links */}
          <div style={{ display: 'flex', gap: 8 }}>
            {profileUser?.github && (
              <a href={`https://${profileUser.github}`} target="_blank" rel="noopener noreferrer" className="btn btn-ghost btn-sm">
                <Github size={13} /> GitHub
              </a>
            )}
            {profileUser?.linkedin && (
              <a href={`https://${profileUser.linkedin}`} target="_blank" rel="noopener noreferrer" className="btn btn-ghost btn-sm" style={{ color: '#0077b5', borderColor: '#0077b5' }}>
                <Linkedin size={13} /> LinkedIn
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="card" style={{ marginBottom: 8 }}>
        <div style={{ display: 'flex', borderBottom: '1px solid var(--border)' }}>
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
                padding: '14px 0', border: 'none', background: 'none', cursor: 'pointer',
                fontFamily: 'var(--font-body)', fontSize: 14, fontWeight: 600,
                color: activeTab === tab.id ? 'var(--accent)' : 'var(--text-secondary)',
                borderBottom: `2px solid ${activeTab === tab.id ? 'var(--accent)' : 'transparent'}`,
                marginBottom: -1, transition: 'all 0.12s',
              }}
            >
              <tab.icon size={15} />
              {tab.label}
              <span style={{
                padding: '1px 7px', borderRadius: 12, fontSize: 11, fontWeight: 700,
                background: activeTab === tab.id ? 'var(--accent-dim)' : 'var(--bg-elevated)',
                color: activeTab === tab.id ? 'var(--accent)' : 'var(--text-muted)',
              }}>{tab.count}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      {activeTab === 'posts' && (
        userPosts.length > 0
          ? userPosts.map(p => <PostCard key={p.id} post={p} setActivePage={setActivePage} />)
          : <div className="card empty-state"><h3>No posts yet</h3><p>{isOwn ? 'Share something with your campus community.' : 'This user has not posted yet.'}</p></div>
      )}
      {activeTab === 'saved' && (
        savedPosts.length > 0
          ? savedPosts.map(p => <PostCard key={p.id} post={p} setActivePage={setActivePage} />)
          : <div className="card empty-state"><h3>Nothing saved</h3><p>Posts you bookmark will appear here.</p></div>
      )}
    </div>
  );
}
