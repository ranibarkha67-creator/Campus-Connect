# CampusConnect

A professional social networking platform for university students. LinkedIn-inspired, fully responsive.

## Quick Start

```bash
npm install
npm run dev
# Open http://localhost:5173
# Click "Continue as Demo User" — no signup needed
```

## Project Structure

```
src/
├── main.jsx                          Entry point
├── App.jsx                           Router / page switcher
├── context/
│   └── AppContext.jsx                Global state (auth, posts, users, theme)
├── data/
│   └── mockData.js                   Mock users, posts, events, interests
├── styles/
│   ├── globals.css                   Design system, CSS variables, components
│   └── responsive.css               Breakpoints (mobile / tablet / desktop)
├── components/
│   ├── auth/
│   │   └── AuthPage.jsx             Login + Signup + Interest selection
│   ├── layout/
│   │   ├── Topbar.jsx               Top navigation bar (desktop + mobile)
│   │   ├── LeftRail.jsx             Left sidebar — profile card + nav (desktop)
│   │   ├── RightRail.jsx            Right sidebar — trending + suggestions (desktop)
│   │   └── BottomNav.jsx           Bottom navigation (mobile)
│   ├── feed/
│   │   ├── FeedPage.jsx             Home feed with filter tabs + skeleton loading
│   │   ├── PostCard.jsx             Post with like / comment / save / repost
│   │   ├── CreatePost.jsx           Create post modal
│   │   └── NotificationsPage.jsx    Notifications grouped by new / earlier
│   ├── profile/
│   │   └── ProfilePage.jsx          User profile — cover, stats, posts, saved
│   ├── search/
│   │   ├── SearchPage.jsx           Discover people + communities, live search
│   │   └── InterestPage.jsx         Community page — posts + members tabs
│   └── events/
│       └── EventsPage.jsx           Events + hackathons + team collaboration
└── pages/
    └── ExtraPages.jsx               People, Trending, Saved pages
```

## Responsive Layout

| Screen | Layout |
|--------|--------|
| Mobile < 768px | Single column, bottom navigation bar |
| Tablet 768–1100px | Left rail + main content |
| Desktop > 1100px | Left rail + main + right rail |

---

## Adding a Real Database (Supabase)

**Step 1 — Create project**
Go to supabase.com → New Project → copy URL and anon key.

**Step 2 — Install**
```bash
npm install @supabase/supabase-js
```

**Step 3 — Create src/lib/supabase.js**
```js
import { createClient } from '@supabase/supabase-js';
export const supabase = createClient('YOUR_URL', 'YOUR_ANON_KEY');
```

**Step 4 — SQL tables**
```sql
create table profiles (
  id uuid references auth.users primary key,
  name text, username text unique,
  bio text, university text, department text, year text,
  interests text[], github text, linkedin text,
  followers int default 0, following int default 0
);

create table posts (
  id uuid default gen_random_uuid() primary key,
  author_id uuid references profiles(id),
  content text not null, tags text[],
  likes int default 0, comments int default 0, shares int default 0,
  created_at timestamptz default now()
);

create table follows (
  follower_id uuid references profiles(id),
  following_id uuid references profiles(id),
  primary key (follower_id, following_id)
);
```

**Step 5 — Replace login() in AppContext.jsx**
```js
const { data, error } = await supabase.auth.signInWithPassword({ email, password });
```

---

## Adding Google Login (Supabase)

**Step 1** — Supabase Dashboard → Authentication → Providers → Google → Enable
Add your Google Client ID + Secret from Google Cloud Console.

**Step 2** — Add button in AuthPage.jsx
```jsx
const handleGoogle = async () => {
  await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: { redirectTo: window.location.origin }
  });
};

<button onClick={handleGoogle} className="btn btn-ghost" style={{ width: '100%' }}>
  Continue with Google
</button>
```

**Step 3** — Handle session in App.jsx
```js
useEffect(() => {
  supabase.auth.onAuthStateChange((event, session) => {
    if (session) login(session.user);
    else logout();
  });
}, []);
```
