export type Vehicle = {
  id: number
  name: string
  type: string
  category: string
  capacity: string
  fuel: string
  price: number
  priceUnit: string
  image: string
  images: string[]
  description: string
  longDescription: string
  features: string[]
  specs: { label: string; value: string }[]
  includes: string[]
  route: string
}

export const vehiclesData: Vehicle[] = [
  {
    id: 1,
    name: "Toyota Fortuner (4x4)",
    type: "Car",
    category: "SUV",
    capacity: "6–7 Persons",
    fuel: "Diesel",
    price: 6500,
    priceUnit: "/day",
    image: "https://picsum.photos/seed/transport-suv/1200/800",
    images: [
      "https://picsum.photos/seed/transport-suv/1200/800",
      "https://picsum.photos/seed/transport-suv2/1200/800",
      "https://picsum.photos/seed/transport-suv3/1200/800",
    ],
    description: "The most trusted 4x4 SUV for Himalayan mountain roads.",
    longDescription:
      "The Toyota Fortuner is the undisputed king of Arunachal Pradesh's high-altitude mountain roads. With its legendary 4x4 drivetrain, independent suspension, and powerful diesel engine, it conquers river crossings, steep switchbacks, and unpaved forest tracks with confidence. Our fully maintained fleet comes with experienced local drivers who know every pass and shortcut.",
    features: ["A/C", "Off-road 4x4", "Driver included", "First-aid kit", "GPS + offline maps", "Tow gear"],
    specs: [
      { label: "Engine", value: "2.8L Diesel Turbo" },
      { label: "Transmission", value: "6-speed Automatic" },
      { label: "Drive", value: "4WD with diff-lock" },
      { label: "Ground Clearance", value: "225 mm" },
      { label: "Fuel Tank", value: "80 L" },
    ],
    includes: [
      "Experienced local driver",
      "Comprehensive insurance",
      "Pre-loaded offline GPS maps",
      "Emergency tool kit & spare tyre",
    ],
    route: "All districts including Tawang, Ziro, Namdapha",
  },
  {
    id: 2,
    name: "Royal Enfield Himalayan",
    type: "Bike",
    category: "Adventure Motorcycle",
    capacity: "1–2 Persons",
    fuel: "Petrol",
    price: 2200,
    priceUnit: "/day",
    image: "https://picsum.photos/seed/transport-bike/1200/800",
    images: [
      "https://picsum.photos/seed/transport-bike/1200/800",
      "https://picsum.photos/seed/transport-bike2/1200/800",
      "https://picsum.photos/seed/transport-bike3/1200/800",
    ],
    description: "Built for mountain exploration — the original adventure tourer.",
    longDescription:
      "The Royal Enfield Himalayan is purpose-engineered for adventure touring in the Himalayas. Its 411cc engine delivers smooth low-end torque for mountain gradients, while its long-travel suspension absorbs the roughest tracks. Our bikes come pre-fitted with side panniers, a tank bag, and a pillion-optimised seat for comfortable two-up riding. Ideal for solo rides from Tawang to Se La Pass.",
    features: ["Helmet included", "Side panniers", "GPS mount", "Tyre repair kit", "Windscreen", "Rally-spec handguards"],
    specs: [
      { label: "Engine", value: "411cc Single" },
      { label: "Transmission", value: "5-speed Manual" },
      { label: "Suspension", value: "Long-travel forks" },
      { label: "Seat Height", value: "800 mm" },
      { label: "Tank Capacity", value: "15 L" },
    ],
    includes: [
      "Full-face helmets (rider + pillion)",
      "Side panniers (40L total)",
      "Third-party insurance",
      "24/7 breakdown support",
    ],
    route: "Tawang, Se La Pass, Bomdila, Mechuka",
  },
  {
    id: 3,
    name: "Mahindra Bolero",
    type: "Car",
    category: "MUV",
    capacity: "7–9 Persons",
    fuel: "Diesel",
    price: 4200,
    priceUnit: "/day",
    image: "https://picsum.photos/seed/v3/1200/800",
    images: [
      "https://picsum.photos/seed/v3/1200/800",
      "https://picsum.photos/seed/v3b/1200/800",
      "https://picsum.photos/seed/v3c/1200/800",
    ],
    description: "The workhorse of Northeast India — rugged, reliable, and spacious.",
    longDescription:
      "The Mahindra Bolero has earned a legendary reputation across Northeast India for its sheer reliability. Whether negotiating the landslide-prone NH-13 to Tawang or threading through the dense jungles of Namdapha, this workhorse never lets you down. With seating for up to 9 passengers, it's the most cost-effective choice for group travel. Our experienced local drivers ensure safe and timely journeys.",
    features: ["Rugged 4WD", "Local driver", "Cargo roof rack", "Extra-wide seating", "Diesel economy", "Rear cabin"],
    specs: [
      { label: "Engine", value: "1.5L mHawk Diesel" },
      { label: "Transmission", value: "5-speed Manual" },
      { label: "Drive", value: "2WD / 4WD" },
      { label: "Seating", value: "9 persons max" },
      { label: "Fuel Tank", value: "60 L" },
    ],
    includes: [
      "Local driver with mountain experience",
      "Basic insurance coverage",
      "Offline GPS",
      "Drinking water supply",
    ],
    route: "All districts; budget group option",
  },
  {
    id: 4,
    name: "Royal Enfield Classic 350",
    type: "Bike",
    category: "Cruiser Motorcycle",
    capacity: "1–2 Persons",
    fuel: "Petrol",
    price: 1800,
    priceUnit: "/day",
    image: "https://picsum.photos/seed/v4/1200/800",
    images: [
      "https://picsum.photos/seed/v4/1200/800",
      "https://picsum.photos/seed/v4b/1200/800",
      "https://picsum.photos/seed/v4c/1200/800",
    ],
    description: "Timeless vintage cruiser — perfect for scenic valley rides.",
    longDescription:
      "The Royal Enfield Classic 350 is an icon of Indian motorcycling. Its thumping 349cc engine, classic silhouette, and butter-smooth ride make it the perfect companion for scenic valley roads and monastery routes. Ideal for riders who prefer a relaxed, upright riding position over an aggressive adventure stance. Our touring kit includes saddlebags, phone mount, and crash guards.",
    features: ["Vintage styling", "Crash guards", "Saddlebags", "Phone mount", "Stable chassis", "Smooth tarmac handling"],
    specs: [
      { label: "Engine", value: "349cc Twin Spark" },
      { label: "Transmission", value: "5-speed Manual" },
      { label: "Suspension", value: "Dual rear shocks" },
      { label: "Seat Height", value: "805 mm" },
      { label: "Tank Capacity", value: "13 L" },
    ],
    includes: [
      "Open-face helmet",
      "Saddlebags (20L)",
      "Third-party insurance",
      "Roadside assistance",
    ],
    route: "Itanagar, Pasighat, Ziro, Namdapha",
  },
]
