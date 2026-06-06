import React, { useState } from 'react';
import { useApp } from './context/AppContext';
import AuthPage from './components/auth/AuthPage';
import Topbar from './components/layout/Topbar';
import LeftRail from './components/layout/LeftRail';
import RightRail from './components/layout/RightRail';
import BottomNav from './components/layout/BottomNav';
import FeedPage from './components/feed/FeedPage';
import SearchPage from './components/search/SearchPage';
import ProfilePage from './components/profile/ProfilePage';
import NotificationsPage from './components/feed/NotificationsPage';
import EventsPage from './components/events/EventsPage';
import InterestPage from './components/search/InterestPage';
import CreatePost from './components/feed/CreatePost';
import { PeoplePage, TrendingPage, SavedPage } from './pages/ExtraPages';

export default function App() {
  const { isAuthenticated } = useApp();
  const [activePage, setActivePage] = useState('feed');

  if (!isAuthenticated) return <AuthPage />;

  const isInterestPage = activePage.startsWith('interest-');
  const isUserPage = activePage.startsWith('user-');
  const isCreatePage = activePage === 'create';

  const renderMain = () => {
    if (isInterestPage) return <InterestPage interestId={activePage.replace('interest-', '')} setActivePage={setActivePage} />;
    if (isUserPage) return <ProfilePage userId={activePage.replace('user-', '')} setActivePage={setActivePage} />;
    switch (activePage) {
      case 'feed':          return <FeedPage setActivePage={setActivePage} />;
      case 'search':        return <SearchPage setActivePage={setActivePage} />;
      case 'profile':       return <ProfilePage setActivePage={setActivePage} />;
      case 'notifications': return <NotificationsPage />;
      case 'events':        return <EventsPage />;
      case 'people':        return <PeoplePage setActivePage={setActivePage} />;
      case 'trending':      return <TrendingPage setActivePage={setActivePage} />;
      case 'saved':         return <SavedPage setActivePage={setActivePage} />;
      default:              return <FeedPage setActivePage={setActivePage} />;
    }
  };

  const showRight = ['feed', 'trending'].includes(activePage) || isInterestPage;

  return (
    <div className="app-shell">
      <Topbar activePage={activePage} setActivePage={setActivePage} />
      <div className="page-content">
        <div className="left-rail">
          <LeftRail activePage={activePage} setActivePage={setActivePage} />
        </div>
        <main style={{ minWidth: 0 }}>
          {renderMain()}
        </main>
        {showRight && (
          <div className="right-rail">
            <RightRail setActivePage={setActivePage} />
          </div>
        )}
      </div>
      <BottomNav activePage={activePage} setActivePage={setActivePage} />
      {isCreatePage && <CreatePost onClose={() => setActivePage('feed')} />}
    </div>
  );
}
