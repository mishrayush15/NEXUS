import { ChatRoom } from '../types/chat';

// Sample avatar data for use in messages
const avatars = [
  "https://i.pravatar.cc/150?img=1",
  "https://i.pravatar.cc/150?img=2",
  "https://i.pravatar.cc/150?img=3",
  "https://i.pravatar.cc/150?img=4",
  "https://i.pravatar.cc/150?img=5",
  "https://i.pravatar.cc/150?img=6",
  "https://i.pravatar.cc/150?img=7",
  "https://i.pravatar.cc/150?img=8"
];

// Original sample groups plus 100 additional groups
export const sampleGroups: ChatRoom[] = [
  {
    id: '1',
    name: 'Tech Innovators',
    description: 'Discuss the latest in technology and innovation',
    members: 238,
    category: 'Technology',
    timeSpent: 1420, // ~23.7 hours total time spent by all users daily
    trending: 9,
    messages: [
      {
        id: '1',
        content: 'Has anyone tried the new AR glasses?',
        sender: 'Alex',
        timestamp: new Date(Date.now() - 3600000 * 2),
        avatar: avatars[0]
      },
      {
        id: '2',
        content: 'Yes, they\'re amazing! The spatial mapping is incredibly accurate.',
        sender: 'Jordan',
        timestamp: new Date(Date.now() - 3600000),
        avatar: avatars[1]
      },
      {
        id: '3',
        content: 'I\'m waiting for the next version. I heard they\'re adding neural interfaces.',
        sender: 'Taylor',
        timestamp: new Date(Date.now() - 1800000),
        avatar: avatars[2]
      }
    ]
  },
  {
    id: '2',
    name: 'Creative Minds',
    description: 'A space for artists, writers, and creative folks',
    members: 156,
    category: 'Art & Design',
    timeSpent: 980, // ~16.3 hours
    trending: 6,
    messages: [
      {
        id: '1',
        content: 'Just finished my latest painting, would love some feedback!',
        sender: 'Morgan',
        timestamp: new Date(Date.now() - 7200000),
        avatar: avatars[3]
      },
      {
        id: '2',
        content: 'I\'d love to see it! Please share.',
        sender: 'Riley',
        timestamp: new Date(Date.now() - 3600000),
        avatar: avatars[4]
      }
    ]
  },
  {
    id: '3',
    name: 'Fitness Journey',
    description: 'Share your fitness goals and progress',
    members: 192,
    category: 'Health & Fitness',
    timeSpent: 1680, // ~28 hours
    trending: 10, 
    messages: [
      {
        id: '1',
        content: 'Just completed my first marathon!',
        sender: 'Jamie',
        timestamp: new Date(Date.now() - 86400000),
        avatar: avatars[5]
      },
      {
        id: '2',
        content: 'Congratulations! What\'s your next goal?',
        sender: 'Casey',
        timestamp: new Date(Date.now() - 43200000),
        avatar: avatars[6]
      }
    ]
  },
  {
    id: '4',
    name: 'Book Club',
    description: 'Discuss your favorite books and discover new ones',
    members: 122,
    category: 'Literature',
    timeSpent: 760, // ~12.7 hours
    trending: 5,
    messages: []
  },
  {
    id: '5',
    name: 'Gaming Squad',
    description: 'Find teammates and discuss your favorite games',
    members: 345,
    category: 'Gaming',
    timeSpent: 1520, // ~25.3 hours
    trending: 8,
    messages: []
  },
  {
    id: '6',
    name: 'Travel Adventures',
    description: 'Share travel stories and tips from around the world',
    members: 188,
    category: 'Travel',
    timeSpent: 890, // ~14.8 hours
    trending: 7,
    messages: []
  },
  // Anime Groups
  {
    id: '7',
    name: 'Anime Universe',
    description: 'Discuss all things anime - from classics to the latest releases',
    members: 421,
    category: 'Anime',
    timeSpent: 2100,
    trending: 9,
    messages: []
  },
  {
    id: '8',
    name: 'Studio Ghibli Fans',
    description: 'For fans of Miyazaki\'s works and Studio Ghibli films',
    members: 289,
    category: 'Anime',
    timeSpent: 1350,
    trending: 7,
    messages: []
  },
  {
    id: '9',
    name: 'Shonen Jump Community',
    description: 'Discuss Weekly Shonen Jump manga and anime adaptations',
    members: 356,
    category: 'Anime',
    timeSpent: 1820,
    trending: 8,
    messages: []
  },
  {
    id: '10',
    name: 'Slice of Life Enthusiasts',
    description: 'For fans of slice of life anime and manga',
    members: 142,
    category: 'Anime',
    timeSpent: 920,
    trending: 5,
    messages: []
  },
  {
    id: '11',
    name: 'Mecha & Sci-Fi Anime',
    description: 'Giant robots, space adventures, and futuristic anime',
    members: 187,
    category: 'Anime',
    timeSpent: 1050,
    trending: 6,
    messages: []
  },
  // Movie Groups
  {
    id: '12',
    name: 'Film Buffs',
    description: 'Discussions about cinema from all eras and genres',
    members: 378,
    category: 'Movies',
    timeSpent: 1680,
    trending: 8,
    messages: []
  },
  {
    id: '13',
    name: 'Horror Movie Night',
    description: 'Share your favorite scary movies and discuss the latest horror releases',
    members: 263,
    category: 'Movies',
    timeSpent: 1480,
    trending: 7,
    messages: []
  },
  {
    id: '14',
    name: 'MCU Fans Assemble',
    description: 'All things Marvel Cinematic Universe',
    members: 456,
    category: 'Movies',
    timeSpent: 2400,
    trending: 9,
    messages: []
  },
  {
    id: '15',
    name: 'Indie Film Appreciation',
    description: 'Discover and discuss independent and arthouse cinema',
    members: 124,
    category: 'Movies',
    timeSpent: 760,
    trending: 5,
    messages: []
  },
  {
    id: '16',
    name: 'Classic Hollywood',
    description: 'For fans of the golden age of Hollywood cinema',
    members: 167,
    category: 'Movies',
    timeSpent: 890,
    trending: 4,
    messages: []
  },
  // Pokemon Groups
  {
    id: '17',
    name: 'Pokémon Trainers',
    description: 'General Pokémon discussion for trainers of all ages',
    members: 512,
    category: 'Pokémon',
    timeSpent: 3100,
    trending: 10,
    messages: []
  },
  {
    id: '18',
    name: 'Competitive Pokémon',
    description: 'Strategy, team building, and competitive Pokémon battles',
    members: 284,
    category: 'Pokémon',
    timeSpent: 1950,
    trending: 8,
    messages: []
  },
  {
    id: '19',
    name: 'Pokémon GO Players',
    description: 'Tips, meetups, and discussions for Pokémon GO',
    members: 427,
    category: 'Pokémon',
    timeSpent: 2200,
    trending: 9,
    messages: []
  },
  {
    id: '20',
    name: 'Pokémon Card Collectors',
    description: 'Trading card game discussions and collection showcases',
    members: 219,
    category: 'Pokémon',
    timeSpent: 1350,
    trending: 7,
    messages: []
  },
  {
    id: '21',
    name: 'Shiny Hunters',
    description: 'Tips and celebrations for finding shiny Pokémon',
    members: 187,
    category: 'Pokémon',
    timeSpent: 1480,
    trending: 6,
    messages: []
  },
  // Naruto Groups
  {
    id: '22',
    name: 'Hidden Leaf Village',
    description: 'Main hub for all Naruto and Boruto fans',
    members: 389,
    category: 'Naruto',
    timeSpent: 2350,
    trending: 8,
    messages: []
  },
  {
    id: '23',
    name: 'Akatsuki Hideout',
    description: 'For fans of the infamous Naruto villains',
    members: 215,
    category: 'Naruto',
    timeSpent: 1580,
    trending: 7,
    messages: []
  },
  {
    id: '24',
    name: 'Naruto Theory Crafters',
    description: 'Deep dives into Naruto lore, theories, and analysis',
    members: 176,
    category: 'Naruto',
    timeSpent: 1250,
    trending: 6,
    messages: []
  },
  {
    id: '25',
    name: 'Shinobi Training',
    description: 'Discussions about Naruto-inspired workouts and martial arts',
    members: 143,
    category: 'Naruto',
    timeSpent: 820,
    trending: 5,
    messages: []
  },
  {
    id: '26',
    name: 'Naruto OST & Music',
    description: 'Appreciating the music and soundtracks from the series',
    members: 119,
    category: 'Naruto',
    timeSpent: 680,
    trending: 4,
    messages: []
  },
  // Music Groups
  {
    id: '27',
    name: 'Music Lounge',
    description: 'General music discussions across all genres',
    members: 487,
    category: 'Music',
    timeSpent: 2680,
    trending: 9,
    messages: []
  },
  {
    id: '28',
    name: 'Hip-Hop Heads',
    description: 'Everything related to hip-hop music and culture',
    members: 352,
    category: 'Music',
    timeSpent: 2150,
    trending: 8,
    messages: []
  },
  {
    id: '29',
    name: 'Rock & Metal',
    description: 'For fans of rock music from classic to modern',
    members: 318,
    category: 'Music',
    timeSpent: 1870,
    trending: 7,
    messages: []
  },
  {
    id: '30',
    name: 'Electronic Music Lab',
    description: 'EDM, house, techno and all electronic music genres',
    members: 284,
    category: 'Music',
    timeSpent: 1720,
    trending: 7,
    messages: []
  },
  {
    id: '31',
    name: 'Vinyl Collectors',
    description: 'For vinyl enthusiasts and record collectors',
    members: 165,
    category: 'Music',
    timeSpent: 980,
    trending: 5,
    messages: []
  },
  // Gaming Groups (Additional)
  {
    id: '32',
    name: 'PC Master Race',
    description: 'All things PC gaming - hardware, games, and more',
    members: 423,
    category: 'Gaming',
    timeSpent: 2750,
    trending: 9,
    messages: []
  },
  {
    id: '33',
    name: 'Nintendo Switch Players',
    description: 'Community for Nintendo Switch owners and fans',
    members: 368,
    category: 'Gaming',
    timeSpent: 2300,
    trending: 8,
    messages: []
  },
  {
    id: '34',
    name: 'PlayStation Nation',
    description: 'News and discussions for PlayStation gamers',
    members: 392,
    category: 'Gaming',
    timeSpent: 2480,
    trending: 8,
    messages: []
  },
  {
    id: '35',
    name: 'Xbox Community',
    description: 'For Xbox gamers and enthusiasts',
    members: 347,
    category: 'Gaming',
    timeSpent: 2180,
    trending: 7,
    messages: []
  },
  {
    id: '36',
    name: 'Retro Gaming',
    description: 'Celebrating classic games and vintage consoles',
    members: 215,
    category: 'Gaming',
    timeSpent: 1350,
    trending: 6,
    messages: []
  },
  // Specific Game Titles
  {
    id: '37',
    name: 'Minecraft Builders',
    description: 'Share your Minecraft creations and building tips',
    members: 476,
    category: 'Gaming',
    timeSpent: 2850,
    trending: 9,
    messages: []
  },
  {
    id: '38',
    name: 'Fortnite Squad',
    description: 'Find teammates and discuss Fortnite strategies',
    members: 432,
    category: 'Gaming',
    timeSpent: 2650,
    trending: 9,
    messages: []
  },
  {
    id: '39',
    name: 'League of Legends',
    description: 'Community for LoL players of all skill levels',
    members: 412,
    category: 'Gaming',
    timeSpent: 2580,
    trending: 8,
    messages: []
  },
  {
    id: '40',
    name: 'Genshin Impact',
    description: 'Tips, character builds, and events for Genshin Impact',
    members: 386,
    category: 'Gaming',
    timeSpent: 2350,
    trending: 8,
    messages: []
  },
  {
    id: '41',
    name: 'Among Us Crew',
    description: 'Find games and discuss Among Us strategies',
    members: 273,
    category: 'Gaming',
    timeSpent: 1680,
    trending: 7,
    messages: []
  },
  // TV Shows
  {
    id: '42',
    name: 'Streaming Shows',
    description: 'Discuss the latest series from Netflix, HBO, Disney+, and more',
    members: 356,
    category: 'TV Shows',
    timeSpent: 2150,
    trending: 8,
    messages: []
  },
  {
    id: '43',
    name: 'Game of Thrones',
    description: 'For fans of the books and HBO series',
    members: 294,
    category: 'TV Shows',
    timeSpent: 1820,
    trending: 6,
    messages: []
  },
  {
    id: '44',
    name: 'Breaking Bad Universe',
    description: 'Breaking Bad, Better Call Saul, and El Camino discussions',
    members: 276,
    category: 'TV Shows',
    timeSpent: 1680,
    trending: 7,
    messages: []
  },
  {
    id: '45',
    name: 'The Office Fanclub',
    description: 'That\'s what she said! For fans of The Office',
    members: 327,
    category: 'TV Shows',
    timeSpent: 1980,
    trending: 7,
    messages: []
  },
  {
    id: '46',
    name: 'Stranger Things',
    description: 'Theories, discussions, and news about Stranger Things',
    members: 319,
    category: 'TV Shows',
    timeSpent: 1920,
    trending: 8,
    messages: []
  },
  // Manga Groups
  {
    id: '47',
    name: 'Manga Readers',
    description: 'General discussions for manga enthusiasts',
    members: 298,
    category: 'Manga',
    timeSpent: 1850,
    trending: 7,
    messages: []
  },
  {
    id: '48',
    name: 'One Piece Crew',
    description: 'For fans following the journey to find the One Piece',
    members: 342,
    category: 'Manga',
    timeSpent: 2180,
    trending: 8,
    messages: []
  },
  {
    id: '49',
    name: 'Attack on Titan',
    description: 'Discussions about the manga and anime series',
    members: 324,
    category: 'Manga',
    timeSpent: 2050,
    trending: 8,
    messages: []
  },
  {
    id: '50',
    name: 'My Hero Academia',
    description: 'Plus Ultra! For fans of the popular superhero manga',
    members: 312,
    category: 'Manga',
    timeSpent: 1950,
    trending: 7,
    messages: []
  },
  {
    id: '51',
    name: 'Jujutsu Kaisen',
    description: 'For fans of Yuji Itadori and the world of Jujutsu sorcerers',
    members: 287,
    category: 'Manga',
    timeSpent: 1780,
    trending: 8,
    messages: []
  },
  // Sports
  {
    id: '52',
    name: 'Sports Center',
    description: 'Discussions about all kinds of sports and athletic events',
    members: 312,
    category: 'Sports',
    timeSpent: 1950,
    trending: 7,
    messages: []
  },
  {
    id: '53',
    name: 'Football (Soccer) Fans',
    description: 'The beautiful game - discuss matches, players, and clubs',
    members: 387,
    category: 'Sports',
    timeSpent: 2350,
    trending: 8,
    messages: []
  },
  {
    id: '54',
    name: 'NBA Discussion',
    description: 'Basketball talk - players, teams, and game analysis',
    members: 324,
    category: 'Sports',
    timeSpent: 1980,
    trending: 7,
    messages: []
  },
  {
    id: '55',
    name: 'NFL Huddle',
    description: 'American football discussions and fantasy league tips',
    members: 298,
    category: 'Sports',
    timeSpent: 1820,
    trending: 6,
    messages: []
  },
  {
    id: '56',
    name: 'Combat Sports',
    description: 'UFC, boxing, wrestling and all combat sports',
    members: 236,
    category: 'Sports',
    timeSpent: 1450,
    trending: 6,
    messages: []
  },
  // Food & Cooking
  {
    id: '57',
    name: 'Foodies United',
    description: 'For people who love food, cooking, and dining',
    members: 348,
    category: 'Food',
    timeSpent: 2050,
    trending: 8,
    messages: []
  },
  {
    id: '58',
    name: 'Home Chefs',
    description: 'Share recipes, cooking techniques, and food photos',
    members: 312,
    category: 'Food',
    timeSpent: 1880,
    trending: 7,
    messages: []
  },
  {
    id: '59',
    name: 'Baking Club',
    description: 'From bread to pastries - all things baking!',
    members: 276,
    category: 'Food',
    timeSpent: 1680,
    trending: 7,
    messages: []
  },
  {
    id: '60',
    name: 'Vegan & Vegetarian',
    description: 'Plant-based recipes and lifestyle discussions',
    members: 248,
    category: 'Food',
    timeSpent: 1520,
    trending: 6,
    messages: []
  },
  {
    id: '61',
    name: 'International Cuisine',
    description: 'Explore foods from around the world',
    members: 287,
    category: 'Food',
    timeSpent: 1750,
    trending: 7,
    messages: []
  },
  // Technology (Additional)
  {
    id: '62',
    name: 'Smartphone Talk',
    description: 'Discussions about mobile phones, apps, and accessories',
    members: 327,
    category: 'Technology',
    timeSpent: 1950,
    trending: 7,
    messages: []
  },
  {
    id: '63',
    name: 'Artificial Intelligence',
    description: 'Exploring AI, machine learning, and their applications',
    members: 286,
    category: 'Technology',
    timeSpent: 1780,
    trending: 8,
    messages: []
  },
  {
    id: '64',
    name: 'Crypto & Blockchain',
    description: 'Discussions about cryptocurrencies and blockchain technology',
    members: 312,
    category: 'Technology',
    timeSpent: 1880,
    trending: 7,
    messages: []
  },
  {
    id: '65',
    name: 'Programming Help',
    description: 'Get assistance with coding problems and programming languages',
    members: 354,
    category: 'Technology',
    timeSpent: 2150,
    trending: 8,
    messages: []
  },
  {
    id: '66',
    name: 'Tech Startups',
    description: 'For entrepreneurs and those interested in tech startups',
    members: 273,
    category: 'Technology',
    timeSpent: 1650,
    trending: 6,
    messages: []
  },
  // Art & Design (Additional)
  {
    id: '67',
    name: 'Digital Artists',
    description: 'For creators working with digital art tools and techniques',
    members: 287,
    category: 'Art & Design',
    timeSpent: 1780,
    trending: 7,
    messages: []
  },
  {
    id: '68',
    name: 'Photography Club',
    description: 'Share your photos and discuss photography techniques',
    members: 312,
    category: 'Art & Design',
    timeSpent: 1880,
    trending: 7,
    messages: []
  },
  {
    id: '69',
    name: 'Graphic Design',
    description: 'For professional and hobbyist graphic designers',
    members: 276,
    category: 'Art & Design',
    timeSpent: 1680,
    trending: 6,
    messages: []
  },
  {
    id: '70',
    name: 'Traditional Art',
    description: 'Drawing, painting, and other traditional media',
    members: 248,
    category: 'Art & Design',
    timeSpent: 1520,
    trending: 6,
    messages: []
  },
  {
    id: '71',
    name: 'Animation Station',
    description: 'For animation enthusiasts and creators',
    members: 263,
    category: 'Art & Design',
    timeSpent: 1620,
    trending: 7,
    messages: []
  },
  // Science
  {
    id: '72',
    name: 'Science Enthusiasts',
    description: 'General discussions about all fields of science',
    members: 287,
    category: 'Science',
    timeSpent: 1750,
    trending: 6,
    messages: []
  },
  {
    id: '73',
    name: 'Astronomy & Space',
    description: 'For stargazers and space exploration fans',
    members: 312,
    category: 'Science',
    timeSpent: 1880,
    trending: 7,
    messages: []
  },
  {
    id: '74',
    name: 'Physics Discussions',
    description: 'Explore the fundamental nature of the universe',
    members: 248,
    category: 'Science',
    timeSpent: 1550,
    trending: 6,
    messages: []
  },
  {
    id: '75',
    name: 'Biology & Nature',
    description: 'From microscopic cells to ecosystems',
    members: 276,
    category: 'Science',
    timeSpent: 1680,
    trending: 6,
    messages: []
  },
  {
    id: '76',
    name: 'Psychology Corner',
    description: 'Understanding the human mind and behavior',
    members: 294,
    category: 'Science',
    timeSpent: 1780,
    trending: 7,
    messages: []
  },
  // Pets & Animals
  {
    id: '77',
    name: 'Pet Parents',
    description: 'Share photos and stories about your furry friends',
    members: 368,
    category: 'Pets',
    timeSpent: 2250,
    trending: 8,
    messages: []
  },
  {
    id: '78',
    name: 'Dog Lovers',
    description: 'For all things canine - training tips, photos, and more',
    members: 342,
    category: 'Pets',
    timeSpent: 2080,
    trending: 8,
    messages: []
  },
  {
    id: '79',
    name: 'Cat Community',
    description: 'Celebrating our feline companions',
    members: 327,
    category: 'Pets',
    timeSpent: 1980,
    trending: 7,
    messages: []
  },
  {
    id: '80',
    name: 'Exotic Pets',
    description: 'For owners of reptiles, birds, and unusual pets',
    members: 215,
    category: 'Pets',
    timeSpent: 1320,
    trending: 5,
    messages: []
  },
  {
    id: '81',
    name: 'Wildlife Appreciation',
    description: 'Discussing and sharing photos of wild animals',
    members: 248,
    category: 'Pets',
    timeSpent: 1520,
    trending: 6,
    messages: []
  },
  // Fashion & Style
  {
    id: '82',
    name: 'Fashion Forward',
    description: 'Discussing the latest trends in clothing and style',
    members: 298,
    category: 'Fashion',
    timeSpent: 1850,
    trending: 7,
    messages: []
  },
  {
    id: '83',
    name: 'Streetwear Culture',
    description: 'For fans of street fashion and urban style',
    members: 276,
    category: 'Fashion',
    timeSpent: 1680,
    trending: 7,
    messages: []
  },
  {
    id: '84',
    name: 'Luxury & Designer',
    description: 'Discussions about high-end fashion and accessories',
    members: 248,
    category: 'Fashion',
    timeSpent: 1520,
    trending: 6,
    messages: []
  },
  {
    id: '85',
    name: 'Sustainable Fashion',
    description: 'Eco-friendly and ethical clothing discussions',
    members: 215,
    category: 'Fashion',
    timeSpent: 1350,
    trending: 6,
    messages: []
  },
  {
    id: '86',
    name: 'Makeup & Beauty',
    description: 'Beauty tips, product reviews, and makeup tutorials',
    members: 312,
    category: 'Fashion',
    timeSpent: 1880,
    trending: 7,
    messages: []
  },
  // Finance & Business
  {
    id: '87',
    name: 'Personal Finance',
    description: 'Budgeting, saving, and investment discussions',
    members: 327,
    category: 'Finance',
    timeSpent: 1950,
    trending: 7,
    messages: []
  },
  {
    id: '88',
    name: 'Stock Market',
    description: 'Trading strategies and stock market analysis',
    members: 298,
    category: 'Finance',
    timeSpent: 1850,
    trending: 6,
    messages: []
  },
  {
    id: '89',
    name: 'Entrepreneur Hub',
    description: 'For business owners and aspiring entrepreneurs',
    members: 312,
    category: 'Finance',
    timeSpent: 1880,
    trending: 7,
    messages: []
  },
  {
    id: '90',
    name: 'Real Estate Investors',
    description: 'Property investment strategies and market discussions',
    members: 263,
    category: 'Finance',
    timeSpent: 1620,
    trending: 6,
    messages: []
  },
  {
    id: '91',
    name: 'Career Development',
    description: 'Job hunting, career growth, and professional advice',
    members: 342,
    category: 'Finance',
    timeSpent: 2080,
    trending: 7,
    messages: []
  },
  // Health & Wellness (Additional)
  {
    id: '92',
    name: 'Mental Health Support',
    description: 'A safe space to discuss mental health and wellbeing',
    members: 312,
    category: 'Health & Fitness',
    timeSpent: 1880,
    trending: 8,
    messages: []
  },
  {
    id: '93',
    name: 'Yoga & Meditation',
    description: 'For practitioners of yoga and mindfulness',
    members: 287,
    category: 'Health & Fitness',
    timeSpent: 1750,
    trending: 7,
    messages: []
  },
  {
    id: '94',
    name: 'Nutrition & Diet',
    description: 'Healthy eating, meal prep, and dietary discussions',
    members: 298,
    category: 'Health & Fitness',
    timeSpent: 1820,
    trending: 7,
    messages: []
  },
  {
    id: '95',
    name: 'Weight Training',
    description: 'For weightlifters and strength training enthusiasts',
    members: 276,
    category: 'Health & Fitness',
    timeSpent: 1680,
    trending: 6,
    messages: []
  },
  {
    id: '96',
    name: 'Running Club',
    description: 'For runners of all levels - from beginners to marathoners',
    members: 263,
    category: 'Health & Fitness',
    timeSpent: 1580,
    trending: 6,
    messages: []
  },
  // Education & Learning
  {
    id: '97',
    name: 'Study Group',
    description: 'Academic support and study techniques',
    members: 327,
    category: 'Education',
    timeSpent: 1950,
    trending: 7,
    messages: []
  },
  {
    id: '98',
    name: 'Language Exchange',
    description: 'Practice and learn new languages with native speakers',
    members: 298,
    category: 'Education',
    timeSpent: 1850,
    trending: 7,
    messages: []
  },
  {
    id: '99',
    name: 'History Buffs',
    description: 'Discussions about historical events and figures',
    members: 276,
    category: 'Education',
    timeSpent: 1650,
    trending: 6,
    messages: []
  },
  {
    id: '100',
    name: 'Philosophy Club',
    description: 'Explore philosophical ideas and debates',
    members: 248,
    category: 'Education',
    timeSpent: 1520,
    trending: 5,
    messages: []
  },
  {
    id: '101',
    name: 'DIY & Crafts',
    description: 'Share your homemade projects and crafting tips',
    members: 287,
    category: 'Education',
    timeSpent: 1750,
    trending: 6,
    messages: []
  },
  // Miscellaneous
  {
    id: '102',
    name: 'Meme Corner',
    description: 'Share and discuss the latest internet memes',
    members: 387,
    category: 'Entertainment',
    timeSpent: 2350,
    trending: 9,
    messages: []
  },
  {
    id: '103',
    name: 'Dad Jokes',
    description: 'The punniest place on Nexus Vibe',
    members: 298,
    category: 'Entertainment',
    timeSpent: 1820,
    trending: 7,
    messages: []
  },
  {
    id: '104',
    name: 'Conspiracy Theories',
    description: 'Discuss unusual theories and mysterious phenomena',
    members: 263,
    category: 'Entertainment',
    timeSpent: 1650,
    trending: 6,
    messages: []
  },
  {
    id: '105',
    name: 'Paranormal Activity',
    description: 'Share ghost stories and paranormal experiences',
    members: 248,
    category: 'Entertainment',
    timeSpent: 1550,
    trending: 6,
    messages: []
  },
  {
    id: '106',
    name: 'Nexus Newbies',
    description: 'Welcome group for people new to Nexus Vibe',
    members: 186,
    category: 'Community',
    timeSpent: 1150,
    trending: 5,
    messages: []
  }
]; 