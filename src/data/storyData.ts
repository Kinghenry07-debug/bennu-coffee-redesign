import { ReviewItem, LocalArtist } from '../types';

export const STORY_CONTENT = {
  title: 'Born in Austin, Fueled by Community',
  tagline: 'Where 24-hour hustle meets handcrafted gourmet coffee.',
  videoYoutubeId: '5qap5aO4i9A', // High quality documentary/story coffee roasting video embed
  videoTitle: 'Inside Bennu Coffee: Austin\'s 24/7 Creative Sanctuary',
  videoDescription: 'Watch founders Steve & Stephanie Hall share how Bennu Coffee grew from a dream on MLK Blvd to Austin\'s premier 24-hour community hub for artists, students, and night owls.',
  history: [
    {
      year: '2007',
      title: 'The Spark on MLK',
      description: 'Steve and Stephanie Hall founded Bennu Coffee at 2001 E Martin Luther King Jr Blvd with a single goal: build a warm, inclusive, 24-hour coffee house for Austin\'s diverse neighborhood.'
    },
    {
      year: '2010',
      title: 'The Gourmet Mocha Revolution',
      description: 'Bennu launched its signature line of 7 Gourmet Literary Mochas (The Great Gatsby, Don Quixote, Frankenstein, etc.), instantly becoming an Austin culinary legend.'
    },
    {
      year: '2016',
      title: 'Expanding the Flock',
      description: 'Opening the Jacob Fontaine location near Highland to serve East and Central Austin students with expanded patio space and nitro cold brew taps.'
    },
    {
      year: '2021',
      title: 'South Congress & Zero-Waste',
      description: 'Bennu opened on South Congress and converted 100% of coffee bean sourcing to certified Fair-Trade Organic direct-trade farms while launching local composting.'
    },
    {
      year: 'Today',
      title: 'Austin\'s Everlasting Flame',
      description: 'Over 15 million cups served, supporting hundreds of local Austin musicians, painters, and culinary artisans 24 hours a day.'
    }
  ],
  values: [
    {
      icon: 'Clock',
      title: 'Open 24/7/365',
      description: 'Our flagship MLK location never locks its doors. Whether you\'re cramming for finals at 3 AM or getting early morning espresso at 6 AM, we are here.'
    },
    {
      icon: 'Sparkles',
      title: '100% Fair-Trade & Organic',
      description: 'Every single bean brewed at Bennu is ethically harvested, organic certified, and roasted fresh locally in Austin, Texas.'
    },
    {
      icon: 'Palette',
      title: 'Rotating Austin Art',
      description: 'Our brick walls are a canvas for local Austin creators. 100% of art sale proceeds go directly to the local artists.'
    },
    {
      icon: 'HeartHandshake',
      title: 'Neighborhood First',
      description: 'We partner with local legendary spots like Tacodeli, Bakery Lorraine, and local Austin bakers to bring authentic local flavor to your table.'
    }
  ]
};

export const REVIEWS: ReviewItem[] = [
  {
    id: 'rev-1',
    author: 'Elena Vance',
    avatarInitials: 'EV',
    role: 'UT Austin PhD Graduate',
    rating: 5,
    comment: 'The Great Gatsby mocha with the toasted graham cracker rim is singlehandedly responsible for helping me pass my dissertation! The 24/7 atmosphere at MLK is unmatched—spacious, warm, and filled with creative energy.',
    date: '3 days ago',
    location: 'East MLK (24/7)',
    tag: 'Verified Regular',
    favoriteDrink: 'The Great Gatsby'
  },
  {
    id: 'rev-2',
    author: 'Marcus Brody',
    avatarInitials: 'MB',
    role: 'Austin Software Engineer & Night Owl',
    rating: 5,
    comment: 'Bennu is an absolute Austin institution. Best 24-hour nitro cold brew in central Texas, ultra-fast Wi-Fi, and the baristas remember your name and exact espresso preference even when you walk in at 2 AM!',
    date: '1 week ago',
    location: 'Highland (ACC)',
    tag: 'Austin Local',
    favoriteDrink: 'Nitro Cold Brew'
  },
  {
    id: 'rev-3',
    author: 'Samantha & Tyler',
    avatarInitials: 'ST',
    role: 'Design Duo & Local Creatives',
    rating: 5,
    comment: 'We come here every weekend for the Frankenstein matcha mocha and fresh Tacodeli migas tacos! Love seeing rotating Austin local art on the brick walls—100% of art sales going straight to the artists is incredible.',
    date: '2 weeks ago',
    location: 'South Congress',
    tag: 'Coffee Connoisseurs',
    favoriteDrink: 'Frankenstein Mocha'
  },
  {
    id: 'rev-4',
    author: 'Devon Miller',
    avatarInitials: 'DM',
    role: 'Local Indie Musician',
    rating: 5,
    comment: 'After late-night gigs on Red River, Bennu is my sacred post-show haven. The staff treat everyone like family, the 100% organic fair-trade espresso is world-class, and the Don Quixote mocha is pure magic.',
    date: '3 weeks ago',
    location: 'East MLK (24/7)',
    tag: 'Night Owl Musician',
    favoriteDrink: 'Don Quixote Mocha'
  },
  {
    id: 'rev-5',
    author: 'Maya Lin',
    avatarInitials: 'ML',
    role: 'Austin Neighborhood Resident',
    rating: 5,
    comment: 'I’ve been coming to Bennu for over 10 years. The quality of their organic coffee beans, the eco-conscious composting, and the genuinely friendly customer service make this the heart and soul of Austin coffee culture.',
    date: '1 month ago',
    location: 'East MLK (24/7)',
    tag: '10-Year Veteran',
    favoriteDrink: 'Mocha Maya'
  }
];

export const LOCAL_ARTISTS: LocalArtist[] = [
  {
    id: 'art-1',
    artistName: 'Maya Rios',
    artworkTitle: 'Celestial Phoenix over MLK',
    medium: 'Acrylic & Gold Leaf on Wood',
    locationFeatured: 'MLK Flagship',
    imageUrl: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=800&q=80',
    bio: 'Austin-based muralist capturing vibrant Texas sunsets and mythological rebirth.',
    instagram: '@mayarios.art'
  },
  {
    id: 'art-2',
    artistName: 'Javier Gomez',
    artworkTitle: 'Late Night Rhythms',
    medium: 'Oil on Canvas',
    locationFeatured: 'Highland',
    imageUrl: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&w=800&q=80',
    bio: 'Capturing the nocturnal energy of musicians and writers in Austin coffee shops.',
    instagram: '@javiergomez_paint'
  },
  {
    id: 'art-3',
    artistName: 'Zoe Thorne',
    artworkTitle: 'Bennu Botanical Dreams',
    medium: 'Screenprint & Watercolor',
    locationFeatured: 'South Congress',
    imageUrl: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=800&q=80',
    bio: 'Exploring native Texas flora and coffee plant botanicals in rich earthen tones.',
    instagram: '@zoethorne_studio'
  }
];
