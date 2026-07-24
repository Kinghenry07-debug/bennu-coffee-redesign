import { LocationInfo } from '../types';

export const BENNU_LOCATIONS: LocationInfo[] = [
  {
    id: 'mlk',
    name: 'East Austin (MLK Flagship)',
    neighborhood: 'East Austin / MLK',
    address: '2001 E Martin Luther King Jr Blvd',
    cityStateZip: 'Austin, TX 78702',
    phone: '(512) 478-3700',
    hours: 'Open 24 Hours / 7 Days a Week',
    is24Hours: true,
    lat: 30.2796,
    lng: -97.7196,
    image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=800&q=80',
    googleMapsUrl: 'https://maps.google.com/?q=2001+E+Martin+Luther+King+Jr+Blvd+Austin+TX+78702',
    amenities: [
      '24/7 Access',
      'Ultra-Fast Fiber Wi-Fi',
      'Local Austin Art Gallery',
      'Shaded Outdoor Patio',
      'Power Outlets at Every Booth',
      'Tacodeli Daily Delivery',
      'Pet Friendly Patio'
    ],
    parkingInfo: 'Dedicated free parking lot in rear + easy MLK street parking.',
    currentBusyStatus: 'Bustling'
  },
  {
    id: 'highland',
    name: 'Highland (Jacob Fontaine)',
    neighborhood: 'Highland / ACC Campus',
    address: '1090 Jacob Fontaine Ln',
    cityStateZip: 'Austin, TX 78752',
    phone: '(512) 906-0010',
    hours: 'Daily 6:00 AM – 10:00 PM',
    is24Hours: false,
    lat: 30.3275,
    lng: -97.7122,
    image: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=800&q=80',
    googleMapsUrl: 'https://maps.google.com/?q=1090+Jacob+Fontaine+Ln+Austin+TX+78752',
    amenities: [
      'Spacious Modern Seating',
      'High-Speed Wi-Fi',
      'Cold Brew Nitro Taps',
      'Study Study Pods',
      'Easy ACC MetroRail Access',
      'Outdoor Courtyard'
    ],
    parkingInfo: 'Free parking garage validation for 2 hours + street parking.',
    currentBusyStatus: 'Moderate'
  },
  {
    id: 'congress',
    name: 'South Congress',
    neighborhood: 'SoCo / South Austin',
    address: '515 S Congress Ave',
    cityStateZip: 'Austin, TX 78704',
    phone: '(512) 448-3700',
    hours: 'Daily 7:00 AM – 9:00 PM',
    is24Hours: false,
    lat: 30.2588,
    lng: -97.7461,
    image: 'https://images.unsplash.com/photo-1442512595331-e89e73853f31?auto=format&fit=crop&w=800&q=80',
    googleMapsUrl: 'https://maps.google.com/?q=515+S+Congress+Ave+Austin+TX+78704',
    amenities: [
      'Heart of SoCo Vibe',
      'Walkable to Lady Bird Lake',
      'Nitro Espresso Bar',
      'Local Austin Bakery Spread',
      'Covered Porch Seating'
    ],
    parkingInfo: 'Dedicated customer spots behind shop + street parking.',
    currentBusyStatus: 'Moderate'
  }
];
