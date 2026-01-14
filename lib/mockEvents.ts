export interface CommunityEvent {
  id: string
  mode: 'community'
  title: string
  game: string
  type: string
  date: string
  time: string
  location: string
  prize: string
  participants: number
  maxParticipants: number
  status: string
  thumbnail: string
  featured?: boolean
  tags: string[]
}

export interface IndustryEvent {
  id: string
  mode: 'industry'
  title: string
  eventType: string
  date: string
  time: string
  location: string
  speakers: number
  topics: string[]
  ticketPrice: string
  participants: number
  maxParticipants: number
  status: string
  thumbnail: string
  featured?: boolean
  tags: string[]
  company?: string
}

export type Event = CommunityEvent | IndustryEvent

// B2C COMMUNITY EVENTS
export const communityEvents: CommunityEvent[] = [
  {
    id: 'c1',
    mode: 'community',
    title: 'Phoenix Story Championship 2025',
    game: 'Phoenix Story: Awakening',
    type: 'Tournament',
    date: '15/02/2025',
    time: '14:00 ICT',
    location: 'Online + Offline (TP.HCM)',
    prize: '500,000,000₫',
    participants: 2450,
    maxParticipants: 3000,
    status: 'Registration Open',
    thumbnail: 'from-purple-600 via-purple-500 to-pink-500',
    featured: true,
    tags: ['Championship', 'Big Prize', 'Offline'],
  },
  {
    id: 'c2',
    mode: 'community',
    title: 'Battle Royale Monthly Cup',
    game: 'Battle Royale Legends',
    type: 'Tournament',
    date: '08/02/2025',
    time: '19:00 ICT',
    location: 'Online',
    prize: '100,000,000₫',
    participants: 1890,
    maxParticipants: 2000,
    status: 'Registration Open',
    thumbnail: 'from-fuchsia-600 via-purple-600 to-blue-600',
    tags: ['Monthly', 'Online', 'Ranked'],
  },
  {
    id: 'c3',
    mode: 'community',
    title: 'Wetaps Community Meetup',
    game: 'All Games',
    type: 'Community Event',
    date: '01/02/2025',
    time: '15:00 ICT',
    location: 'Crescent Mall, TP.HCM',
    prize: 'Free merch & games',
    participants: 456,
    maxParticipants: 500,
    status: 'Limited slots',
    thumbnail: 'from-orange-600 via-red-500 to-pink-500',
    tags: ['Meetup', 'Offline', 'Free Entry'],
  },
  {
    id: 'c4',
    mode: 'community',
    title: 'Racing Thunder: Speed Challenge',
    game: 'Racing Thunder',
    type: 'Time Trial',
    date: '12/02/2025',
    time: '18:00 ICT',
    location: 'Online',
    prize: '50,000,000₫',
    participants: 890,
    maxParticipants: 1000,
    status: 'Registration Open',
    thumbnail: 'from-cyan-400 via-blue-500 to-purple-600',
    tags: ['Time Trial', 'Racing', 'Solo'],
  },
  {
    id: 'c5',
    mode: 'community',
    title: 'Valorant Vietnam Cup 2025',
    game: 'Valorant',
    type: 'Tournament',
    date: '22/02/2025',
    time: '10:00 ICT',
    location: 'Online',
    prize: '200,000,000₫',
    participants: 1567,
    maxParticipants: 2000,
    status: 'Registration Open',
    thumbnail: 'from-red-600 via-orange-600 to-yellow-500',
    tags: ['FPS', 'Team-based', 'Competitive'],
  },
]

// B2B INDUSTRY EVENTS
export const industryEvents: IndustryEvent[] = [
  {
    id: 'i1',
    mode: 'industry',
    title: 'Vietnam Game Dev Summit 2025',
    eventType: 'Conference',
    date: '20/03/2025',
    time: '09:00 - 17:00',
    location: 'Saigon Exhibition & Convention Center',
    speakers: 12,
    topics: ['AI in Gaming', 'Cloud Gaming', 'Monetization Strategies', 'Cross-platform Development'],
    ticketPrice: '2,500,000₫ - 5,000,000₫',
    participants: 450,
    maxParticipants: 500,
    status: 'Early Bird',
    thumbnail: 'from-blue-900 via-blue-700 to-cyan-600',
    featured: true,
    tags: ['Conference', 'Networking', 'Premium'],
    company: 'Vietnam Game Developers Association',
  },
  {
    id: 'i2',
    mode: 'industry',
    title: 'Indie Game Publisher Meetup',
    eventType: 'Networking',
    date: '05/02/2025',
    time: '18:00 - 21:00',
    location: 'WeWork Saigon',
    speakers: 5,
    topics: ['Publishing Deals', 'Marketing for Indies', 'Community Building'],
    ticketPrice: 'Free',
    participants: 78,
    maxParticipants: 100,
    status: 'Registration Open',
    thumbnail: 'from-amber-600 via-orange-600 to-red-600',
    tags: ['Indie', 'Publishers', 'Free'],
    company: '2Game Network',
  },
  {
    id: 'i3',
    mode: 'industry',
    title: 'Blockchain Gaming Workshop',
    eventType: 'Workshop',
    date: '15/02/2025',
    time: '13:00 - 16:00',
    location: 'Online',
    speakers: 3,
    topics: ['NFT Integration', 'Play-to-Earn Models', 'Web3 Gaming'],
    ticketPrice: '1,000,000₫',
    participants: 234,
    maxParticipants: 300,
    status: 'Registration Open',
    thumbnail: 'from-purple-800 via-violet-700 to-fuchsia-600',
    tags: ['Blockchain', 'Workshop', 'Online'],
    company: 'Blockchain Gaming Alliance',
  },
  {
    id: 'i4',
    mode: 'industry',
    title: 'Mobile Game Marketing Masterclass',
    eventType: 'Masterclass',
    date: '28/02/2025',
    time: '14:00 - 18:00',
    location: 'Hanoi Creative Hub',
    speakers: 8,
    topics: ['User Acquisition', 'ASO', 'Retention Strategies', 'Analytics'],
    ticketPrice: '3,000,000₫',
    participants: 145,
    maxParticipants: 200,
    status: 'Early Bird',
    thumbnail: 'from-teal-700 via-green-600 to-emerald-500',
    tags: ['Marketing', 'Mobile', 'Premium'],
    company: 'Mobile Gaming Institute',
  },
  {
    id: 'i5',
    mode: 'industry',
    title: 'Game Investment Forum 2025',
    eventType: 'Forum',
    date: '10/03/2025',
    time: '10:00 - 15:00',
    location: 'Bitexco Financial Tower, HCMC',
    speakers: 15,
    topics: ['Investment Trends', 'Valuation', 'M&A in Gaming', 'VC Insights'],
    ticketPrice: '10,000,000₫',
    participants: 89,
    maxParticipants: 150,
    status: 'Limited Access',
    thumbnail: 'from-slate-800 via-gray-700 to-zinc-600',
    tags: ['Investment', 'VC', 'Executive'],
    company: 'Vietnam Tech Investors',
  },
]

export function getEventsByMode(mode: 'community' | 'industry'): Event[] {
  return mode === 'community' ? communityEvents : industryEvents
}

export function getFeaturedEvent(mode: 'community' | 'industry'): Event | undefined {
  const events = getEventsByMode(mode)
  return events.find(e => e.featured)
}
