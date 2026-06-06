import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { MOCK_USERS, CURRENT_USER, INTERESTS } from '../../data/mockData';
import { ThumbsUp, MessageSquare, Share2, Bookmark, MoreHorizontal, Send, BadgeCheck } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

function getUserById(id, users) {
  if (id === 'current') return CURRENT_USER;
  return users.find(u => u.id === id) || MOCK_USERS[0];
}

export default function PostCard({ post, setActivePage }) {
  const { users, toggleLike, toggleSave, addComment } = useApp();
  const [showComments, setShowComments] = useState(false);
  const [commentText, setCommentText] = useState('');
  const author = getUserById(post.authorId, users);
  const postInterests = INTERESTS.filter(i => post.tags?.includes(i.id));

  const handleComment = (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    addComment(post.id, commentText);
    setCommentText('');
  };

  return (
    <div className="card anim-up" style={{ marginBottom: 8 }}>
      {/* Spotlight */}
      {post.isSpotlight && (
        <div style={{
          padding: '7px 16px', borderBottom: '1px solid var(--border)',
          background: 'var(--accent-dim)', display: 'flex', alignItems: 'center', gap: 6,
        }}>
          <BadgeCheck size={13} color="var(--accent)" />
          <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--accent)' }}>Campus Spotlight</span>
        </div>
      )}

      <div style={{ padding: '16px' }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12, marginBottom: 12 }}>
          <button
            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, flexShrink: 0 }}
            onClick={() => setActivePage('user-' + post.authorId)}
          >
            <div className="avatar avatar-md" style={{ background: author.avatarColor }}>{author.initials}</div>
          </button>
          <div style={{ flex: 1, minWidth: 0 }}>
            <button
              style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, textAlign: 'left' }}
              onClick={() => setActivePage('user-' + post.authorId)}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-primary)' }}>{author.name}</span>
                {author.isVerified && <BadgeCheck size={14} color="var(--accent)" />}
              </div>
              <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{author.department} · {author.university}</div>
              <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>
                {formatDistanceToNow(new Date(post.timestamp), { addSuffix: true })}
              </div>
            </button>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexShrink: 0 }}>
            {postInterests.slice(0, 1).map(interest => (
              <span key={interest.id} className="tag" style={{
                background: `${interest.color}10`, color: interest.color,
                borderColor: `${interest.color}25`, fontSize: 11,
              }}>
                {interest.label}
              </span>
            ))}
            <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', padding: 4, borderRadius: 4, display: 'flex' }}>
              <MoreHorizontal size={16} />
            </button>
          </div>
        </div>

        {/* Content */}
        <p style={{ fontSize: 14, lineHeight: 1.65, color: 'var(--text-primary)', whiteSpace: 'pre-line', marginBottom: 14 }}>
          {post.content}
        </p>

        {/* Stats row */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: 10, borderBottom: '1px solid var(--border)', fontSize: 12, color: 'var(--text-muted)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            {post.liked && (
              <div style={{ width: 16, height: 16, borderRadius: '50%', background: 'var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <ThumbsUp size={9} color="#fff" />
              </div>
            )}
            <span>{post.likes > 0 ? post.likes : ''}</span>
          </div>
          <div style={{ display: 'flex', gap: 12 }}>
            {post.comments > 0 && <span>{post.comments} comments</span>}
            {post.shares > 0 && <span>{post.shares} reposts</span>}
          </div>
        </div>

        {/* Actions */}
        <div style={{ display: 'flex', gap: 0, marginTop: 4 }}>
          {[
            { icon: ThumbsUp, label: 'Like', active: post.liked, activeColor: 'var(--accent)', onClick: () => toggleLike(post.id) },
            { icon: MessageSquare, label: 'Comment', active: false, activeColor: 'var(--accent)', onClick: () => setShowComments(!showComments) },
            { icon: Share2, label: 'Repost', active: false, activeColor: 'var(--accent)', onClick: () => {} },
          ].map(action => (
            <button
              key={action.label}
              onClick={action.onClick}
              style={{
                flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
                padding: '8px 4px', background: 'none', border: 'none', cursor: 'pointer',
                borderRadius: 8, fontFamily: 'var(--font-body)', fontSize: 13, fontWeight: 600,
                color: action.active ? action.activeColor : 'var(--text-secondary)',
                transition: 'all 0.12s',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = 'var(--bg-hover)'; if (!action.active) e.currentTarget.style.color = 'var(--text-primary)'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'none'; e.currentTarget.style.color = action.active ? action.activeColor : 'var(--text-secondary)'; }}
            >
              <action.icon size={16} fill={action.active && action.label === 'Like' ? 'currentColor' : 'none'} />
              <span className="action-label">{action.label}</span>
            </button>
          ))}
          <button
            onClick={() => toggleSave(post.id)}
            style={{
              flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
              padding: '8px 4px', background: 'none', border: 'none', cursor: 'pointer',
              borderRadius: 8, fontFamily: 'var(--font-body)', fontSize: 13, fontWeight: 600,
              color: post.saved ? 'var(--accent)' : 'var(--text-secondary)', transition: 'all 0.12s',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = 'var(--bg-hover)'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'none'; }}
          >
            <Bookmark size={16} fill={post.saved ? 'currentColor' : 'none'} />
            <span className="action-label">Save</span>
          </button>
        </div>

        {/* Comments */}
        {showComments && (
          <div style={{ marginTop: 12, borderTop: '1px solid var(--border)', paddingTop: 14 }} className="anim-up">
            {post.commentList.length === 0 && (
              <p style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 14 }}>No comments yet.</p>
            )}
            {post.commentList.map(c => {
              const cAuthor = getUserById(c.authorId, users);
              return (
                <div key={c.id} style={{ display: 'flex', gap: 10, marginBottom: 12 }}>
                  <div className="avatar avatar-sm" style={{ background: cAuthor.avatarColor, flexShrink: 0 }}>{cAuthor.initials}</div>
                  <div style={{ background: 'var(--bg-elevated)', borderRadius: '0 8px 8px 8px', padding: '8px 12px', flex: 1 }}>
                    <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 2 }}>{cAuthor.name}</div>
                    <div style={{ fontSize: 13, color: 'var(--text-secondary)' }}>{c.text}</div>
                  </div>
                </div>
              );
            })}
            <form onSubmit={handleComment} style={{ display: 'flex', gap: 10 }}>
              <div className="avatar avatar-sm" style={{ background: 'var(--accent)', flexShrink: 0 }}>DU</div>
              <div style={{ flex: 1, display: 'flex', gap: 8 }}>
                <input
                  className="input"
                  style={{ flex: 1, height: 36, fontSize: 13, borderRadius: 18 }}
                  placeholder="Add a comment..."
                  value={commentText}
                  onChange={e => setCommentText(e.target.value)}
                />
                <button type="submit" className="btn btn-primary btn-sm" style={{ borderRadius: 18, padding: '0 14px' }} disabled={!commentText.trim()}>
                  <Send size={13} />
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
