export type HotelAmenity = { icon: string; label: string }

export type Hotel = {
  id: number
  name: string
  location: string
  district: string
  price: number
  rating: number
  reviews: number
  tags: string[]
  image: string
  images: string[]
  description: string
  longDescription: string
  amenities: { icon: string; label: string }[]
  highlights: string[]
  checkIn: string
  checkOut: string
  cancellation: string
  rooms: { type: string; capacity: string; price: number; image: string }[]
}

export const hotelsData: Hotel[] = [
  {
    id: 1,
    name: "Tawang Mountain Resort",
    location: "Tawang, Arunachal Pradesh",
    district: "Tawang District",
    price: 4500,
    rating: 4.8,
    reviews: 124,
    tags: ["Resort", "Mountain View"],
    image: "https://picsum.photos/seed/mountain-resort-interior/1200/800",
    images: [
      "https://picsum.photos/seed/mountain-resort-interior/1200/800",
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=800&fit=crop&auto=format&q=80",
      "https://picsum.photos/seed/arunachal-festival-culture/1200/800",
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1200&h=800&fit=crop&auto=format&q=80",
    ],
    description: "Nestled at 10,000 ft with panoramic Himalayan views.",
    longDescription:
      "Perched at an elevation of 10,000 feet, Tawang Mountain Resort offers an unrivalled retreat amidst the clouds. Each suite is designed to frame breathtaking views of snow-capped peaks and the legendary Tawang Monastery. Wake up to crisp mountain air, savour locally sourced Tibetan-inspired cuisine, and let the silence of the Himalayas restore your senses.",
    amenities: [
      { icon: "wifi", label: "Free WiFi" },
      { icon: "coffee", label: "Breakfast Included" },
      { icon: "car", label: "Free Parking" },
      { icon: "thermometer", label: "Heating" },
      { icon: "utensils", label: "Restaurant" },
      { icon: "concierge-bell", label: "24/7 Concierge" },
    ],
    highlights: [
      "Panoramic Himalayan views from every room",
      "Complimentary monastery-guided tour",
      "Traditional Monpa cultural evenings",
      "In-house mountain trekking service",
    ],
    checkIn: "2:00 PM",
    checkOut: "11:00 AM",
    cancellation: "Free cancellation up to 48 hours before check-in",
    rooms: [
      { type: "Deluxe Mountain Suite", capacity: "2 Adults", price: 4500, image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop&auto=format&q=80" },
      { type: "Premium Valley Suite", capacity: "2 Adults + 1 Child", price: 6200, image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&h=600&fit=crop&auto=format&q=80" },
      { type: "Monastery View Room", capacity: "2 Adults", price: 3800, image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop&auto=format&q=80" },
    ],
  },
  {
    id: 2,
    name: "Ziro Valley Eco-Stay",
    location: "Ziro, Arunachal Pradesh",
    district: "Lower Subansiri District",
    price: 2800,
    rating: 4.6,
    reviews: 89,
    tags: ["Eco-friendly", "Valley View"],
    image: "https://picsum.photos/seed/valley-eco-lodge-stay/1200/800",
    images: [
      "https://picsum.photos/seed/valley-eco-lodge-stay/1200/800",
      "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=1200&h=800&fit=crop&auto=format&q=80",
      "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=1200&h=800&fit=crop&auto=format&q=80",
      "https://images.unsplash.com/photo-1448375240586-882707db888b?w=1200&h=800&fit=crop&auto=format&q=80",
    ],
    description: "Sustainable bamboo cottages within the UNESCO heritage landscape.",
    longDescription:
      "Ziro Valley Eco-Stay is a celebration of sustainable travel. Set amidst UNESCO-nominated rice fields and pine forests, our bamboo cottages are built with zero-carbon principles using local materials. Immerse yourself in the living culture of the Apatani tribe, attend the world-famous Ziro Music Festival, and reconnect with nature without leaving a footprint.",
    amenities: [
      { icon: "wifi", label: "Solar-Powered WiFi" },
      { icon: "coffee", label: "Organic Breakfast" },
      { icon: "car", label: "Bicycle Rental" },
      { icon: "leaf", label: "Eco-Certified" },
      { icon: "utensils", label: "Farm-to-Table Dining" },
      { icon: "map", label: "Village Tours" },
    ],
    highlights: [
      "UNESCO heritage landscape surroundings",
      "Apatani tribal culture experiences",
      "Zero-waste bamboo architecture",
      "Birdwatching and nature trails",
    ],
    checkIn: "1:00 PM",
    checkOut: "11:00 AM",
    cancellation: "Free cancellation up to 72 hours before check-in",
    rooms: [
      { type: "Bamboo Cottage", capacity: "2 Adults", price: 2800, image: "https://picsum.photos/seed/valley-eco-lodge-stay/800/600" },
      { type: "Family Forest Cottage", capacity: "2 Adults + 2 Children", price: 4200, image: "https://picsum.photos/seed/valley-eco-lodge-stay/800/600" },
    ],
  },
  {
    id: 3,
    name: "Namdapha River Lodge",
    location: "Miao, Changlang District",
    district: "Changlang District",
    price: 3500,
    rating: 4.5,
    reviews: 56,
    tags: ["Lodge", "Riverside"],
    image: "https://images.unsplash.com/photo-1448375240586-882707db888b?w=1200&h=800&fit=crop&auto=format&q=80",
    images: [
      "https://images.unsplash.com/photo-1448375240586-882707db888b?w=1200&h=800&fit=crop&auto=format&q=80",
      "https://picsum.photos/seed/arunachal-mountain-river/1200/800",
      "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=1200&h=800&fit=crop&auto=format&q=80",
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1200&h=800&fit=crop&auto=format&q=80",
    ],
    description: "A riverside sanctuary at the edge of India's richest national park.",
    longDescription:
      "Namdapha River Lodge sits on the banks of the Noa-Dihing River, serving as the perfect base camp for exploring the legendary Namdapha National Park — one of the most biodiverse ecosystems in all of Asia. Listen to the calls of hornbills from your verandah, spot rare clouded leopards on guided jungle walks, and fall asleep to the sound of the river.",
    amenities: [
      { icon: "wifi", label: "WiFi (lobby)" },
      { icon: "coffee", label: "Breakfast Included" },
      { icon: "car", label: "Jeep Safaris" },
      { icon: "binoculars", label: "Wildlife Guides" },
      { icon: "utensils", label: "Riverside Dining" },
      { icon: "campfire", label: "Campfire Evenings" },
    ],
    highlights: [
      "Gateway to Namdapha National Park",
      "Expert wildlife naturalist guides",
      "Noa-Dihing riverside location",
      "Birdwatching — 400+ species recorded",
    ],
    checkIn: "2:00 PM",
    checkOut: "10:00 AM",
    cancellation: "Free cancellation up to 5 days before check-in",
    rooms: [
      { type: "River View Cottage", capacity: "2 Adults", price: 3500, image: "https://picsum.photos/seed/arunachal-mountain-river/800/600" },
      { type: "Jungle View Suite", capacity: "2 Adults + 1 Child", price: 4800, image: "https://picsum.photos/seed/valley-eco-lodge-stay/800/600" },
    ],
  },
  {
    id: 4,
    name: "Itanagar Heritage Hotel",
    location: "Itanagar, Arunachal Pradesh",
    district: "Papum Pare District",
    price: 5200,
    rating: 4.7,
    reviews: 210,
    tags: ["Luxury", "Heritage"],
    image: "https://picsum.photos/seed/mountain-resort-interior/1200/800",
    images: [
      "https://picsum.photos/seed/mountain-resort-interior/1200/800",
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=800&fit=crop&auto=format&q=80",
      "https://picsum.photos/seed/arunachal-festival-culture/1200/800",
      "https://picsum.photos/seed/valley-eco-lodge-stay/1200/800",
    ],
    description: "The capital's premier heritage hotel blending royal luxury with indigenous art.",
    longDescription:
      "Itanagar Heritage Hotel is the crown jewel of Arunachal Pradesh's capital. Every corner of this grand property pays homage to the state's 26 diverse tribes — from the handwoven textiles adorning the walls to the tribal motifs etched into the stonework. The hotel combines five-star luxury with authentic cultural immersion, offering curated museum tours, tribal craft workshops, and a rooftop restaurant with panoramic views of the Himalayan foothills.",
    amenities: [
      { icon: "wifi", label: "High-Speed WiFi" },
      { icon: "coffee", label: "Breakfast & Dinner" },
      { icon: "car", label: "Airport Transfers" },
      { icon: "dumbbell", label: "Fitness Centre" },
      { icon: "swimming-pool", label: "Swimming Pool" },
      { icon: "spa", label: "Heritage Spa" },
    ],
    highlights: [
      "Curated tribal art and culture museum",
      "Rooftop restaurant with panoramic views",
      "Personalised sightseeing concierge",
      "Heritage spa with traditional treatments",
    ],
    checkIn: "3:00 PM",
    checkOut: "12:00 PM",
    cancellation: "Free cancellation up to 24 hours before check-in",
    rooms: [
      { type: "Heritage Deluxe Room", capacity: "2 Adults", price: 5200, image: "https://picsum.photos/seed/mountain-resort-interior/800/600" },
      { type: "Tribal Art Suite", capacity: "2 Adults + 1 Child", price: 7500, image: "https://picsum.photos/seed/valley-eco-lodge-stay/800/600" },
      { type: "Presidential Suite", capacity: "4 Adults", price: 12000, image: "https://picsum.photos/seed/mountain-resort-interior/800/600" },
    ],
  },
]
