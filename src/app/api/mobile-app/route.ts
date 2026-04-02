import { NextRequest, NextResponse } from "next/server";

const MOBILE_APP_SECRET =
  process.env.MOBILE_APP_SECRET || "arunachal-mobile-2024-secret";

const APP_DATA = {
  version: "1.0.0",
  app: {
    name: "Arunachal Explore",
    tagline: "Land of the Rising Sun",
    bundleId: "com.arunachalexplore.app",
  },
  features: [
    {
      id: "maps",
      title: "Offline Maps",
      description:
        "Download district maps for offline use. Navigate without internet in remote areas.",
      icon: "map",
      offlineAvailable: true,
    },
    {
      id: "emergency",
      title: "Emergency Numbers",
      description:
        "Instant access to police, hospitals, and disaster management helplines.",
      icon: "phone-emergency",
      offlineAvailable: true,
    },
    {
      id: "permit",
      title: "ILP Permits",
      description:
        "Apply for Inner Line Permit online and store your digital permit for offline access.",
      icon: "file-text",
      offlineAvailable: true,
    },
    {
      id: "guides",
      title: "Travel Guides",
      description:
        "Download guides for each destination to read offline during your journey.",
      icon: "compass",
      offlineAvailable: true,
    },
    {
      id: "itinerary",
      title: "My Itinerary",
      description:
        "Build, save, and access your trip plan even when you are offline.",
      icon: "calendar",
      offlineAvailable: true,
    },
    {
      id: "sos",
      title: "SOS & Safety",
      description:
        "One-tap SOS sends your GPS location to emergency contacts and local authorities.",
      icon: "shield-alert",
      offlineAvailable: false,
    },
  ],
  emergency: {
    national: [
      { name: "Medical Emergency", number: "108", icon: "ambulance" },
      { name: "Police Emergency", number: "100", icon: "shield" },
      { name: "Fire Emergency", number: "101", icon: "flame" },
      { name: "Disaster Management", number: "1070", icon: "alert-triangle" },
      { name: "Child Helpline", number: "1098", icon: "heart" },
      { name: "Women Helpline", number: "1091", icon: "shield-check" },
      { name: "Tourist Helpline", number: "1800-11-1363", icon: "info" },
    ],
    districts: [
      {
        district: "Tawang",
        hospital: { name: "Tawang District Hospital", phone: "03794-222239" },
        police: { name: "Tawang Police Station", phone: "03794-222236" },
      },
      {
        district: "Itanagar",
        hospital: { name: "TRIHMS Itanagar", phone: "0360-2350331" },
        police: { name: "Itanagar Police Station", phone: "0360-2212351" },
      },
      {
        district: "Ziro",
        hospital: { name: "District Hospital Ziro", phone: "03788-224440" },
        police: { name: "Ziro Police Station", phone: "03788-224422" },
      },
      {
        district: "Pasighat",
        hospital: { name: "Civil Hospital Pasighat", phone: "0368-2222411" },
        police: { name: "Pasighat Police Station", phone: "0368-2222234" },
      },
      {
        district: "Bomdila",
        hospital: { name: "District Hospital Bomdila", phone: "03782-222244" },
        police: { name: "Bomdila Police Station", phone: "03782-222322" },
      },
    ],
  },
  destinations: [
    {
      id: "tawang",
      name: "Tawang",
      tagline: "The Roof of Arunachal",
      lat: 27.5861,
      lng: 91.8594,
      altitude: "3048m",
      bestSeason: "Mar–Oct",
      highlights: ["Tawang Monastery", "Sela Pass", "Madhuri Lake"],
      offlinePackageSizeMb: 45,
    },
    {
      id: "ziro",
      name: "Ziro Valley",
      tagline: "UNESCO World Heritage Site Nominee",
      lat: 27.5436,
      lng: 93.8292,
      altitude: "1524m",
      bestSeason: "Mar–Nov",
      highlights: ["Ziro Music Festival", "Apatani Villages", "Talley Valley"],
      offlinePackageSizeMb: 38,
    },
    {
      id: "namdapha",
      name: "Namdapha",
      tagline: "India's Biodiversity Hotspot",
      lat: 27.4833,
      lng: 96.3833,
      altitude: "200m–4571m",
      bestSeason: "Oct–Apr",
      highlights: ["Tiger Reserve", "Snow Leopard", "Hoolock Gibbon"],
      offlinePackageSizeMb: 52,
    },
    {
      id: "mechuka",
      name: "Mechuka",
      tagline: "Land of the Hidden Treasures",
      lat: 28.6072,
      lng: 94.1453,
      altitude: "1800m",
      bestSeason: "Oct–Apr",
      highlights: ["Mechuka Valley", "Sam Chubling Monastery", "Yargyap Chu"],
      offlinePackageSizeMb: 31,
    },
  ],
  mapConfig: {
    defaultCenter: { lat: 28.218, lng: 94.7278 },
    defaultZoom: 7,
    tileProvider: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    offlineRegions: [
      { id: "west", name: "West Arunachal (Tawang, Bomdila)", sizeMb: 120 },
      {
        id: "central",
        name: "Central (Itanagar, Ziro, Along)",
        sizeMb: 95,
      },
      { id: "east", name: "East (Pasighat, Namdapha)", sizeMb: 110 },
    ],
  },
  offlineContent: {
    totalDownloadableMb: 325,
    categories: [
      {
        id: "maps",
        label: "District Maps",
        items: 25,
        sizeMb: 150,
      },
      {
        id: "guides",
        label: "Travel Guides",
        items: 40,
        sizeMb: 85,
      },
      {
        id: "emergency",
        label: "Emergency Data",
        items: 1,
        sizeMb: 2,
      },
      {
        id: "permits",
        label: "Permit Templates",
        items: 3,
        sizeMb: 5,
      },
    ],
  },
};

export async function GET(request: NextRequest) {
  const authHeader = request.headers.get("authorization");
  const token = authHeader?.startsWith("Bearer ")
    ? authHeader.slice(7)
    : null;

  if (!token || token !== MOBILE_APP_SECRET) {
    return NextResponse.json(
      { error: "Unauthorized. Provide a valid Bearer token." },
      {
        status: 401,
        headers: { "WWW-Authenticate": 'Bearer realm="Arunachal Mobile App"' },
      }
    );
  }

  return NextResponse.json(APP_DATA, {
    status: 200,
    headers: {
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
      "X-App-Version": APP_DATA.version,
    },
  });
}
