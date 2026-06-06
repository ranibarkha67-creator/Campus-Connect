import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { INTERESTS } from '../../data/mockData';
import { X, Send, Hash } from 'lucide-react';

export default function CreatePost({ onClose }) {
  const { addPost, user } = useApp();
  const [content, setContent] = useState('');
  const [selectedTags, setSelectedTags] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!content.trim()) return;
    setLoading(true);
    await new Promise(r => setTimeout(r, 400));
    addPost({ content, tags: selectedTags });
    setLoading(false);
    onClose();
  };

  const toggleTag = (id) =>
    setSelectedTags(prev => prev.includes(id) ? prev.filter(t => t !== id) : [...prev, id]);

  return (
    <div className="modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal">
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 20px', borderBottom: '1px solid var(--border)' }}>
          <h2 style={{ fontSize: 18, fontWeight: 700 }}>Create a post</h2>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-secondary)', display: 'flex', padding: 4, borderRadius: 6 }}>
            <X size={20} />
          </button>
        </div>

        <div style={{ padding: 20 }}>
          {/* User */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
            <div className="avatar avatar-md" style={{ background: user?.avatarColor || 'var(--accent)' }}>{user?.initials || 'DU'}</div>
            <div>
              <div style={{ fontSize: 14, fontWeight: 600 }}>{user?.name || 'Demo User'}</div>
              <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{user?.university || 'University'}</div>
            </div>
          </div>

          {/* Text area */}
          <textarea
            className="input"
            style={{ minHeight: 150, marginBottom: 16, fontSize: 15, lineHeight: 1.6 }}
            placeholder="What do you want to share with your campus?"
            value={content}
            onChange={e => setContent(e.target.value)}
            autoFocus
          />

          {/* Tags */}
          <div style={{ marginBottom: 16 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 10, fontSize: 13, color: 'var(--text-secondary)', fontWeight: 600 }}>
              <Hash size={14} />
              Tag a community
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              {INTERESTS.map(interest => {
                const active = selectedTags.includes(interest.id);
                return (
                  <button
                    key={interest.id}
                    onClick={() => toggleTag(interest.id)}
                    style={{
                      padding: '4px 10px', borderRadius: 20, fontSize: 12, fontWeight: 500,
                      border: `1px solid ${active ? interest.color : 'var(--border)'}`,
                      background: active ? `${interest.color}12` : 'transparent',
                      color: active ? interest.color : 'var(--text-secondary)',
                      cursor: 'pointer', transition: 'all 0.1s',
                      fontFamily: 'var(--font-body)',
                    }}
                  >
                    {interest.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div style={{ padding: '12px 20px', borderTop: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontSize: 12, color: content.length > 450 ? 'var(--error)' : 'var(--text-muted)' }}>
            {content.length}/500
          </span>
          <div style={{ display: 'flex', gap: 8 }}>
            <button className="btn btn-ghost" onClick={onClose}>Cancel</button>
            <button className="btn btn-primary" onClick={handleSubmit} disabled={!content.trim() || loading}>
              {loading ? 'Posting...' : 'Post'}
              <Send size={14} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
