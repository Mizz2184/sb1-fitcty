import { Barber } from '../types';

export const barbers: Barber[] = [
  {
    id: '1',
    name: 'James Wilson',
    image: 'https://images.unsplash.com/photo-1618077360395-f3068be8e001?w=400&h=400&fit=crop',
    specialties: ['Classic Cuts', 'Fades', 'Beard Styling'],
    rating: 4.9,
    availability: [
      {
        day: 1,
        startTime: '09:00',
        endTime: '17:00',
        breaks: [{ start: '12:00', end: '13:00' }]
      },
      // ... more days
    ]
  },
  {
    id: '2',
    name: 'Michael Rodriguez',
    image: 'https://images.unsplash.com/photo-1615497001839-b0a0eac3274c?w=400&h=400&fit=crop',
    specialties: ['Modern Styles', 'Hair Color', 'Scissor Work'],
    rating: 4.8,
    availability: [
      {
        day: 1,
        startTime: '10:00',
        endTime: '18:00',
        breaks: [{ start: '13:00', end: '14:00' }]
      },
      // ... more days
    ]
  },
  {
    id: '3',
    name: 'David Chen',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
    specialties: ['Asian Hair', 'Hot Towel Shaves', 'Precision Cuts'],
    rating: 4.9,
    availability: [
      {
        day: 1,
        startTime: '11:00',
        endTime: '19:00',
        breaks: [{ start: '14:00', end: '15:00' }]
      },
      // ... more days
    ]
  }
];