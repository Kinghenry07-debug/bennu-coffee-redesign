export type PageId = 'home' | 'menu' | 'story' | 'locations' | 'catering' | 'merch';

export type CoffeeCategory = 
  | 'all'
  | 'signature-mochas'
  | 'espresso'
  | 'cold-brew'
  | 'teas'
  | 'eats'
  | 'beans';

export interface MenuItem {
  id: string;
  name: string;
  literarySource?: string;
  category: CoffeeCategory;
  price: number;
  description: string;
  ingredients?: string[];
  tags: ('vegan' | 'gluten-free' | 'popular' | 'organic' | 'local' | 'iced' | 'signature')[];
  image: string;
  calories?: number;
  sweetness?: number; // 1-5 scale
  caffeineLevel?: 'Low' | 'Medium' | 'High' | 'Caffeine-Free';
}

export interface MilkOption {
  id: string;
  name: string;
  extraCharge: number;
}

export interface DrinkCustomization {
  milk: string;
  shots: number;
  sweetness: number; // 25, 50, 75, 100
  temperature: 'Hot' | 'Iced' | 'Blended';
  whippedCream: boolean;
  extraFlavor?: string;
  notes?: string;
}

export interface CartItem {
  cartItemId: string;
  item: MenuItem;
  quantity: number;
  customization?: DrinkCustomization;
  pickupLocationId: string;
}

export interface LocationInfo {
  id: string;
  name: string;
  neighborhood: string;
  address: string;
  cityStateZip: string;
  phone: string;
  hours: string;
  is24Hours: boolean;
  lat: number;
  lng: number;
  image: string;
  googleMapsUrl: string;
  amenities: string[];
  parkingInfo: string;
  currentBusyStatus: 'Quiet' | 'Moderate' | 'Bustling';
}

export interface CateringEstimate {
  guestCount: number;
  coffeeTravelersCount: number; // Each serves 10-12
  pastryTraysCount: number;
  coldBrewKegsCount: number;
  includeBaristaService: boolean;
  deliveryNeeded: boolean;
  eventDate: string;
  contactName: string;
  contactEmail: string;
  notes: string;
}

export interface ReviewItem {
  id: string;
  author: string;
  avatarInitials?: string;
  role?: string;
  rating: number;
  comment: string;
  date: string;
  location: string;
  tag: string;
  favoriteDrink?: string;
}

export interface LocalArtist {
  id: string;
  artistName: string;
  artworkTitle: string;
  medium: string;
  locationFeatured: string;
  imageUrl: string;
  bio: string;
  instagram: string;
}
