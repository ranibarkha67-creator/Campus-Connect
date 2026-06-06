import React, { createContext, useContext, useState, useEffect } from 'react';
import { MOCK_POSTS, MOCK_USERS, CURRENT_USER, NOTIFICATIONS } from '../data/mockData';

const AppContext = createContext();

export function AppProvider({ children }) {
  const [theme, setTheme] = useState(() => localStorage.getItem('cc-theme') || 'dark');
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [posts, setPosts] = useState(MOCK_POSTS);
  const [users, setUsers] = useState(MOCK_USERS);
  const [notifications, setNotifications] = useState(NOTIFICATIONS);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('cc-theme', theme);
  }, [theme]);

  useEffect(() => {
    const savedAuth = sessionStorage.getItem('cc-auth');
    if (savedAuth) {
      setUser(JSON.parse(savedAuth));
      setIsAuthenticated(true);
    }
  }, []);

  const login = (userData) => {
    const fullUser = { ...CURRENT_USER, ...userData };
    setUser(fullUser);
    setIsAuthenticated(true);
    sessionStorage.setItem('cc-auth', JSON.stringify(fullUser));
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    sessionStorage.removeItem('cc-auth');
  };

  const toggleTheme = () => setTheme(t => t === 'dark' ? 'light' : 'dark');

  const toggleLike = (postId) => {
    setPosts(prev => prev.map(p =>
      p.id === postId
        ? { ...p, liked: !p.liked, likes: p.liked ? p.likes - 1 : p.likes + 1 }
        : p
    ));
  };

  const toggleSave = (postId) => {
    setPosts(prev => prev.map(p =>
      p.id === postId ? { ...p, saved: !p.saved } : p
    ));
  };

  const addComment = (postId, text) => {
    setPosts(prev => prev.map(p =>
      p.id === postId
        ? {
            ...p,
            comments: p.comments + 1,
            commentList: [...p.commentList, {
              id: `c_${Date.now()}`,
              authorId: 'current',
              text,
              timestamp: new Date(),
            }]
          }
        : p
    ));
  };

  const addPost = (postData) => {
    const newPost = {
      id: `p_${Date.now()}`,
      authorId: 'current',
      type: 'text',
      likes: 0,
      comments: 0,
      shares: 0,
      saved: false,
      liked: false,
      timestamp: new Date(),
      isSpotlight: false,
      commentList: [],
      ...postData,
    };
    setPosts(prev => [newPost, ...prev]);
  };

  const toggleFollow = (userId) => {
    setUsers(prev => prev.map(u =>
      u.id === userId ? { ...u, isFollowing: !u.isFollowing, followers: u.isFollowing ? u.followers - 1 : u.followers + 1 } : u
    ));
  };

  const markNotificationsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <AppContext.Provider value={{
      theme, toggleTheme,
      user, isAuthenticated, login, logout,
      posts, toggleLike, toggleSave, addComment, addPost,
      users, toggleFollow,
      notifications, markNotificationsRead, unreadCount,
      searchQuery, setSearchQuery,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => useContext(AppContext);
