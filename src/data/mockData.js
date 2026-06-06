export const INTERESTS = [
  { id: 'hackathons', label: 'Hackathons', color: '#0a66c2', members: 1240 },
  { id: 'ai-ml', label: 'AI / ML', color: '#6366f1', members: 980 },
  { id: 'startups', label: 'Startups', color: '#d97706', members: 760 },
  { id: 'music', label: 'Music', color: '#db2777', members: 1100 },
  { id: 'dance', label: 'Dance', color: '#7c3aed', members: 890 },
  { id: 'sports', label: 'Sports', color: '#059669', members: 1350 },
  { id: 'coding', label: 'Coding', color: '#0284c7', members: 1560 },
  { id: 'design', label: 'Design', color: '#ea580c', members: 670 },
  { id: 'photography', label: 'Photography', color: '#64748b', members: 540 },
  { id: 'gaming', label: 'Gaming', color: '#7c3aed', members: 820 },
  { id: 'debate', label: 'Debate & MUN', color: '#0891b2', members: 430 },
  { id: 'robotics', label: 'Robotics', color: '#16a34a', members: 310 },
];

export const MOCK_USERS = [
  {
    id: 'u1', name: 'Aanya Sharma', username: 'aanya.sharma',
    initials: 'AS', avatarColor: '#0a66c2',
    bio: 'CS junior passionate about AI and competitive coding. Building the future one commit at a time.',
    university: 'IIT Delhi', department: 'Computer Science', year: '3rd Year',
    interests: ['ai-ml', 'coding', 'hackathons'],
    github: 'github.com/aanya', linkedin: 'linkedin.com/in/aanya',
    followers: 842, following: 213, posts: 34, isFollowing: false, isVerified: true,
  },
  {
    id: 'u2', name: 'Rohan Mehta', username: 'rohan.mehta',
    initials: 'RM', avatarColor: '#d97706',
    bio: 'Startup founder | BITS Pilani | Building EdTech tools for the next generation.',
    university: 'BITS Pilani', department: 'Economics', year: '4th Year',
    interests: ['startups', 'coding', 'design'],
    github: 'github.com/rohanm', linkedin: 'linkedin.com/in/rohan-mehta',
    followers: 1203, following: 445, posts: 58, isFollowing: true, isVerified: true,
  },
  {
    id: 'u3', name: 'Priya Nair', username: 'priya.nair',
    initials: 'PN', avatarColor: '#db2777',
    bio: 'Classical dancer | NIT Trichy | Music production on weekends.',
    university: 'NIT Trichy', department: 'Electronics', year: '2nd Year',
    interests: ['dance', 'music', 'photography'],
    linkedin: 'linkedin.com/in/priya-nair',
    followers: 567, following: 188, posts: 22, isFollowing: false, isVerified: false,
  },
  {
    id: 'u4', name: 'Karan Singh', username: 'karan.singh',
    initials: 'KS', avatarColor: '#059669',
    bio: 'Football captain | DTU | Sports analytics and data science enthusiast.',
    university: 'DTU', department: 'Mechanical', year: '3rd Year',
    interests: ['sports', 'coding', 'gaming'],
    linkedin: 'linkedin.com/in/karan-singh',
    followers: 934, following: 302, posts: 41, isFollowing: true, isVerified: false,
  },
  {
    id: 'u5', name: 'Sneha Iyer', username: 'sneha.iyer',
    initials: 'SI', avatarColor: '#ea580c',
    bio: 'UI/UX designer | VIT Vellore | Making products that feel human.',
    university: 'VIT Vellore', department: 'Information Technology', year: '3rd Year',
    interests: ['design', 'startups', 'photography'],
    github: 'github.com/snehai', linkedin: 'linkedin.com/in/sneha-iyer',
    followers: 723, following: 267, posts: 29, isFollowing: false, isVerified: false,
  },
];

export const MOCK_POSTS = [
  {
    id: 'p1', authorId: 'u2', type: 'text',
    content: 'Just wrapped up our EdTech MVP. We built a peer-learning platform that matches students based on their strengths and learning gaps.\n\nLooking for 2 developers to join the team — React + Firebase stack. DM if interested.',
    tags: ['startups', 'coding'], likes: 142, comments: 28, shares: 15,
    saved: false, liked: false, timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
    isSpotlight: true,
    commentList: [
      { id: 'c1', authorId: 'u1', text: 'This is amazing! Sending you a DM.', timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000) },
      { id: 'c2', authorId: 'u5', text: 'Would love to contribute on the design side!', timestamp: new Date(Date.now() - 45 * 60 * 1000) },
    ]
  },
  {
    id: 'p2', authorId: 'u1', type: 'text',
    content: 'Observation after 3 hackathons: The winning teams are not always the best coders — they are the best communicators.\n\nYou can have the most technically complex project but if you cannot explain why it matters in 3 minutes, you lose. Presentation matters more than most people admit.',
    tags: ['hackathons', 'coding'], likes: 387, comments: 64, shares: 91,
    saved: true, liked: true, timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000),
    isSpotlight: false,
    commentList: [
      { id: 'c3', authorId: 'u4', text: 'Absolutely agree. Seen this firsthand.', timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000) },
    ]
  },
  {
    id: 'p3', authorId: 'u3', type: 'text',
    content: 'Annual cultural fest auditions are open. We are looking for dancers (classical, contemporary, hip-hop), singers, and musicians for the inter-university competition.\n\nNo experience cutoff — just passion. Sign up by Friday.',
    tags: ['dance', 'music'], likes: 215, comments: 43, shares: 67,
    saved: false, liked: false, timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000),
    isSpotlight: true, commentList: []
  },
  {
    id: 'p4', authorId: 'u4', type: 'text',
    content: 'Inter-college football tournament starts next weekend. Our team has been training for 3 months. Win or lose, proud of every single player on the roster.',
    tags: ['sports'], likes: 298, comments: 52, shares: 34,
    saved: false, liked: true, timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000),
    isSpotlight: false, commentList: []
  },
  {
    id: 'p5', authorId: 'u5', type: 'text',
    content: 'Redesigned our college student portal from scratch. The old one was unusable — confusing navigation, broken mobile layout, no dark mode.\n\nThe new version reduced task completion time by 60% in user testing. Good UX is not decoration, it is accessibility.',
    tags: ['design', 'startups'], likes: 445, comments: 78, shares: 112,
    saved: true, liked: false, timestamp: new Date(Date.now() - 18 * 60 * 60 * 1000),
    isSpotlight: true, commentList: []
  },
  {
    id: 'p6', authorId: 'u1', type: 'text',
    content: 'Resources I wish I had in 1st year:\n\n1. CS50 by Harvard (free, start here)\n2. fast.ai for practical deep learning\n3. The Pragmatic Programmer\n4. LeetCode (start easy, be consistent)\n5. Build one real project per semester\n\nSave this. Share with a junior.',
    tags: ['ai-ml', 'coding'], likes: 892, comments: 134, shares: 287,
    saved: true, liked: true, timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
    isSpotlight: false, commentList: []
  },
];

export const MOCK_EVENTS = [
  {
    id: 'e1', title: 'National Hackathon 2024', organizer: 'u2', type: 'hackathon',
    description: 'Build solutions for real-world problems in 36 hours. Cash prizes worth Rs 5L.',
    interest: 'hackathons', date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    members: 12, maxMembers: 40, lookingFor: ['Frontend Dev', 'ML Engineer', 'UI Designer'],
    tags: ['hackathons', 'coding', 'ai-ml'],
  },
  {
    id: 'e2', title: 'Music Production Workshop', organizer: 'u3', type: 'workshop',
    description: 'Learn the basics of music production using FL Studio and GarageBand.',
    interest: 'music', date: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
    members: 28, maxMembers: 30, lookingFor: [], tags: ['music'],
  },
  {
    id: 'e3', title: 'Startup Pitch Day', organizer: 'u2', type: 'competition',
    description: 'Present your startup idea to a panel of investors and mentors.',
    interest: 'startups', date: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
    members: 8, maxMembers: 20, lookingFor: [], tags: ['startups'],
  },
];

export const NOTIFICATIONS = [
  { id: 'n1', type: 'like', userId: 'u2', postId: 'p6', message: 'liked your post about CS resources', timestamp: new Date(Date.now() - 15 * 60 * 1000), read: false },
  { id: 'n2', type: 'follow', userId: 'u3', message: 'started following you', timestamp: new Date(Date.now() - 60 * 60 * 1000), read: false },
  { id: 'n3', type: 'comment', userId: 'u4', postId: 'p2', message: 'commented on your post', timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000), read: true },
  { id: 'n4', type: 'collab', userId: 'u5', eventId: 'e1', message: 'invited you to join National Hackathon 2024', timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000), read: true },
];

export const CURRENT_USER = {
  id: 'current', name: 'Demo User', username: 'demo.user',
  initials: 'DU', avatarColor: '#0a66c2',
  bio: 'Exploring campus life one connection at a time.',
  university: 'Demo University', department: 'Computer Science', year: '2nd Year',
  interests: ['coding', 'hackathons', 'ai-ml', 'design'],
  followers: 128, following: 94, posts: 12,
};
