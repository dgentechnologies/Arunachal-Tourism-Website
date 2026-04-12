"use client"

import { createContext, useContext, useState, useEffect } from "react"
import type { ReactNode } from "react"

const STORAGE_KEY = "arunachal-language"

export type Language = "en" | "hi" | "bn" | "as"

export interface Translations {
  // NAV
  guides: string
  hotels: string
  transport: string
  permit: string
  itinerary: string
  safety: string
  tribes: string
  entrepreneurs: string
  signIn: string
  signUp: string
  signOut: string
  myAccount: string
  languageLabel: string
  navExplore: string
  navPlan: string
  navEssentials: string
  navGuidesDesc: string
  navTribesDesc: string
  navEntrepreneursDesc: string
  navItineraryDesc: string
  navHotelsDesc: string
  navTransportDesc: string
  navPermitIndianLabel: string
  navPermitIndianDesc: string
  navPermitForeignLabel: string
  navPermitForeignDesc: string
  navSafetyDesc: string
  navAdventures: string
  navResources: string
  navAccount: string
  navWildlifeLabel: string
  navWildlifeDesc: string
  navEventsLabel: string
  navEventsDesc: string
  navHeritageLabel: string
  navHeritageDesc: string
  navTrekkingLabel: string
  navTrekkingDesc: string
  navRaftingLabel: string
  navRaftingDesc: string
  navAnglingLabel: string
  navAnglingDesc: string
  navParaglidingLabel: string
  navParaglidingDesc: string
  navAllActivitiesLabel: string
  navAllActivitiesDesc: string
  navAiTripBuilderLabel: string
  navAiTripBuilderDesc: string
  navDistrictMapLabel: string
  navDistrictMapDesc: string
  navArrivalFormalitiesLabel: string
  navArrivalFormalitiesDesc: string
  navSmartIlpCheckLabel: string
  navSmartIlpCheckDesc: string
  navEguidesLabel: string
  navEguidesDesc: string
  navFactsLabel: string
  navFactsDesc: string
  navVideoGalleryLabel: string
  navVideoGalleryDesc: string
  navNewsletterLabel: string
  navNewsletterDesc: string
  navSavedTripsLabel: string
  navSavedTripsDesc: string
  navPermitTrackerLabel: string
  navPermitTrackerDesc: string
  navProfilePrefsLabel: string
  navProfilePrefsDesc: string

  // FOOTER
  footerTagline: string
  footerQuickLinks: string
  footerTravelGuides: string
  footerHotelBooking: string
  footerTransportServices: string
  footerApplyPermit: string
  footerSupport: string
  footerSafety: string
  footerFaqs: string
  footerContactUs: string
  footerPrivacyPolicy: string
  footerConnect: string
  footerCopyright: string

  // HERO CAROUSEL
  heroSlide1Headline: string
  heroSlide1Subline: string
  heroSlide1Tagline: string
  heroSlide2Headline: string
  heroSlide2Subline: string
  heroSlide2Tagline: string
  heroSlide3Headline: string
  heroSlide3Subline: string
  heroSlide3Tagline: string
  heroSlide4Headline: string
  heroSlide4Subline: string
  heroSlide4Tagline: string
  getYourPermit: string
  planMyTrip: string

  // HOME PAGE
  homeExploreTitle: string
  homeExploreSubtitle: string
  learnMore: string
  featGuidesTitle: string
  featGuidesDesc: string
  featHotelsTitle: string
  featHotelsDesc: string
  featTransportTitle: string
  featTransportDesc: string
  featPermitTitle: string
  featPermitDesc: string
  featSafetyTitle: string
  featSafetyDesc: string
  featItineraryTitle: string
  featItineraryDesc: string
  cultureTitle: string
  cultureDesc: string
  majorTribes: string
  rareSpecies: string
  viewTravelGuides: string

  // SCROLLYTELLING SECTION
  stChapter1Badge: string
  stChapter1Title: string
  stChapter1Subtitle: string
  stChapter1Body: string
  stChapter2Badge: string
  stChapter2Title: string
  stChapter2Subtitle: string
  stChapter2Body: string
  stChapter3Badge: string
  stChapter3Title: string
  stChapter3Subtitle: string
  stChapter3Body: string
  stChapter4Badge: string
  stChapter4Title: string
  stChapter4Subtitle: string
  stChapter4Body: string
  stStat1Label: string
  stStat2Label: string
  stStat3Label: string
  stStat4Label: string
  stStat5Label: string
  stStat6Label: string
  stStat7Label: string
  stStat8Label: string
  stCTAButton: string
  stScrollHint: string

  // DESTINATIONS CAROUSEL
  popularDestinations: string
  popularDestinationsSubtitle: string
  exploreText: string
  destTawangTagline: string
  destZiroTagline: string
  destNamdaphaTagline: string
  destMechukaTagline: string
  destSangtiTagline: string

  // GUIDES PAGE
  guidesPageTitle: string
  guidesPageSubtitle: string
  readFullGuide: string
  bestTimeLabel: string
  guideCTATitle: string
  guideCTADesc: string
  applyForPermit: string
  planItinerary: string
  guide1Title: string
  guide1Category: string
  guide1Desc: string
  guide2Title: string
  guide2Category: string
  guide2Desc: string
  guide3Title: string
  guide3Category: string
  guide3Desc: string
  guide4Title: string
  guide4Category: string
  guide4Desc: string

  // HOTELS PAGE
  hotelsPageTitle: string
  hotelsPageSubtitle: string
  bookNow: string
  perNight: string

  // TRANSPORT PAGE
  transportPageTitle: string
  transportPageSubtitle: string
  reserveNow: string
  gpsEnabled: string
  gpsDesc: string
  fullyInsured: string
  fullyInsuredDesc: string
  verifiedDrivers: string
  verifiedDriversDesc: string

  // SAFETY PAGE
  safetyPageTitle: string
  safetyPageSubtitle: string
  searchPlaceholder: string
  hospitalsTab: string
  policeTab: string
  emergencyHotline: string
  emergencySubtitle: string
  safeTravelTips: string
  safeTip1: string
  safeTip2: string
  safeTip3: string
  active24x7: string

  // ITINERARY PAGE
  itineraryPageTitle: string
  itineraryPageSubtitle: string
  yourPreferences: string
  interestsLabel: string
  durationLabel: string
  activitiesLabel: string
  generateItinerary: string
  readyToPlan: string
  readyToPlanDesc: string
  mappingAdventure: string
  takesMinute: string

  // PERMIT PAGE
  permitPageTitle: string
  permitPageSubtitle: string
  applicationForm: string
  allFieldsMandatory: string
  fullNameLabel: string
  emailLabel: string
  travelStartLabel: string
  travelEndLabel: string
  destinationsLabel: string
  destinationsHint: string
  idTypeLabel: string
  idNumberLabel: string
  acknowledgeLabel: string
  aiPreCheck: string
  submitApplication: string
  aiReviewTool: string
  aiReviewFill: string
  reviewingPlan: string
  analyzingAI: string
  planComplete: string
  actionRequired: string
  missingInfo: string
  issuesFound: string
  suggestions: string

  // TRIBES PAGE
  tribesPageTitle: string
  tribesPageSubtitle: string
  tribesRegionLabel: string
  tribesCultureLabel: string
  tribe1Name: string
  tribe1Region: string
  tribe1Desc: string
  tribe2Name: string
  tribe2Region: string
  tribe2Desc: string
  tribe3Name: string
  tribe3Region: string
  tribe3Desc: string
  tribe4Name: string
  tribe4Region: string
  tribe4Desc: string
  tribe5Name: string
  tribe5Region: string
  tribe5Desc: string
  tribe6Name: string
  tribe6Region: string
  tribe6Desc: string
  discoverTribes: string

  // ENTREPRENEURS PAGE
  entrepreneursPageTitle: string
  entrepreneursPageSubtitle: string
  entrepreneurSectorLabel: string
  entrepreneur1Name: string
  entrepreneur1Venture: string
  entrepreneur1Sector: string
  entrepreneur1Desc: string
  entrepreneur2Name: string
  entrepreneur2Venture: string
  entrepreneur2Sector: string
  entrepreneur2Desc: string
  entrepreneur3Name: string
  entrepreneur3Venture: string
  entrepreneur3Sector: string
  entrepreneur3Desc: string
  entrepreneur4Name: string
  entrepreneur4Venture: string
  entrepreneur4Sector: string
  entrepreneur4Desc: string
  meetEntrepreneurs: string

  // HOME – TRIBES & ENTREPRENEURS SECTION
  homeCultureSectionTitle: string
  homeCultureSectionSubtitle: string
  featTribesTitle: string
  featTribesDesc: string
  featEntrepreneursTitle: string
  featEntrepreneursDesc: string
  exploreTribes: string
  exploreEntrepreneurs: string
}

const translations: Record<Language, Translations> = {
  en: {
    // NAV
    guides: "Guides",
    hotels: "Hotels",
    transport: "Transport",
    permit: "Permit",
    itinerary: "Itinerary",
    safety: "Safety",
    tribes: "Tribes",
    entrepreneurs: "Entrepreneurs",
    signIn: "Log In",
    signUp: "Sign Up",
    signOut: "Sign Out",
    myAccount: "My Account",
    languageLabel: "English",
    navExplore: "Explore",
    navPlan: "Plan",
    navEssentials: "Essentials",
    navGuidesDesc: "14 tourist circuits & destination guides",
    navTribesDesc: "Profiles of 26+ tribal communities",
    navEntrepreneursDesc: "Local businesses & experiences",
    navItineraryDesc: "AI-powered trip itineraries",
    navHotelsDesc: "Accommodation across all circuits",
    navTransportDesc: "4×4s, bikes & APST bus routes",
    navPermitIndianLabel: "Indian Citizens — ILP",
    navPermitIndianDesc: "Inner Line Permit (e-ILP)",
    navPermitForeignLabel: "Foreign Citizens — PAP",
    navPermitForeignDesc: "Protected Area Permit",
    navSafetyDesc: "Emergency contacts by district",
    navAdventures: "Adventures",
    navResources: "Resources",
    navAccount: "Account",
    navWildlifeLabel: "Wildlife & Nature",
    navWildlifeDesc: "Rare species in pristine Himalayan habitats",
    navEventsLabel: "Festivals & Events",
    navEventsDesc: "Tribal festivals and cultural celebrations",
    navHeritageLabel: "Heritage & Spiritual",
    navHeritageDesc: "Monasteries, war memorials & sacred sites",
    navTrekkingLabel: "Trekking",
    navTrekkingDesc: "High-altitude trails across remote valleys",
    navRaftingLabel: "River Rafting",
    navRaftingDesc: "Grade IV+ rapids on the Siang & Kameng",
    navAnglingLabel: "Angling",
    navAnglingDesc: "World-class mahseer fishing in pristine rivers",
    navParaglidingLabel: "Paragliding",
    navParaglidingDesc: "Soar above the Eastern Himalayas",
    navAllActivitiesLabel: "All Activities",
    navAllActivitiesDesc: "Browse the complete adventure hub",
    navAiTripBuilderLabel: "Journey AI",
    navAiTripBuilderDesc: "AI-powered personalised itineraries",
    navDistrictMapLabel: "District Map",
    navDistrictMapDesc: "Interactive map of all 26 districts",
    navArrivalFormalitiesLabel: "Arrival Formalities",
    navArrivalFormalitiesDesc: "ILP & PAP permit overview",
    navSmartIlpCheckLabel: "Smart ILP Pre-Check",
    navSmartIlpCheckDesc: "AI-powered permit requirement checker",
    navEguidesLabel: "E-Guides & Brochures",
    navEguidesDesc: "Download official PDF travel guides",
    navFactsLabel: "Facts About AP",
    navFactsDesc: "Geography, culture & visitor essentials",
    navVideoGalleryLabel: "Video Gallery",
    navVideoGalleryDesc: "Immersive videos of landscapes & culture",
    navNewsletterLabel: "Newsletter",
    navNewsletterDesc: "Seasonal tips, festival dates & new guides",
    navSavedTripsLabel: "Saved Trips",
    navSavedTripsDesc: "Your bookmarked itineraries — Phase 2",
    navPermitTrackerLabel: "Permit Tracker",
    navPermitTrackerDesc: "Track ILP/PAP status — Phase 2",
    navProfilePrefsLabel: "Profile & Preferences",
    navProfilePrefsDesc: "Account settings — Phase 2",

    // FOOTER
    footerTagline: "Discover the Land of the Rising Sun. Experience the unparalleled natural beauty and rich cultural heritage of Arunachal Pradesh.",
    footerQuickLinks: "Quick Links",
    footerTravelGuides: "Travel Guides",
    footerHotelBooking: "Hotel Booking",
    footerTransportServices: "Transport Services",
    footerApplyPermit: "Apply for Permit",
    footerSupport: "Support",
    footerSafety: "Safety & Security",
    footerFaqs: "FAQs",
    footerContactUs: "Contact Us",
    footerPrivacyPolicy: "Privacy Policy",
    footerConnect: "Connect",
    footerCopyright: "© 2026 Arunachal Pradesh Tourism Department. All rights reserved.",

    // HERO CAROUSEL
    heroSlide1Headline: "Arunachal Pradesh",
    heroSlide1Subline: "The Land of the Rising Sun",
    heroSlide1Tagline: "Untouched landscapes, vibrant cultures, serene monasteries.",
    heroSlide2Headline: "Majestic Himalayas",
    heroSlide2Subline: "Where the Sky Meets the Earth",
    heroSlide2Tagline: "Journey to the roof of the world and beyond.",
    heroSlide3Headline: "Verdant Valleys",
    heroSlide3Subline: "Nature's Untouched Paradise",
    heroSlide3Tagline: "Discover lush forests, rivers and hidden gems.",
    heroSlide4Headline: "Ancient Monasteries",
    heroSlide4Subline: "A Spiritual Odyssey",
    heroSlide4Tagline: "Experience centuries of Buddhist culture and heritage.",
    getYourPermit: "Get Your Permit",
    planMyTrip: "Plan My Trip",

    // HOME PAGE
    homeExploreTitle: "Start Your Exploration",
    homeExploreSubtitle: "Everything you need for a seamless and memorable experience in Arunachal Pradesh, all in one place.",
    learnMore: "Learn more",
    featGuidesTitle: "Curated Travel Guides",
    featGuidesDesc: "Explore the hidden gems of the Himalayas through our detailed cultural and destination guides.",
    featHotelsTitle: "Hotel Booking",
    featHotelsDesc: "Find and book unique stays, from mountain resorts to valley eco-stays.",
    featTransportTitle: "Transport Services",
    featTransportDesc: "Reliable car and bike rentals for safe navigation through mountain terrains.",
    featPermitTitle: "Inner Line Permits",
    featPermitDesc: "Seamless digital application for required tour permits with AI assistance.",
    featSafetyTitle: "Safety & Emergency",
    featSafetyDesc: "Locate nearest medical help and police stations instantly across the state.",
    featItineraryTitle: "AI Itinerary",
    featItineraryDesc: "Let our AI plan your perfect trip based on your interests and travel duration.",
    cultureTitle: "Experience Ancient Culture",
    cultureDesc: "From the majestic Tawang Monastery to the vibrant festivals of the Apatani tribes in Ziro, Arunachal Pradesh offers a spiritual and cultural odyssey unlike any other.",
    majorTribes: "Major Tribes",
    rareSpecies: "Rare Species",
    viewTravelGuides: "View Travel Guides",

    // SCROLLYTELLING SECTION
    stChapter1Badge: "Chapter 01 · Landscape",
    stChapter1Title: "Roof of the World",
    stChapter1Subtitle: "Where the Himalayas meet the sky",
    stChapter1Body: "Arunachal Pradesh rises from sub-tropical plains to alpine meadows, spanning peaks above 7,000 metres. This is a land where rivers carve gorges older than memory.",
    stChapter2Badge: "Chapter 02 · Heritage",
    stChapter2Title: "Living Traditions",
    stChapter2Subtitle: "Centuries of faith and festivity",
    stChapter2Body: "Over 26 distinct tribes celebrate their heritage through vibrant festivals, ancient monasteries, and oral traditions passed across generations.",
    stChapter3Badge: "Chapter 03 · Nature",
    stChapter3Title: "Wild & Untamed",
    stChapter3Subtitle: "A biodiversity hotspot like no other",
    stChapter3Body: "Namdapha Tiger Reserve shelters snow leopards, clouded leopards, and over 1,000 plant species inside one of the last true wilderness frontiers on Earth.",
    stChapter4Badge: "Chapter 04 · Adventure",
    stChapter4Title: "Your Story Begins",
    stChapter4Subtitle: "Hidden valleys, infinite horizons",
    stChapter4Body: "From the mystical Mechuka valley to high-altitude treks and the roaring Siang river, every turn reveals a landscape that rewards the bold.",
    stStat1Label: "Metres Altitude",
    stStat2Label: "Forest Cover",
    stStat3Label: "Indigenous Tribes",
    stStat4Label: "Years of History",
    stStat5Label: "Bird Species",
    stStat6Label: "Plant Species",
    stStat7Label: "Trekking Routes",
    stStat8Label: "Adventure Camps",
    stCTAButton: "Plan My Journey",
    stScrollHint: "Scroll to explore",

    // DESTINATIONS CAROUSEL
    popularDestinations: "Popular Destinations",
    popularDestinationsSubtitle: "Explore Arunachal's most beloved places",
    exploreText: "Explore",
    destTawangTagline: "Buddhism's Crown Jewel",
    destZiroTagline: "UNESCO Heritage Landscape",
    destNamdaphaTagline: "Biodiversity Hotspot",
    destMechukaTagline: "Hidden Himalayan Paradise",
    destSangtiTagline: "Valley of the Cranes",

    // GUIDES PAGE
    guidesPageTitle: "Curated Travel Guides",
    guidesPageSubtitle: "Expert insights into the most captivating destinations, festivals, and cultural experiences of Arunachal Pradesh.",
    readFullGuide: "Read Full Guide",
    bestTimeLabel: "Best",
    guideCTATitle: "Ready to embark on your Himalayan journey?",
    guideCTADesc: "Apply for your Inner Line Permit now and start planning your unique itinerary with our AI assistant.",
    applyForPermit: "Apply for Permit",
    planItinerary: "Plan Itinerary",
    guide1Title: "Tawang: The Hidden Paradise",
    guide1Category: "Mountain Destination",
    guide1Desc: "Discover the 400-year-old Tawang Monastery, frozen lakes, and the spirit of peace.",
    guide2Title: "Ziro: Echoes of Music and Culture",
    guide2Category: "Valley / Cultural",
    guide2Desc: "Experience the unique sustainable farming of Apatani tribe and the famous Ziro Music Festival.",
    guide3Title: "Namdapha: The Wild Frontier",
    guide3Category: "Wildlife / Nature",
    guide3Desc: "One of the richest biodiversity hotspots in the Himalayas. Home to the rare clouded leopard.",
    guide4Title: "Pasighat: The Gateway City",
    guide4Category: "Riverside / Adventure",
    guide4Desc: "Located on the banks of Siang river, perfect for white water rafting and river camping.",

    // HOTELS PAGE
    hotelsPageTitle: "Stay in the Serene",
    hotelsPageSubtitle: "Handpicked accommodations across the Land of the Rising Sun.",
    bookNow: "Book Now",
    perNight: "/night",

    // TRANSPORT PAGE
    transportPageTitle: "Mountain-Ready Transport",
    transportPageSubtitle: "Choose from our fleet of reliable SUVs and adventure bikes designed to tackle the winding Himalayan roads with ease and safety.",
    reserveNow: "Reserve Now",
    gpsEnabled: "GPS Enabled",
    gpsDesc: "All vehicles come with pre-loaded offline maps for remote connectivity.",
    fullyInsured: "Fully Insured",
    fullyInsuredDesc: "Comprehensive insurance coverage including roadside assistance.",
    verifiedDrivers: "Verified Drivers",
    verifiedDriversDesc: "Our drivers are locals with years of mountain driving experience.",

    // SAFETY PAGE
    safetyPageTitle: "Safety & Security",
    safetyPageSubtitle: "Quick access to emergency services and medical help across Arunachal Pradesh.",
    searchPlaceholder: "Search by city (e.g. Tawang)...",
    hospitalsTab: "Hospitals",
    policeTab: "Police Stations",
    emergencyHotline: "Emergency Hotline",
    emergencySubtitle: "State-wide unified emergency numbers",
    safeTravelTips: "Safe Travel Tips",
    safeTip1: "Register your contact details at the local police station upon arrival in remote districts.",
    safeTip2: "Always carry a hard copy of your Inner Line Permit (ILP) and identity documents.",
    safeTip3: "Carry a basic medical kit including medicines for motion sickness and high altitude.",
    active24x7: "24/7 Active",

    // ITINERARY PAGE
    itineraryPageTitle: "AI Itinerary Planner",
    itineraryPageSubtitle: "Craft your dream adventure in Arunachal Pradesh. Our AI suggests the best trips and daily plans tailored specifically for you.",
    yourPreferences: "Your Preferences",
    interestsLabel: "What interests you?",
    durationLabel: "Duration (Days)",
    activitiesLabel: "Activities (Comma separated)",
    generateItinerary: "Generate Itinerary",
    readyToPlan: "Ready to plan?",
    readyToPlanDesc: "Enter your details on the left and our AI will build a custom trip for you.",
    mappingAdventure: "Mapping out your Himalayan adventure...",
    takesMinute: "This may take up to a minute",

    // PERMIT PAGE
    permitPageTitle: "Inner Line Permit (ILP) Application",
    permitPageSubtitle: "Apply for your entry permit to Arunachal Pradesh digitally. Use our AI assistant to review your plan for quick approval.",
    applicationForm: "Application Form",
    allFieldsMandatory: "All fields marked with * are mandatory for processing.",
    fullNameLabel: "Full Name *",
    emailLabel: "Email *",
    travelStartLabel: "Travel Start Date *",
    travelEndLabel: "Travel End Date *",
    destinationsLabel: "Planned Destinations *",
    destinationsHint: "List all the districts/towns you plan to visit.",
    idTypeLabel: "ID Proof Type *",
    idNumberLabel: "ID Document Number *",
    acknowledgeLabel: "I acknowledge and agree to abide by all local regulations and safety guidelines of Arunachal Pradesh.",
    aiPreCheck: "AI Pre-Check",
    submitApplication: "Submit Application",
    aiReviewTool: "AI Review Tool",
    aiReviewFill: 'Fill out the form and click "AI Pre-Check" to get instant feedback on your application completeness and compliance.',
    reviewingPlan: "Reviewing your plan...",
    analyzingAI: "Analyzing with AI...",
    planComplete: "Plan looks complete!",
    actionRequired: "Action required",
    missingInfo: "Missing Info:",
    issuesFound: "Issues Found",
    suggestions: "Suggestions:",

    // TRIBES PAGE
    tribesPageTitle: "Local Tribes of Arunachal Pradesh",
    tribesPageSubtitle: "Discover the 26+ indigenous tribes whose vibrant traditions, festivals, and way of life make Arunachal Pradesh one of India's most culturally rich states.",
    tribesRegionLabel: "Region",
    tribesCultureLabel: "Key Tradition",
    tribe1Name: "Adi",
    tribe1Region: "East & West Siang",
    tribe1Desc: "One of the largest tribes, the Adi are celebrated for their intricate traditional weaving, the Solung and Ponung harvest festivals, and a deep connection to the Siang river valleys.",
    tribe2Name: "Apatani",
    tribe2Region: "Lower Subansiri (Ziro)",
    tribe2Desc: "Famous for their unique paddy-cum-fish farming system and nose-plugs tradition, the Apatani host the iconic Ziro Music Festival and are UNESCO-listed for sustainable land use.",
    tribe3Name: "Nyishi",
    tribe3Region: "Papum Pare & West Kameng",
    tribe3Desc: "The largest tribe in Arunachal, the Nyishi are known for their Nyokum Yullo festival, distinctive hornbill headgear, and vibrant folk music and dance traditions.",
    tribe4Name: "Monpa",
    tribe4Region: "Tawang & West Kameng",
    tribe4Desc: "Buddhist by faith, the Monpa are master craftsmen of handwoven carpets, thangka paintings, and traditional masks. The Torgya and Losar festivals are central to their calendar.",
    tribe5Name: "Wancho",
    tribe5Region: "Longding District",
    tribe5Desc: "The Wancho are skilled woodcarvers and weavers. Their morung (youth dormitory) tradition, rich tattooing culture, and colourful traditional attire are distinctive cultural markers.",
    tribe6Name: "Galo",
    tribe6Region: "West Siang",
    tribe6Desc: "Known for the Mopin festival of fertility and prosperity, the Galo practise jhum cultivation and are adept in traditional medicine, weaving, and community governance.",
    discoverTribes: "Discover Their Stories",

    // ENTREPRENEURS PAGE
    entrepreneursPageTitle: "Entrepreneurs of Arunachal Pradesh",
    entrepreneursPageSubtitle: "Meet the innovators and changemakers from the Land of the Rising Sun who are building businesses, preserving heritage, and inspiring the next generation.",
    entrepreneurSectorLabel: "Sector",
    entrepreneur1Name: "Hage Leki",
    entrepreneur1Venture: "Arunachal Eco Trails",
    entrepreneur1Sector: "Ecotourism & Hospitality",
    entrepreneur1Desc: "Founded one of the state's pioneering eco-tourism networks, connecting remote Himalayan villages with responsible travellers while generating sustainable livelihoods for local communities.",
    entrepreneur2Name: "Ojing Tasing",
    entrepreneur2Venture: "NorthEast Digital Hub",
    entrepreneur2Sector: "Technology & Startups",
    entrepreneur2Desc: "A tech pioneer who launched the region's first digital services startup, bridging the connectivity gap in remote districts and training hundreds of young people in digital skills.",
    entrepreneur3Name: "Bengia Tolum",
    entrepreneur3Venture: "Adi Weaves",
    entrepreneur3Sector: "Handloom & Crafts",
    entrepreneur3Desc: "Reviving traditional Adi weaving by blending age-old patterns with contemporary fashion, creating a thriving export business that empowers over 200 tribal women artisans.",
    entrepreneur4Name: "Tara Saikia",
    entrepreneur4Venture: "Himalayan Organics",
    entrepreneur4Sector: "Organic Farming & Food",
    entrepreneur4Desc: "Established the state's first certified organic farm collective, bringing chemical-free highland produce to national markets and building a model of cooperative agri-entrepreneurship.",
    meetEntrepreneurs: "Read Their Story",

    // HOME – TRIBES & ENTREPRENEURS SECTION
    homeCultureSectionTitle: "People & Heritage",
    homeCultureSectionSubtitle: "The soul of Arunachal Pradesh lies in its extraordinary people — ancient tribes preserving millennia-old traditions and modern entrepreneurs building a new future.",
    featTribesTitle: "Local Tribes",
    featTribesDesc: "Explore the rich cultural tapestry of 26+ indigenous tribes, each with unique festivals, crafts, and traditions that have endured for centuries.",
    featEntrepreneursTitle: "Entrepreneurs",
    featEntrepreneursDesc: "Meet the innovators and changemakers from Arunachal Pradesh who are building businesses and inspiring the next generation.",
    exploreTribes: "Explore Tribes",
    exploreEntrepreneurs: "Meet Entrepreneurs",
  },

  hi: {
    // NAV
    guides: "गाइड",
    hotels: "होटल",
    transport: "परिवहन",
    permit: "परमिट",
    itinerary: "यात्रा कार्यक्रम",
    safety: "सुरक्षा",
    tribes: "जनजातियाँ",
    entrepreneurs: "उद्यमी",
    signIn: "लॉग इन",
    signUp: "साइन अप",
    signOut: "साइन आउट",
    myAccount: "मेरा खाता",
    languageLabel: "हिंदी",
    navExplore: "अन्वेषण",
    navPlan: "योजना",
    navEssentials: "आवश्यकताएँ",
    navGuidesDesc: "14 पर्यटन सर्किट और गंतव्य गाइड",
    navTribesDesc: "26+ जनजातीय समुदायों का परिचय",
    navEntrepreneursDesc: "स्थानीय व्यवसाय और अनुभव",
    navItineraryDesc: "AI-संचालित यात्रा कार्यक्रम",
    navHotelsDesc: "सभी सर्किट में आवास",
    navTransportDesc: "4×4, बाइक और APST बस मार्ग",
    navPermitIndianLabel: "भारतीय नागरिक — ILP",
    navPermitIndianDesc: "इनर लाइन परमिट (e-ILP)",
    navPermitForeignLabel: "विदेशी नागरिक — PAP",
    navPermitForeignDesc: "संरक्षित क्षेत्र परमिट",
    navSafetyDesc: "जिलेवार आपातकालीन संपर्क",
    navAdventures: "साहसिक",
    navResources: "संसाधन",
    navAccount: "खाता",
    navWildlifeLabel: "वन्यजीव और प्रकृति",
    navWildlifeDesc: "हिमालयी वनों में दुर्लभ प्रजातियाँ",
    navEventsLabel: "त्यौहार और कार्यक्रम",
    navEventsDesc: "जनजातीय उत्सव और सांस्कृतिक समारोह",
    navHeritageLabel: "विरासत और आध्यात्मिक",
    navHeritageDesc: "मठ, युद्ध स्मारक और पवित्र स्थल",
    navTrekkingLabel: "ट्रेकिंग",
    navTrekkingDesc: "दूरस्थ घाटियों में ऊँचाई के रास्ते",
    navRaftingLabel: "नदी राफ्टिंग",
    navRaftingDesc: "सियांग और कामेंग पर ग्रेड IV+ रैपिड्स",
    navAnglingLabel: "मछली पकड़ना",
    navAnglingDesc: "प्रदूषणमुक्त नदियों में विश्वस्तरीय महासीर मछली पकड़ना",
    navParaglidingLabel: "पैराग्लाइडिंग",
    navParaglidingDesc: "पूर्वी हिमालय के ऊपर उड़ान",
    navAllActivitiesLabel: "सभी गतिविधियाँ",
    navAllActivitiesDesc: "पूर्ण साहसिक केंद्र देखें",
    navAiTripBuilderLabel: "AI यात्रा निर्माता",
    navAiTripBuilderDesc: "Genkit-संचालित व्यक्तिगत यात्रा कार्यक्रम",
    navDistrictMapLabel: "जिला मानचित्र",
    navDistrictMapDesc: "सभी 26 जिलों का इंटरैक्टिव मानचित्र",
    navArrivalFormalitiesLabel: "आगमन औपचारिकताएँ",
    navArrivalFormalitiesDesc: "ILP और PAP परमिट अवलोकन",
    navSmartIlpCheckLabel: "स्मार्ट ILP प्री-चेक",
    navSmartIlpCheckDesc: "AI-संचालित परमिट आवश्यकता जाँचकर्ता",
    navEguidesLabel: "ई-गाइड और ब्रोशर",
    navEguidesDesc: "आधिकारिक PDF यात्रा गाइड डाउनलोड करें",
    navFactsLabel: "AP के बारे में तथ्य",
    navFactsDesc: "भूगोल, संस्कृति और पर्यटक जानकारी",
    navVideoGalleryLabel: "वीडियो गैलरी",
    navVideoGalleryDesc: "परिदृश्य और संस्कृति के immersive वीडियो",
    navNewsletterLabel: "न्यूज़लेटर",
    navNewsletterDesc: "मौसमी सुझाव, त्यौहार तिथियाँ और नई गाइड",
    navSavedTripsLabel: "सहेजी गई यात्राएँ",
    navSavedTripsDesc: "आपकी बुकमार्क यात्राएँ — चरण 2",
    navPermitTrackerLabel: "परमिट ट्रैकर",
    navPermitTrackerDesc: "ILP/PAP स्थिति ट्रैक करें — चरण 2",
    navProfilePrefsLabel: "प्रोफ़ाइल और प्राथमिकताएँ",
    navProfilePrefsDesc: "खाता सेटिंग — चरण 2",

    // FOOTER
    footerTagline: "उगते सूरज की भूमि की खोज करें। अरुणाचल प्रदेश की अतुलनीय प्राकृतिक सुंदरता और समृद्ध सांस्कृतिक विरासत का अनुभव करें।",
    footerQuickLinks: "त्वरित लिंक",
    footerTravelGuides: "यात्रा गाइड",
    footerHotelBooking: "होटल बुकिंग",
    footerTransportServices: "परिवहन सेवाएं",
    footerApplyPermit: "परमिट के लिए आवेदन करें",
    footerSupport: "सहायता",
    footerSafety: "सुरक्षा और संरक्षण",
    footerFaqs: "अक्सर पूछे जाने वाले प्रश्न",
    footerContactUs: "हमसे संपर्क करें",
    footerPrivacyPolicy: "गोपनीयता नीति",
    footerConnect: "जुड़ें",
    footerCopyright: "© 2026 अरुणाचल प्रदेश पर्यटन विभाग। सर्वाधिकार सुरक्षित।",

    // HERO CAROUSEL
    heroSlide1Headline: "अरुणाचल प्रदेश",
    heroSlide1Subline: "उगते सूरज की भूमि",
    heroSlide1Tagline: "अछूते परिदृश्य, जीवंत संस्कृतियां, शांत मठ।",
    heroSlide2Headline: "महान हिमालय",
    heroSlide2Subline: "जहां आकाश धरती से मिलता है",
    heroSlide2Tagline: "दुनिया की छत तक और उससे परे की यात्रा।",
    heroSlide3Headline: "हरी-भरी घाटियां",
    heroSlide3Subline: "प्रकृति का अछूता स्वर्ग",
    heroSlide3Tagline: "घने जंगलों, नदियों और छुपे हुए रत्नों की खोज करें।",
    heroSlide4Headline: "प्राचीन मठ",
    heroSlide4Subline: "एक आध्यात्मिक यात्रा",
    heroSlide4Tagline: "बौद्ध संस्कृति और विरासत की सदियों का अनुभव करें।",
    getYourPermit: "अपना परमिट प्राप्त करें",
    planMyTrip: "मेरी यात्रा योजना बनाएं",

    // HOME PAGE
    homeExploreTitle: "अन्वेषण शुरू करें",
    homeExploreSubtitle: "अरुणाचल प्रदेश में एक निर्बाध और यादगार अनुभव के लिए सब कुछ एक ही स्थान पर।",
    learnMore: "और जानें",
    featGuidesTitle: "सुव्यवस्थित यात्रा गाइड",
    featGuidesDesc: "हमारी विस्तृत सांस्कृतिक और गंतव्य गाइड के माध्यम से हिमालय के छुपे हुए रत्नों की खोज करें।",
    featHotelsTitle: "होटल बुकिंग",
    featHotelsDesc: "पहाड़ी रिसॉर्ट से लेकर घाटी इको-स्टे तक अद्वितीय आवास खोजें और बुक करें।",
    featTransportTitle: "परिवहन सेवाएं",
    featTransportDesc: "पर्वतीय भूभाग में सुरक्षित यात्रा के लिए विश्वसनीय कार और बाइक किराया।",
    featPermitTitle: "इनर लाइन परमिट",
    featPermitDesc: "AI सहायता के साथ आवश्यक टूर परमिट के लिए सहज डिजिटल आवेदन।",
    featSafetyTitle: "सुरक्षा और आपातकाल",
    featSafetyDesc: "राज्य भर में निकटतम चिकित्सा सहायता और पुलिस स्टेशन तुरंत खोजें।",
    featItineraryTitle: "AI यात्रा कार्यक्रम",
    featItineraryDesc: "हमारा AI आपकी रुचियों और यात्रा अवधि के आधार पर आपकी परफेक्ट यात्रा की योजना बनाएगा।",
    cultureTitle: "प्राचीन संस्कृति का अनुभव करें",
    cultureDesc: "भव्य तवांग मठ से लेकर ज़ीरो में अपाटानी जनजाति के जीवंत त्योहारों तक, अरुणाचल प्रदेश एक अनूठी आध्यात्मिक और सांस्कृतिक यात्रा प्रदान करता है।",
    majorTribes: "प्रमुख जनजातियां",
    rareSpecies: "दुर्लभ प्रजातियां",
    viewTravelGuides: "यात्रा गाइड देखें",

    // SCROLLYTELLING SECTION
    stChapter1Badge: "अध्याय 01 · भूदृश्य",
    stChapter1Title: "दुनिया की छत",
    stChapter1Subtitle: "जहाँ हिमालय और आकाश मिलते हैं",
    stChapter1Body: "अरुणाचल प्रदेश उष्णकटिबंधीय मैदानों से शुरू होकर 7,000 मीटर से ऊँची चोटियों तक फैला है। यह वह भूमि है जहाँ नदियाँ सहस्राब्दियों पुरानी घाटियाँ बनाती हैं।",
    stChapter2Badge: "अध्याय 02 · विरासत",
    stChapter2Title: "जीवंत परंपराएँ",
    stChapter2Subtitle: "सदियों की आस्था और उत्सव",
    stChapter2Body: "26 से अधिक अलग-अलग जनजातियाँ अपनी विरासत को जीवंत उत्सवों, प्राचीन मठों और पीढ़ी-दर-पीढ़ी चली आ रही मौखिक परंपराओं के माध्यम से मनाती हैं।",
    stChapter3Badge: "अध्याय 03 · प्रकृति",
    stChapter3Title: "जंगली और अनछुआ",
    stChapter3Subtitle: "एक अनूठा जैव विविधता केंद्र",
    stChapter3Body: "नामदफा टाइगर रिजर्व हिम तेंदुए, बादल तेंदुए और 1,000 से अधिक पौधों की प्रजातियों का घर है।",
    stChapter4Badge: "अध्याय 04 · साहसिक",
    stChapter4Title: "आपकी कहानी शुरू होती है",
    stChapter4Subtitle: "रहस्यमयी घाटियाँ, असीमित क्षितिज",
    stChapter4Body: "मेचुका घाटी से लेकर ऊँचाई पर ट्रेक और सियांग नदी की गर्जना तक, हर मोड़ एक नया दृश्य प्रस्तुत करता है।",
    stStat1Label: "मीटर ऊँचाई",
    stStat2Label: "वन आवरण",
    stStat3Label: "स्वदेशी जनजातियाँ",
    stStat4Label: "वर्षों का इतिहास",
    stStat5Label: "पक्षी प्रजातियाँ",
    stStat6Label: "पौधों की प्रजातियाँ",
    stStat7Label: "ट्रेकिंग मार्ग",
    stStat8Label: "साहसिक शिविर",
    stCTAButton: "यात्रा की योजना बनाएं",
    stScrollHint: "देखने के लिए स्क्रॉल करें",

    // DESTINATIONS CAROUSEL
    popularDestinations: "लोकप्रिय गंतव्य",
    popularDestinationsSubtitle: "अरुणाचल के सबसे प्रिय स्थानों की खोज करें",
    exploreText: "अन्वेषण करें",
    destTawangTagline: "बौद्ध धर्म का मुकुट मणि",
    destZiroTagline: "यूनेस्को विरासत परिदृश्य",
    destNamdaphaTagline: "जैव विविधता केंद्र",
    destMechukaTagline: "छुपा हुआ हिमालयी स्वर्ग",
    destSangtiTagline: "क्रेन की घाटी",

    // GUIDES PAGE
    guidesPageTitle: "सुव्यवस्थित यात्रा गाइड",
    guidesPageSubtitle: "अरुणाचल प्रदेश के सबसे मनोरम गंतव्यों, त्योहारों और सांस्कृतिक अनुभवों में विशेषज्ञ जानकारी।",
    readFullGuide: "पूरी गाइड पढ़ें",
    bestTimeLabel: "सर्वोत्तम",
    guideCTATitle: "अपनी हिमालयी यात्रा के लिए तैयार हैं?",
    guideCTADesc: "अभी अपने इनर लाइन परमिट के लिए आवेदन करें और हमारे AI सहायक के साथ अपनी अनूठी यात्रा योजना बनाना शुरू करें।",
    applyForPermit: "परमिट के लिए आवेदन करें",
    planItinerary: "यात्रा योजना बनाएं",
    guide1Title: "तवांग: छुपा हुआ स्वर्ग",
    guide1Category: "पर्वतीय गंतव्य",
    guide1Desc: "400 साल पुराने तवांग मठ, जमे हुए झीलों और शांति की भावना की खोज करें।",
    guide2Title: "ज़ीरो: संगीत और संस्कृति की गूंज",
    guide2Category: "घाटी / सांस्कृतिक",
    guide2Desc: "अपाटानी जनजाति की अनूठी टिकाऊ कृषि और प्रसिद्ध ज़ीरो संगीत महोत्सव का अनुभव करें।",
    guide3Title: "नामदफा: जंगली सरहद",
    guide3Category: "वन्यजीव / प्रकृति",
    guide3Desc: "हिमालय में सबसे समृद्ध जैव विविधता केंद्रों में से एक। दुर्लभ धुंधले तेंदुए का घर।",
    guide4Title: "पासीघाट: प्रवेश द्वार शहर",
    guide4Category: "नदीतट / साहसिक",
    guide4Desc: "सियांग नदी के किनारे स्थित, वाइट वाटर राफ्टिंग और नदी कैंपिंग के लिए आदर्श।",

    // HOTELS PAGE
    hotelsPageTitle: "शांत परिवेश में ठहरें",
    hotelsPageSubtitle: "उगते सूरज की भूमि में हस्तचयनित आवास।",
    bookNow: "अभी बुक करें",
    perNight: "/रात",

    // TRANSPORT PAGE
    transportPageTitle: "पर्वत-तैयार परिवहन",
    transportPageSubtitle: "हमारे विश्वसनीय SUV और साहसिक बाइक के बेड़े से चुनें जो घुमावदार हिमालयी सड़कों को आसानी और सुरक्षा के साथ पार कर सकते हैं।",
    reserveNow: "अभी आरक्षित करें",
    gpsEnabled: "GPS सक्षम",
    gpsDesc: "सभी वाहनों में दूरस्थ क्षेत्रों के लिए प्री-लोडेड ऑफलाइन मानचित्र हैं।",
    fullyInsured: "पूरी तरह बीमाकृत",
    fullyInsuredDesc: "रोडसाइड सहायता सहित व्यापक बीमा कवरेज।",
    verifiedDrivers: "सत्यापित चालक",
    verifiedDriversDesc: "हमारे चालक स्थानीय हैं जिन्हें पर्वतीय ड्राइविंग का वर्षों का अनुभव है।",

    // SAFETY PAGE
    safetyPageTitle: "सुरक्षा और संरक्षण",
    safetyPageSubtitle: "अरुणाचल प्रदेश में आपातकालीन सेवाओं और चिकित्सा सहायता तक त्वरित पहुंच।",
    searchPlaceholder: "शहर से खोजें (जैसे तवांग)...",
    hospitalsTab: "अस्पताल",
    policeTab: "पुलिस स्टेशन",
    emergencyHotline: "आपातकालीन हॉटलाइन",
    emergencySubtitle: "राज्यव्यापी एकीकृत आपातकालीन नंबर",
    safeTravelTips: "सुरक्षित यात्रा सुझाव",
    safeTip1: "दूरस्थ जिलों में पहुंचने पर स्थानीय पुलिस स्टेशन में अपना संपर्क विवरण दर्ज करें।",
    safeTip2: "हमेशा अपने इनर लाइन परमिट (ILP) और पहचान दस्तावेजों की हार्ड कॉपी रखें।",
    safeTip3: "मोशन सिकनेस और उच्च ऊंचाई की दवाओं सहित एक बुनियादी चिकित्सा किट साथ रखें।",
    active24x7: "24/7 सक्रिय",

    // ITINERARY PAGE
    itineraryPageTitle: "AI यात्रा योजनाकार",
    itineraryPageSubtitle: "अरुणाचल प्रदेश में अपने सपनों की साहसिक यात्रा तैयार करें। हमारा AI आपके लिए विशेष रूप से अनुकूलित सर्वोत्तम यात्राएं और दैनिक योजनाएं सुझाता है।",
    yourPreferences: "आपकी प्राथमिकताएं",
    interestsLabel: "आपकी रुचि क्या है?",
    durationLabel: "अवधि (दिन)",
    activitiesLabel: "गतिविधियां (कॉमा से अलग)",
    generateItinerary: "यात्रा कार्यक्रम बनाएं",
    readyToPlan: "योजना बनाने के लिए तैयार?",
    readyToPlanDesc: "बाईं ओर अपना विवरण दर्ज करें और हमारा AI आपके लिए एक कस्टम यात्रा तैयार करेगा।",
    mappingAdventure: "आपकी हिमालयी साहसिक यात्रा की योजना बनाई जा रही है...",
    takesMinute: "इसमें एक मिनट तक का समय लग सकता है",

    // PERMIT PAGE
    permitPageTitle: "इनर लाइन परमिट (ILP) आवेदन",
    permitPageSubtitle: "अरुणाचल प्रदेश के लिए अपना प्रवेश परमिट डिजिटल रूप से आवेदन करें। त्वरित अनुमोदन के लिए अपनी योजना की समीक्षा हेतु हमारे AI सहायक का उपयोग करें।",
    applicationForm: "आवेदन फॉर्म",
    allFieldsMandatory: "* से चिह्नित सभी फ़ील्ड प्रसंस्करण के लिए अनिवार्य हैं।",
    fullNameLabel: "पूरा नाम *",
    emailLabel: "ईमेल *",
    travelStartLabel: "यात्रा प्रारंभ तिथि *",
    travelEndLabel: "यात्रा समाप्ति तिथि *",
    destinationsLabel: "नियोजित गंतव्य *",
    destinationsHint: "सभी जिले/शहर जहां आप जाने की योजना बना रहे हैं उन्हें सूचीबद्ध करें।",
    idTypeLabel: "पहचान प्रमाण प्रकार *",
    idNumberLabel: "पहचान दस्तावेज संख्या *",
    acknowledgeLabel: "मैं अरुणाचल प्रदेश के सभी स्थानीय नियमों और सुरक्षा दिशानिर्देशों का पालन करने के लिए सहमत हूं।",
    aiPreCheck: "AI पूर्व-जांच",
    submitApplication: "आवेदन जमा करें",
    aiReviewTool: "AI समीक्षा उपकरण",
    aiReviewFill: "फॉर्म भरें और 'AI पूर्व-जांच' पर क्लिक करके अपने आवेदन की पूर्णता और अनुपालन पर तत्काल फीडबैक पाएं।",
    reviewingPlan: "आपकी योजना की समीक्षा की जा रही है...",
    analyzingAI: "AI से विश्लेषण किया जा रहा है...",
    planComplete: "योजना पूर्ण दिखती है!",
    actionRequired: "कार्रवाई आवश्यक",
    missingInfo: "गुम जानकारी:",
    issuesFound: "मुद्दे पाए गए",
    suggestions: "सुझाव:",

    // TRIBES PAGE
    tribesPageTitle: "अरुणाचल प्रदेश की स्थानीय जनजातियाँ",
    tribesPageSubtitle: "26+ आदिवासी जनजातियों की जीवंत परंपराओं, त्योहारों और जीवन शैली को जानें जो अरुणाचल प्रदेश को भारत के सबसे सांस्कृतिक रूप से समृद्ध राज्यों में से एक बनाती हैं।",
    tribesRegionLabel: "क्षेत्र",
    tribesCultureLabel: "मुख्य परंपरा",
    tribe1Name: "आदि",
    tribe1Region: "पूर्वी और पश्चिमी सियांग",
    tribe1Desc: "सबसे बड़ी जनजातियों में से एक, आदि अपनी पारंपरिक बुनाई, सोलुंग और पोनुंग फसल त्योहारों और सियांग नदी घाटियों से गहरे संबंध के लिए प्रसिद्ध हैं।",
    tribe2Name: "अपाटानी",
    tribe2Region: "लोअर सुबनसिरी (जिरो)",
    tribe2Desc: "अपनी अनूठी धान-मछली खेती प्रणाली और नाक-प्लग परंपरा के लिए प्रसिद्ध, अपाटानी प्रतिष्ठित जिरो संगीत महोत्सव की मेजबानी करते हैं।",
    tribe3Name: "न्यिशी",
    tribe3Region: "पापुम पारे और पश्चिमी कामेंग",
    tribe3Desc: "अरुणाचल की सबसे बड़ी जनजाति, न्यिशी अपने न्योकुम युल्लो त्योहार, विशिष्ट हॉर्नबिल हेडगियर और लोक संगीत के लिए जानी जाती है।",
    tribe4Name: "मोन्पा",
    tribe4Region: "तवांग और पश्चिमी कामेंग",
    tribe4Desc: "बौद्ध धर्म के अनुयायी मोन्पा हस्तनिर्मित कालीनों, थंका चित्रकला और पारंपरिक मुखौटों के कुशल शिल्पकार हैं।",
    tribe5Name: "वांचो",
    tribe5Region: "लोंगडिंग जिला",
    tribe5Desc: "वांचो कुशल लकड़ी के नक्काशीकार और बुनकर हैं। उनकी मोरुंग परंपरा, टैटू संस्कृति और रंगीन पारंपरिक पोशाक उनकी पहचान है।",
    tribe6Name: "गालो",
    tribe6Region: "पश्चिमी सियांग",
    tribe6Desc: "मोपिन उत्सव के लिए जाने जाने वाले गालो झूम खेती के विशेषज्ञ हैं और पारंपरिक चिकित्सा, बुनाई और सामुदायिक शासन में कुशल हैं।",
    discoverTribes: "उनकी कहानियाँ जानें",

    // ENTREPRENEURS PAGE
    entrepreneursPageTitle: "अरुणाचल प्रदेश के उद्यमी",
    entrepreneursPageSubtitle: "उन नवप्रवर्तकों और बदलाव लाने वालों से मिलें जो व्यवसाय बना रहे हैं, विरासत को संरक्षित कर रहे हैं और अगली पीढ़ी को प्रेरित कर रहे हैं।",
    entrepreneurSectorLabel: "क्षेत्र",
    entrepreneur1Name: "हागे लेकी",
    entrepreneur1Venture: "अरुणाचल इको ट्रेल्स",
    entrepreneur1Sector: "इको-पर्यटन और आतिथ्य",
    entrepreneur1Desc: "राज्य के अग्रणी इको-पर्यटन नेटवर्क की स्थापना की, जो दूरस्थ हिमालयी गांवों को जिम्मेदार यात्रियों से जोड़ता है।",
    entrepreneur2Name: "ओजिंग तासिंग",
    entrepreneur2Venture: "नॉर्थईस्ट डिजिटल हब",
    entrepreneur2Sector: "प्रौद्योगिकी और स्टार्टअप",
    entrepreneur2Desc: "क्षेत्र का पहला डिजिटल सेवा स्टार्टअप शुरू किया और सैकड़ों युवाओं को डिजिटल कौशल में प्रशिक्षित किया।",
    entrepreneur3Name: "बेंगिया टोलुम",
    entrepreneur3Venture: "आदि वीव्स",
    entrepreneur3Sector: "हथकरघा और शिल्प",
    entrepreneur3Desc: "पारंपरिक आदि बुनाई को समकालीन फैशन के साथ मिलाकर 200 से अधिक आदिवासी महिला कारीगरों को सशक्त किया।",
    entrepreneur4Name: "तारा सैकिया",
    entrepreneur4Venture: "हिमालयन ऑर्गेनिक्स",
    entrepreneur4Sector: "जैविक खेती और खाद्य",
    entrepreneur4Desc: "राज्य का पहला प्रमाणित जैविक कृषि सामूहिक स्थापित किया, जो राष्ट्रीय बाजारों में रसायन-मुक्त उत्पाद लाता है।",
    meetEntrepreneurs: "उनकी कहानी पढ़ें",

    // HOME – TRIBES & ENTREPRENEURS SECTION
    homeCultureSectionTitle: "लोग और विरासत",
    homeCultureSectionSubtitle: "अरुणाचल प्रदेश की आत्मा उसके असाधारण लोगों में बसती है — प्राचीन जनजातियाँ और आधुनिक उद्यमी।",
    featTribesTitle: "स्थानीय जनजातियाँ",
    featTribesDesc: "26+ आदिवासी जनजातियों की समृद्ध सांस्कृतिक विविधता का अन्वेषण करें, जिनमें से प्रत्येक के अनूठे त्योहार, शिल्प और परंपराएं हैं।",
    featEntrepreneursTitle: "उद्यमी",
    featEntrepreneursDesc: "अरुणाचल प्रदेश के उन नवप्रवर्तकों से मिलें जो व्यवसाय बना रहे हैं और अगली पीढ़ी को प्रेरित कर रहे हैं।",
    exploreTribes: "जनजातियाँ जानें",
    exploreEntrepreneurs: "उद्यमियों से मिलें",
  },

  bn: {
    // NAV
    guides: "গাইড",
    hotels: "হোটেল",
    transport: "পরিবহন",
    permit: "পারমিট",
    itinerary: "ভ্রমণসূচি",
    safety: "নিরাপত্তা",
    tribes: "উপজাতি",
    entrepreneurs: "উদ্যোক্তা",
    signIn: "লগ ইন",
    signUp: "সাইন আপ",
    signOut: "সাইন আউট",
    myAccount: "আমার অ্যাকাউন্ট",
    languageLabel: "বাংলা",
    navExplore: "অন্বেষণ",
    navPlan: "পরিকল্পনা",
    navEssentials: "প্রয়োজনীয়",
    navGuidesDesc: "১৪টি পর্যটন সার্কিট ও গন্তব্য গাইড",
    navTribesDesc: "২৬+ আদিবাসী সম্প্রদায়ের পরিচিতি",
    navEntrepreneursDesc: "স্থানীয় ব্যবসা ও অভিজ্ঞতা",
    navItineraryDesc: "AI-চালিত ভ্রমণ পরিকল্পনা",
    navHotelsDesc: "সকল সার্কিটে আবাসন",
    navTransportDesc: "4×4, বাইক ও APST বাস রুট",
    navPermitIndianLabel: "ভারতীয় নাগরিক — ILP",
    navPermitIndianDesc: "ইনার লাইন পারমিট (e-ILP)",
    navPermitForeignLabel: "বিদেশী নাগরিক — PAP",
    navPermitForeignDesc: "সুরক্ষিত এলাকা পারমিট",
    navSafetyDesc: "জেলাভিত্তিক জরুরি যোগাযোগ",
    navAdventures: "অ্যাডভেঞ্চার",
    navResources: "সম্পদ",
    navAccount: "অ্যাকাউন্ট",
    navWildlifeLabel: "বন্যপ্রাণী ও প্রকৃতি",
    navWildlifeDesc: "হিমালয়ের অরণ্যে বিরল প্রজাতি",
    navEventsLabel: "উৎসব ও অনুষ্ঠান",
    navEventsDesc: "আদিবাসী উৎসব ও সাংস্কৃতিক অনুষ্ঠান",
    navHeritageLabel: "ঐতিহ্য ও আধ্যাত্মিক",
    navHeritageDesc: "মঠ, যুদ্ধ স্মারক ও পবিত্র স্থান",
    navTrekkingLabel: "ট্রেকিং",
    navTrekkingDesc: "দূরবর্তী উপত্যকায় উচ্চতার পথ",
    navRaftingLabel: "নদী র‍্যাফটিং",
    navRaftingDesc: "সিয়াং ও কামেং-এ গ্রেড IV+ র‍্যাপিড",
    navAnglingLabel: "মাছ ধরা",
    navAnglingDesc: "প্রাকৃতিক নদীতে বিশ্বমানের মাহশীর মাছ ধরা",
    navParaglidingLabel: "প্যারাগ্লাইডিং",
    navParaglidingDesc: "পূর্ব হিমালয়ের উপর দিয়ে উড়ান",
    navAllActivitiesLabel: "সব কার্যক্রম",
    navAllActivitiesDesc: "সম্পূর্ণ অ্যাডভেঞ্চার হাব দেখুন",
    navAiTripBuilderLabel: "AI ট্রিপ বিল্ডার",
    navAiTripBuilderDesc: "Genkit-চালিত ব্যক্তিগতকৃত ভ্রমণসূচি",
    navDistrictMapLabel: "জেলা মানচিত্র",
    navDistrictMapDesc: "সব ২৬টি জেলার ইন্টারেক্টিভ মানচিত্র",
    navArrivalFormalitiesLabel: "আগমন আনুষ্ঠানিকতা",
    navArrivalFormalitiesDesc: "ILP ও PAP পারমিটের সারসংক্ষেপ",
    navSmartIlpCheckLabel: "স্মার্ট ILP প্রি-চেক",
    navSmartIlpCheckDesc: "AI-চালিত পারমিট প্রয়োজনীয়তা পরীক্ষক",
    navEguidesLabel: "ই-গাইড ও ব্রোশার",
    navEguidesDesc: "অফিসিয়াল PDF ভ্রমণ গাইড ডাউনলোড করুন",
    navFactsLabel: "AP সম্পর্কে তথ্য",
    navFactsDesc: "ভূগোল, সংস্কৃতি ও দর্শনার্থীর তথ্য",
    navVideoGalleryLabel: "ভিডিও গ্যালারি",
    navVideoGalleryDesc: "প্রকৃতি ও সংস্কৃতির নিমজ্জিত ভিডিও",
    navNewsletterLabel: "নিউজলেটার",
    navNewsletterDesc: "মৌসুমী টিপস, উৎসবের তারিখ ও নতুন গাইড",
    navSavedTripsLabel: "সংরক্ষিত ভ্রমণ",
    navSavedTripsDesc: "আপনার বুকমার্ক করা ভ্রমণসূচি — পর্যায় ২",
    navPermitTrackerLabel: "পারমিট ট্র্যাকার",
    navPermitTrackerDesc: "ILP/PAP স্ট্যাটাস ট্র্যাক করুন — পর্যায় ২",
    navProfilePrefsLabel: "প্রোফাইল ও পছন্দ",
    navProfilePrefsDesc: "অ্যাকাউন্ট সেটিংস — পর্যায় ২",

    // FOOTER
    footerTagline: "উদীয়মান সূর্যের ভূমি আবিষ্কার করুন। অরুণাচল প্রদেশের অতুলনীয় প্রাকৃতিক সৌন্দর্য ও সমৃদ্ধ সাংস্কৃতিক ঐতিহ্য উপভোগ করুন।",
    footerQuickLinks: "দ্রুত লিঙ্ক",
    footerTravelGuides: "ভ্রমণ গাইড",
    footerHotelBooking: "হোটেল বুকিং",
    footerTransportServices: "পরিবহন সেবা",
    footerApplyPermit: "পারমিটের জন্য আবেদন করুন",
    footerSupport: "সহায়তা",
    footerSafety: "নিরাপত্তা ও সুরক্ষা",
    footerFaqs: "সাধারণ জিজ্ঞাসা",
    footerContactUs: "আমাদের সাথে যোগাযোগ করুন",
    footerPrivacyPolicy: "গোপনীয়তা নীতি",
    footerConnect: "যোগাযোগ করুন",
    footerCopyright: "© 2026 অরুণাচল প্রদেশ পর্যটন বিভাগ। সর্বস্বত্ব সংরক্ষিত।",

    // HERO CAROUSEL
    heroSlide1Headline: "অরুণাচল প্রদেশ",
    heroSlide1Subline: "উদীয়মান সূর্যের ভূমি",
    heroSlide1Tagline: "অস্পৃশ্ট প্রকৃতি, প্রাণবন্ত সংস্কৃতি, শান্ত বৌদ্ধমঠ।",
    heroSlide2Headline: "বিশাল হিমালয়",
    heroSlide2Subline: "যেখানে আকাশ মাটিকে স্পর্শ করে",
    heroSlide2Tagline: "পৃথিবীর ছাদ পার হয়ে অজানায় যাত্রা।",
    heroSlide3Headline: "সবুজ উপত্যকা",
    heroSlide3Subline: "প্রকৃতির অস্পৃষ্ট স্বর্গ",
    heroSlide3Tagline: "ঘন বন, নদী ও লুকানো রত্নরাজি আবিষ্কার করুন।",
    heroSlide4Headline: "প্রাচীন বৌদ্ধমঠ",
    heroSlide4Subline: "একটি আধ্যাত্মিক যাত্রা",
    heroSlide4Tagline: "বৌদ্ধ সংস্কৃতি ও ঐতিহ্যের শতাব্দী অনুভব করুন।",
    getYourPermit: "আপনার পারমিট নিন",
    planMyTrip: "আমার যাত্রা পরিকল্পনা করুন",

    // HOME PAGE
    homeExploreTitle: "আপনার অন্বেষণ শুরু করুন",
    homeExploreSubtitle: "অরুণাচল প্রদেশে একটি নিরবচ্ছিন্ন ও স্মরণীয় অভিজ্ঞতার জন্য সবকিছু এক জায়গায়।",
    learnMore: "আরও জানুন",
    featGuidesTitle: "নির্বাচিত ভ্রমণ গাইড",
    featGuidesDesc: "আমাদের বিস্তারিত সাংস্কৃতিক ও গন্তব্য গাইডের মাধ্যমে হিমালয়ের লুকানো রত্নগুলি অন্বেষণ করুন।",
    featHotelsTitle: "হোটেল বুকিং",
    featHotelsDesc: "পাহাড়ি রিসোর্ট থেকে উপত্যকার ইকো-স্টে পর্যন্ত অনন্য আবাসন খুঁজুন ও বুক করুন।",
    featTransportTitle: "পরিবহন সেবা",
    featTransportDesc: "পর্বতীয় পথে নিরাপদ যাতায়াতের জন্য নির্ভরযোগ্য গাড়ি ও বাইক ভাড়া।",
    featPermitTitle: "ইনার লাইন পারমিট",
    featPermitDesc: "AI সহায়তায় প্রয়োজনীয় ট্যুর পারমিটের জন্য নিরবচ্ছিন্ন ডিজিটাল আবেদন।",
    featSafetyTitle: "নিরাপত্তা ও জরুরি সেবা",
    featSafetyDesc: "রাজ্যজুড়ে নিকটতম চিকিৎসা সহায়তা ও থানা তাৎক্ষণিকভাবে খুঁজুন।",
    featItineraryTitle: "AI ভ্রমণসূচি",
    featItineraryDesc: "আমাদের AI আপনার আগ্রহ ও ভ্রমণের সময়কালের ভিত্তিতে আপনার নিখুঁত ভ্রমণ পরিকল্পনা করবে।",
    cultureTitle: "প্রাচীন সংস্কৃতির অভিজ্ঞতা নিন",
    cultureDesc: "সুবিশাল তাওয়াং মঠ থেকে জিরোতে আপাটানি উপজাতির প্রাণবন্ত উৎসব পর্যন্ত, অরুণাচল প্রদেশ এক অনন্য আধ্যাত্মিক ও সাংস্কৃতিক যাত্রা অফার করে।",
    majorTribes: "প্রধান উপজাতি",
    rareSpecies: "বিরল প্রজাতি",
    viewTravelGuides: "ভ্রমণ গাইড দেখুন",

    // SCROLLYTELLING SECTION
    stChapter1Badge: "অধ্যায় 01 · ভূদৃশ্য",
    stChapter1Title: "পৃথিবীর ছাদ",
    stChapter1Subtitle: "যেখানে হিমালয় আকাশ ছুঁয়েছে",
    stChapter1Body: "অরুণাচল প্রদেশ উপক্রান্তীয় সমভূমি থেকে ৭,০০০ মিটারের উপরে শৃঙ্গ পর্যন্ত বিস্তৃত। এটি এমন একটি ভূমি যেখানে নদীগুলি স্মৃতির চেয়ে পুরনো গিরিখাত খোদাই করেছে।",
    stChapter2Badge: "অধ্যায় 02 · ঐতিহ্য",
    stChapter2Title: "জীবন্ত ঐতিহ্য",
    stChapter2Subtitle: "শতাব্দীর বিশ্বাস ও উৎসব",
    stChapter2Body: "২৬টিরও বেশি স্বতন্ত্র উপজাতি তাদের ঐতিহ্য উজ্জীবিত উৎসব, প্রাচীন মঠ এবং প্রজন্মের পর প্রজন্ম ধরে চলে আসা মৌখিক ঐতিহ্যের মাধ্যমে উদযাপন করে।",
    stChapter3Badge: "অধ্যায় 03 · প্রকৃতি",
    stChapter3Title: "বন্য ও অদম্য",
    stChapter3Subtitle: "এক অনন্য জীববৈচিত্র্য কেন্দ্র",
    stChapter3Body: "নামদাফা টাইগার রিজার্ভে তুষার চিতা, মেঘচিতা এবং ১,০০০টিরও বেশি উদ্ভিদ প্রজাতি রয়েছে।",
    stChapter4Badge: "অধ্যায় 04 · অ্যাডভেঞ্চার",
    stChapter4Title: "আপনার গল্প শুরু হয়",
    stChapter4Subtitle: "লুকানো উপত্যকা, অসীম দিগন্ত",
    stChapter4Body: "রহস্যময় মেচুকা উপত্যকা থেকে উচ্চ-উচ্চতার ট্রেক এবং গর্জনশীল সিয়াং নদী পর্যন্ত, প্রতিটি বাঁকে একটি নতুন দৃশ্য উন্মোচিত হয়।",
    stStat1Label: "মিটার উচ্চতা",
    stStat2Label: "বনাবৃত এলাকা",
    stStat3Label: "আদিবাসী উপজাতি",
    stStat4Label: "বছরের ইতিহাস",
    stStat5Label: "পাখির প্রজাতি",
    stStat6Label: "উদ্ভিদ প্রজাতি",
    stStat7Label: "ট্রেকিং রুট",
    stStat8Label: "অ্যাডভেঞ্চার ক্যাম্প",
    stCTAButton: "আমার যাত্রা পরিকল্পনা করুন",
    stScrollHint: "দেখতে স্ক্রল করুন",

    // DESTINATIONS CAROUSEL
    popularDestinations: "জনপ্রিয় গন্তব্য",
    popularDestinationsSubtitle: "অরুণাচলের সবচেয়ে প্রিয় জায়গাগুলি অন্বেষণ করুন",
    exploreText: "অন্বেষণ করুন",
    destTawangTagline: "বৌদ্ধধর্মের মুকুটমণি",
    destZiroTagline: "ইউনেস্কো বিশ্ব ঐতিহ্য পরিদৃশ্য",
    destNamdaphaTagline: "জীববৈচিত্র্যের কেন্দ্র",
    destMechukaTagline: "লুকানো হিমালয়ী স্বর্গ",
    destSangtiTagline: "সারসের উপত্যকা",

    // GUIDES PAGE
    guidesPageTitle: "নির্বাচিত ভ্রমণ গাইড",
    guidesPageSubtitle: "অরুণাচল প্রদেশের সবচেয়ে আকর্ষণীয় গন্তব্য, উৎসব ও সাংস্কৃতিক অভিজ্ঞতায় বিশেষজ্ঞ অন্তর্দৃষ্টি।",
    readFullGuide: "সম্পূর্ণ গাইড পড়ুন",
    bestTimeLabel: "সেরা সময়",
    guideCTATitle: "আপনার হিমালয় যাত্রা শুরু করতে প্রস্তুত?",
    guideCTADesc: "এখনই আপনার ইনার লাইন পারমিটের জন্য আবেদন করুন এবং আমাদের AI সহকারীর সাথে আপনার অনন্য ভ্রমণসূচি পরিকল্পনা করা শুরু করুন।",
    applyForPermit: "পারমিটের জন্য আবেদন করুন",
    planItinerary: "ভ্রমণসূচি পরিকল্পনা করুন",
    guide1Title: "তাওয়াং: লুকানো স্বর্গ",
    guide1Category: "পর্বতীয় গন্তব্য",
    guide1Desc: "৪০০ বছরের পুরনো তাওয়াং মঠ, হিমায়িত হ্রদ এবং শান্তির আত্মা আবিষ্কার করুন।",
    guide2Title: "জিরো: সংগীত ও সংস্কৃতির প্রতিধ্বনি",
    guide2Category: "উপত্যকা / সাংস্কৃতিক",
    guide2Desc: "আপাটানি উপজাতির অনন্য টেকসই কৃষি এবং বিখ্যাত জিরো মিউজিক ফেস্টিভ্যাল অনুভব করুন।",
    guide3Title: "নামদফা: বন্য সীমান্ত",
    guide3Category: "বন্যপ্রাণী / প্রকৃতি",
    guide3Desc: "হিমালয়ের সবচেয়ে সমৃদ্ধ জীববৈচিত্র্যের একটি। বিরল মেঘচিতার বাসস্থান।",
    guide4Title: "পাসিঘাট: প্রবেশদ্বার শহর",
    guide4Category: "নদীতট / অ্যাডভেঞ্চার",
    guide4Desc: "সিয়াং নদীর তীরে অবস্থিত, হোয়াইট ওয়াটার রাফটিং ও নদী ক্যাম্পিংয়ের জন্য আদর্শ।",

    // HOTELS PAGE
    hotelsPageTitle: "শান্ত পরিবেশে থাকুন",
    hotelsPageSubtitle: "উদীয়মান সূর্যের ভূমিতে হস্তচয়িত আবাসন।",
    bookNow: "এখনই বুক করুন",
    perNight: "/রাত",

    // TRANSPORT PAGE
    transportPageTitle: "পর্বত-প্রস্তুত পরিবহন",
    transportPageSubtitle: "আমাদের নির্ভরযোগ্য SUV ও অ্যাডভেঞ্চার বাইকের বহর থেকে বেছে নিন, যা সহজে ও নিরাপদে হিমালয়ের আঁকাবাঁকা পথ পার করতে সক্ষম।",
    reserveNow: "এখনই রিজার্ভ করুন",
    gpsEnabled: "GPS সক্ষম",
    gpsDesc: "সমস্ত যানবাহনে দূরবর্তী এলাকার জন্য প্রি-লোডেড অফলাইন মানচিত্র রয়েছে।",
    fullyInsured: "সম্পূর্ণ বিমাকৃত",
    fullyInsuredDesc: "রোডসাইড সহায়তা সহ ব্যাপক বিমা কভারেজ।",
    verifiedDrivers: "যাচাইকৃত চালক",
    verifiedDriversDesc: "আমাদের চালকরা স্থানীয় এবং পাহাড়ি ড্রাইভিংয়ে বছরের অভিজ্ঞতাসম্পন্ন।",

    // SAFETY PAGE
    safetyPageTitle: "নিরাপত্তা ও সুরক্ষা",
    safetyPageSubtitle: "অরুণাচল প্রদেশজুড়ে জরুরি সেবা ও চিকিৎসা সহায়তায় দ্রুত প্রবেশাধিকার।",
    searchPlaceholder: "শহর দিয়ে খুঁজুন (যেমন তাওয়াং)...",
    hospitalsTab: "হাসপাতাল",
    policeTab: "থানা",
    emergencyHotline: "জরুরি হটলাইন",
    emergencySubtitle: "রাজ্যব্যাপী একীভূত জরুরি নম্বর",
    safeTravelTips: "নিরাপদ ভ্রমণ টিপস",
    safeTip1: "দূরবর্তী জেলায় পৌঁছানোর পর স্থানীয় থানায় আপনার যোগাযোগের বিবরণ নথিভুক্ত করুন।",
    safeTip2: "সর্বদা আপনার ইনার লাইন পারমিট (ILP) ও পরিচয় দলিলের হার্ড কপি বহন করুন।",
    safeTip3: "মোশন সিকনেস ও উচ্চতার ওষুধসহ একটি মৌলিক চিকিৎসা কিট সঙ্গে রাখুন।",
    active24x7: "২৪/৭ সক্রিয়",

    // ITINERARY PAGE
    itineraryPageTitle: "AI ভ্রমণসূচি পরিকল্পনাকারী",
    itineraryPageSubtitle: "অরুণাচল প্রদেশে আপনার স্বপ্নের অ্যাডভেঞ্চার তৈরি করুন। আমাদের AI বিশেষভাবে আপনার জন্য সেরা ভ্রমণ ও দৈনিক পরিকল্পনা সাজেস্ট করে।",
    yourPreferences: "আপনার পছন্দ",
    interestsLabel: "আপনার কী আগ্রহ?",
    durationLabel: "সময়কাল (দিন)",
    activitiesLabel: "কার্যক্রম (কমা দিয়ে আলাদা)",
    generateItinerary: "ভ্রমণসূচি তৈরি করুন",
    readyToPlan: "পরিকল্পনা করতে প্রস্তুত?",
    readyToPlanDesc: "বাম দিকে আপনার বিবরণ লিখুন এবং আমাদের AI আপনার জন্য একটি কাস্টম ট্রিপ তৈরি করবে।",
    mappingAdventure: "আপনার হিমালয় অভিযান পরিকল্পনা করা হচ্ছে...",
    takesMinute: "এটি এক মিনিট পর্যন্ত সময় নিতে পারে",

    // PERMIT PAGE
    permitPageTitle: "ইনার লাইন পারমিট (ILP) আবেদন",
    permitPageSubtitle: "অরুণাচল প্রদেশের প্রবেশ পারমিটের জন্য ডিজিটালি আবেদন করুন। দ্রুত অনুমোদনের জন্য আপনার পরিকল্পনা পর্যালোচনা করতে আমাদের AI সহকারী ব্যবহার করুন।",
    applicationForm: "আবেদন ফর্ম",
    allFieldsMandatory: "* চিহ্নিত সমস্ত ঘর প্রক্রিয়াকরণের জন্য আবশ্যক।",
    fullNameLabel: "পুরো নাম *",
    emailLabel: "ইমেইল *",
    travelStartLabel: "ভ্রমণ শুরুর তারিখ *",
    travelEndLabel: "ভ্রমণ শেষের তারিখ *",
    destinationsLabel: "পরিকল্পিত গন্তব্য *",
    destinationsHint: "আপনি যে সমস্ত জেলা/শহরে যাওয়ার পরিকল্পনা করছেন তা তালিকাভুক্ত করুন।",
    idTypeLabel: "পরিচয় প্রমাণের ধরন *",
    idNumberLabel: "পরিচয় দলিলের নম্বর *",
    acknowledgeLabel: "আমি অরুণাচল প্রদেশের সমস্ত স্থানীয় বিধিমালা ও নিরাপত্তা নির্দেশিকা মেনে চলতে সম্মত।",
    aiPreCheck: "AI পূর্ব-পরীক্ষা",
    submitApplication: "আবেদন জমা দিন",
    aiReviewTool: "AI পর্যালোচনা সরঞ্জাম",
    aiReviewFill: "ফর্ম পূরণ করুন এবং 'AI পূর্ব-পরীক্ষা' ক্লিক করুন আপনার আবেদনের সম্পূর্ণতা ও সম্মতি সম্পর্কে তাৎক্ষণিক মতামত পেতে।",
    reviewingPlan: "আপনার পরিকল্পনা পর্যালোচনা করা হচ্ছে...",
    analyzingAI: "AI দিয়ে বিশ্লেষণ করা হচ্ছে...",
    planComplete: "পরিকল্পনা সম্পূর্ণ দেখাচ্ছে!",
    actionRequired: "পদক্ষেপ প্রয়োজন",
    missingInfo: "অনুপস্থিত তথ্য:",
    issuesFound: "সমস্যা পাওয়া গেছে",
    suggestions: "পরামর্শ:",

    // TRIBES PAGE
    tribesPageTitle: "অরুণাচল প্রদেশের স্থানীয় উপজাতি",
    tribesPageSubtitle: "২৬+ আদিবাসী উপজাতির প্রাণবন্ত ঐতিহ্য, উৎসব এবং জীবনধারা আবিষ্কার করুন যা অরুণাচল প্রদেশকে ভারতের সবচেয়ে সাংস্কৃতিকভাবে সমৃদ্ধ রাজ্যগুলির মধ্যে একটি করে তোলে।",
    tribesRegionLabel: "অঞ্চল",
    tribesCultureLabel: "মূল ঐতিহ্য",
    tribe1Name: "আদি",
    tribe1Region: "পূর্ব ও পশ্চিম সিয়াং",
    tribe1Desc: "বৃহত্তম উপজাতিগুলির মধ্যে একটি, আদি তাদের ঐতিহ্যবাহী বুনন, সোলুং ও পোনুং উৎসব এবং সিয়াং নদী উপত্যকার সাথে গভীর সম্পর্কের জন্য বিখ্যাত।",
    tribe2Name: "আপাটানি",
    tribe2Region: "লোয়ার সুবানসিরি (জিরো)",
    tribe2Desc: "তাদের অনন্য ধান-মাছ চাষ পদ্ধতি ও নাক-প্লাগ ঐতিহ্যের জন্য বিখ্যাত, আপাটানিরা আইকনিক জিরো মিউজিক ফেস্টিভ্যালের আয়োজন করে।",
    tribe3Name: "ন্যিশি",
    tribe3Region: "পাপুম পারে ও পশ্চিম কামেং",
    tribe3Desc: "অরুণাচলের বৃহত্তম উপজাতি, ন্যিশি তাদের ন্যোকুম ইউলো উৎসব, হর্নবিল হেডগিয়ার এবং লোকসংগীতের জন্য পরিচিত।",
    tribe4Name: "মনপা",
    tribe4Region: "তাওয়াং ও পশ্চিম কামেং",
    tribe4Desc: "বৌদ্ধ ধর্মাবলম্বী মনপারা হাতবোনা কার্পেট, থাংকা চিত্রকলা ও ঐতিহ্যবাহী মুখোশের দক্ষ কারিগর।",
    tribe5Name: "ওয়ানচো",
    tribe5Region: "লংডিং জেলা",
    tribe5Desc: "ওয়ানচোরা দক্ষ কাঠখোদাই শিল্পী ও বুননকারী। তাদের মোরুং ঐতিহ্য, ট্যাটু সংস্কৃতি ও রঙিন ঐতিহ্যবাহী পোশাক তাদের বৈশিষ্ট্য।",
    tribe6Name: "গালো",
    tribe6Region: "পশ্চিম সিয়াং",
    tribe6Desc: "মোপিন উৎসবের জন্য পরিচিত গালোরা ঝুম চাষে পারদর্শী এবং ঐতিহ্যবাহী চিকিৎসা, বুনন ও সম্প্রদায় পরিচালনায় দক্ষ।",
    discoverTribes: "তাদের গল্প জানুন",

    // ENTREPRENEURS PAGE
    entrepreneursPageTitle: "অরুণাচল প্রদেশের উদ্যোক্তা",
    entrepreneursPageSubtitle: "উদীয়মান সূর্যের ভূমির সেই উদ্ভাবক ও পরিবর্তনকারীদের সাথে পরিচিত হন যারা ব্যবসা গড়ছেন এবং পরবর্তী প্রজন্মকে অনুপ্রাণিত করছেন।",
    entrepreneurSectorLabel: "খাত",
    entrepreneur1Name: "হাগে লেকি",
    entrepreneur1Venture: "অরুণাচল ইকো ট্রেইলস",
    entrepreneur1Sector: "ইকোট্যুরিজম ও আতিথেয়তা",
    entrepreneur1Desc: "রাজ্যের অগ্রণী ইকো-ট্যুরিজম নেটওয়ার্ক প্রতিষ্ঠা করেছেন যা প্রত্যন্ত হিমালয়ী গ্রামগুলিকে দায়িত্বশীল ভ্রমণকারীদের সাথে সংযুক্ত করে।",
    entrepreneur2Name: "ওজিং তাসিং",
    entrepreneur2Venture: "নর্থইস্ট ডিজিটাল হাব",
    entrepreneur2Sector: "প্রযুক্তি ও স্টার্টআপ",
    entrepreneur2Desc: "অঞ্চলের প্রথম ডিজিটাল পরিষেবা স্টার্টআপ চালু করেছেন এবং শত শত তরুণকে ডিজিটাল দক্ষতায় প্রশিক্ষণ দিয়েছেন।",
    entrepreneur3Name: "বেংগিয়া তোলুম",
    entrepreneur3Venture: "আদি উইভস",
    entrepreneur3Sector: "হস্তশিল্প ও কারুশিল্প",
    entrepreneur3Desc: "ঐতিহ্যবাহী আদি বুনন এবং সমসাময়িক ফ্যাশনের মিশেলে ২০০টিরও বেশি আদিবাসী নারী কারিগরকে ক্ষমতায়িত করেছেন।",
    entrepreneur4Name: "তারা সাইকিয়া",
    entrepreneur4Venture: "হিমালয়ান অর্গানিক্স",
    entrepreneur4Sector: "জৈব চাষ ও খাদ্য",
    entrepreneur4Desc: "রাজ্যের প্রথম প্রত্যয়িত জৈব কৃষি সমবায় প্রতিষ্ঠা করেছেন যা জাতীয় বাজারে রাসায়নিক-মুক্ত পণ্য সরবরাহ করে।",
    meetEntrepreneurs: "তাদের গল্প পড়ুন",

    // HOME – TRIBES & ENTREPRENEURS SECTION
    homeCultureSectionTitle: "মানুষ ও ঐতিহ্য",
    homeCultureSectionSubtitle: "অরুণাচল প্রদেশের আত্মা তার অসাধারণ মানুষদের মধ্যে — প্রাচীন উপজাতি ও আধুনিক উদ্যোক্তা।",
    featTribesTitle: "স্থানীয় উপজাতি",
    featTribesDesc: "২৬+ আদিবাসী উপজাতির সমৃদ্ধ সাংস্কৃতিক বৈচিত্র্য অন্বেষণ করুন, যাদের প্রত্যেকের রয়েছে অনন্য উৎসব, কারুশিল্প ও ঐতিহ্য।",
    featEntrepreneursTitle: "উদ্যোক্তা",
    featEntrepreneursDesc: "অরুণাচল প্রদেশের সেই উদ্ভাবকদের সাথে পরিচিত হন যারা ব্যবসা গড়ছেন এবং পরবর্তী প্রজন্মকে অনুপ্রাণিত করছেন।",
    exploreTribes: "উপজাতি জানুন",
    exploreEntrepreneurs: "উদ্যোক্তাদের সাথে মিলুন",
  },

  as: {
    // NAV
    guides: "গাইড",
    hotels: "হোটেল",
    transport: "পৰিবহন",
    permit: "পাৰমিট",
    itinerary: "ভ্ৰমণসূচী",
    safety: "সুৰক্ষা",
    tribes: "জনজাতি",
    entrepreneurs: "উদ্যোক্তা",
    signIn: "লগ ইন",
    signUp: "চাইন আপ",
    signOut: "চাইন আউট",
    myAccount: "মোৰ একাউণ্ট",
    languageLabel: "অসমীয়া",
    navExplore: "অন্বেষণ",
    navPlan: "পৰিকল্পনা",
    navEssentials: "আৱশ্যকীয়",
    navGuidesDesc: "১৪টি পৰ্যটন চাৰ্কিট আৰু গন্তব্য গাইড",
    navTribesDesc: "২৬+ জনজাতীয় সম্প্ৰদায়ৰ পৰিচয়",
    navEntrepreneursDesc: "স্থানীয় ব্যৱসায় আৰু অভিজ্ঞতা",
    navItineraryDesc: "AI-চালিত ভ্ৰমণ পৰিকল্পনা",
    navHotelsDesc: "সকলো চাৰ্কিটত আৱাসন",
    navTransportDesc: "4×4, বাইক আৰু APST বাছ ৰুট",
    navPermitIndianLabel: "ভাৰতীয় নাগৰিক — ILP",
    navPermitIndianDesc: "ইনাৰ লাইন পাৰমিট (e-ILP)",
    navPermitForeignLabel: "বিদেশী নাগৰিক — PAP",
    navPermitForeignDesc: "সুৰক্ষিত এলেকা পাৰমিট",
    navSafetyDesc: "জিলাভিত্তিক জৰুৰী যোগাযোগ",
    navAdventures: "অভিযান",
    navResources: "সম্পদ",
    navAccount: "একাউণ্ট",
    navWildlifeLabel: "বন্যপ্ৰাণী আৰু প্ৰকৃতি",
    navWildlifeDesc: "হিমালয়ৰ অৰণ্যত বিৰল প্ৰজাতি",
    navEventsLabel: "উৎসৱ আৰু অনুষ্ঠান",
    navEventsDesc: "জনজাতীয় উৎসৱ আৰু সাংস্কৃতিক অনুষ্ঠান",
    navHeritageLabel: "ঐতিহ্য আৰু আধ্যাত্মিক",
    navHeritageDesc: "মঠ, যুদ্ধ স্মাৰক আৰু পৱিত্ৰ স্থান",
    navTrekkingLabel: "ট্ৰেকিং",
    navTrekkingDesc: "দূৰৱৰ্তী উপত্যকাত উচ্চতাৰ পথ",
    navRaftingLabel: "নদী ৰাফটিং",
    navRaftingDesc: "চিয়াং আৰু কামেংত গ্ৰেড IV+ ৰেপিড",
    navAnglingLabel: "মাছ ধৰা",
    navAnglingDesc: "বিশুদ্ধ নদীত বিশ্বমানৰ মহাশীৰ মাছ ধৰা",
    navParaglidingLabel: "পেৰাগ্লাইডিং",
    navParaglidingDesc: "পূব হিমালয়ৰ ওপৰেদি উৰণ",
    navAllActivitiesLabel: "সকলো কাৰ্যকলাপ",
    navAllActivitiesDesc: "সম্পূৰ্ণ অভিযান কেন্দ্ৰ চাওক",
    navAiTripBuilderLabel: "AI ভ্ৰমণ নিৰ্মাতা",
    navAiTripBuilderDesc: "Genkit-চালিত ব্যক্তিগতকৃত ভ্ৰমণ পৰিকল্পনা",
    navDistrictMapLabel: "জিলা মানচিত্ৰ",
    navDistrictMapDesc: "সকলো ২৬টি জিলাৰ ইন্টাৰেক্টিভ মানচিত্ৰ",
    navArrivalFormalitiesLabel: "আগমনৰ আনুষ্ঠানিকতা",
    navArrivalFormalitiesDesc: "ILP আৰু PAP পাৰমিটৰ সংক্ষিপ্তসাৰ",
    navSmartIlpCheckLabel: "স্মাৰ্ট ILP প্ৰি-চেক",
    navSmartIlpCheckDesc: "AI-চালিত পাৰমিট প্ৰয়োজনীয়তা পৰীক্ষক",
    navEguidesLabel: "ই-গাইড আৰু ব্ৰোচাৰ",
    navEguidesDesc: "চৰকাৰী PDF ভ্ৰমণ গাইড ডাউনলোড কৰক",
    navFactsLabel: "AP সম্পৰ্কে তথ্য",
    navFactsDesc: "ভূগোল, সংস্কৃতি আৰু দৰ্শনাৰ্থীৰ তথ্য",
    navVideoGalleryLabel: "ভিডিঅ' গেলেৰী",
    navVideoGalleryDesc: "প্ৰকৃতি আৰু সংস্কৃতিৰ ভিডিঅ'",
    navNewsletterLabel: "নিউজলেটাৰ",
    navNewsletterDesc: "ঋতু পৰামৰ্শ, উৎসৱৰ তাৰিখ আৰু নতুন গাইড",
    navSavedTripsLabel: "সংৰক্ষিত ভ্ৰমণ",
    navSavedTripsDesc: "আপোনাৰ বুকমাৰ্ক কৰা ভ্ৰমণসূচি — পৰ্যায় ২",
    navPermitTrackerLabel: "পাৰমিট ট্ৰেকাৰ",
    navPermitTrackerDesc: "ILP/PAP স্থিতি ট্ৰেক কৰক — পৰ্যায় ২",
    navProfilePrefsLabel: "প্ৰফাইল আৰু পছন্দ",
    navProfilePrefsDesc: "একাউণ্ট ছেটিং — পৰ্যায় ২",

    // FOOTER
    footerTagline: "উদীয়মান সূৰ্যৰ ভূমি আৱিষ্কাৰ কৰক। অৰুণাচল প্ৰদেশৰ অতুলনীয় প্ৰাকৃতিক সৌন্দৰ্য আৰু সমৃদ্ধ সাংস্কৃতিক ঐতিহ্য উপভোগ কৰক।",
    footerQuickLinks: "দ্ৰুত সংযোগ",
    footerTravelGuides: "ভ্ৰমণ গাইড",
    footerHotelBooking: "হোটেল বুকিং",
    footerTransportServices: "পৰিবহন সেৱা",
    footerApplyPermit: "পাৰমিটৰ বাবে আবেদন কৰক",
    footerSupport: "সহায়",
    footerSafety: "নিৰাপত্তা আৰু সুৰক্ষা",
    footerFaqs: "সাধাৰণ প্ৰশ্ন",
    footerContactUs: "আমাৰ সৈতে যোগাযোগ কৰক",
    footerPrivacyPolicy: "গোপনীয়তা নীতি",
    footerConnect: "সংযোগ কৰক",
    footerCopyright: "© 2026 অৰুণাচল প্ৰদেশ পৰ্যটন বিভাগ। সকলো অধিকাৰ সংৰক্ষিত।",

    // HERO CAROUSEL
    heroSlide1Headline: "অৰুণাচল প্ৰদেশ",
    heroSlide1Subline: "উদীয়মান সূৰ্যৰ ভূমি",
    heroSlide1Tagline: "অস্পৃশ্ট প্ৰকৃতি, জীৱন্ত সংস্কৃতি, শান্ত বিহাৰ।",
    heroSlide2Headline: "বিশাল হিমালয়",
    heroSlide2Subline: "য'ত আকাশ পৃথিৱীক স্পৰ্শ কৰে",
    heroSlide2Tagline: "পৃথিৱীৰ চাল পাৰ হৈ অজানালৈ যাত্ৰা।",
    heroSlide3Headline: "সেউজীয়া উপত্যকা",
    heroSlide3Subline: "প্ৰকৃতিৰ অস্পৃষ্ট স্বৰ্গ",
    heroSlide3Tagline: "ঘন অৰণ্য, নদী আৰু লুকাই থকা ৰত্ন আৱিষ্কাৰ কৰক।",
    heroSlide4Headline: "প্ৰাচীন বিহাৰ",
    heroSlide4Subline: "এক আধ্যাত্মিক যাত্ৰা",
    heroSlide4Tagline: "বৌদ্ধ সংস্কৃতি আৰু ঐতিহ্যৰ শতিকাৰ অনুভৱ কৰক।",
    getYourPermit: "আপোনাৰ পাৰমিট লওক",
    planMyTrip: "মোৰ যাত্ৰা পৰিকল্পনা কৰক",

    // HOME PAGE
    homeExploreTitle: "আপোনাৰ অন্বেষণ আৰম্ভ কৰক",
    homeExploreSubtitle: "অৰুণাচল প্ৰদেশত এক নিৰৱচ্ছিন্ন আৰু স্মৰণীয় অভিজ্ঞতাৰ বাবে সকলো এঠাইত।",
    learnMore: "অধিক জানক",
    featGuidesTitle: "নিৰ্বাচিত ভ্ৰমণ গাইড",
    featGuidesDesc: "আমাৰ বিস্তাৰিত সাংস্কৃতিক আৰু গন্তব্য গাইডৰ জৰিয়তে হিমালয়ৰ লুকাই থকা ৰত্নসমূহ অন্বেষণ কৰক।",
    featHotelsTitle: "হোটেল বুকিং",
    featHotelsDesc: "পাহাৰীয়া ৰিজৰ্টৰ পৰা উপত্যকাৰ ইকো-ষ্টে পৰ্যন্ত অনন্য আবাসন বিচাৰি বুক কৰক।",
    featTransportTitle: "পৰিবহন সেৱা",
    featTransportDesc: "পাহাৰীয়া পথত নিৰাপদ যাতায়াতৰ বাবে নিৰ্ভৰযোগ্য গাড়ী আৰু বাইক ভাড়া।",
    featPermitTitle: "ইনাৰ লাইন পাৰমিট",
    featPermitDesc: "AI সহায়তাৰে প্ৰয়োজনীয় টুৰ পাৰমিটৰ বাবে নিৰৱচ্ছিন্ন ডিজিটেল আবেদন।",
    featSafetyTitle: "নিৰাপত্তা আৰু জৰুৰীকালীন",
    featSafetyDesc: "ৰাজ্যজুৰি নিকটতম চিকিৎসা সহায় আৰু আৰক্ষী থানা তৎক্ষণাৎ বিচাৰক।",
    featItineraryTitle: "AI ভ্ৰমণসূচী",
    featItineraryDesc: "আমাৰ AI আপোনাৰ আগ্ৰহ আৰু ভ্ৰমণৰ সময়সীমাৰ ভিত্তিত আপোনাৰ নিখুঁত যাত্ৰা পৰিকল্পনা কৰিব।",
    cultureTitle: "প্ৰাচীন সংস্কৃতিৰ অনুভৱ কৰক",
    cultureDesc: "বিশাল তাৱাং বিহাৰৰ পৰা জিৰোৰ আপাটানি জনজাতিৰ জীৱন্ত উৎসৱলৈকে, অৰুণাচল প্ৰদেশে এক অনন্য আধ্যাত্মিক আৰু সাংস্কৃতিক যাত্ৰা প্ৰদান কৰে।",
    majorTribes: "প্ৰধান জনজাতি",
    rareSpecies: "বিৰল প্ৰজাতি",
    viewTravelGuides: "ভ্ৰমণ গাইড চাওক",

    // SCROLLYTELLING SECTION
    stChapter1Badge: "অধ্যায় 01 · ভূ-দৃশ্য",
    stChapter1Title: "পৃথিৱীৰ চাল",
    stChapter1Subtitle: "য'ত হিমালয় আকাশ স্পৰ্শ কৰে",
    stChapter1Body: "অৰুণাচল প্ৰদেশ উষ্ণকটিবন্ধীয় সমতলভূমিৰ পৰা ৭,০০০ মিটাৰৰ ওপৰৰ শিখৰলৈ বিস্তৃত। এয়া এনে এখন ভূমি য'ত নৈবোৰে স্মৃতিতকৈও পুৰণি গিৰিখাত খান্দিছে।",
    stChapter2Badge: "অধ্যায় 02 · ঐতিহ্য",
    stChapter2Title: "জীৱন্ত পৰম্পৰা",
    stChapter2Subtitle: "শতিকাৰ বিশ্বাস আৰু উৎসৱ",
    stChapter2Body: "২৬টাতকৈও অধিক পৃথক জনজাতিয়ে তেওঁলোকৰ ঐতিহ্য জীৱন্ত উৎসৱ, প্ৰাচীন বিহাৰ আৰু প্ৰজন্মৰ পিছত প্ৰজন্ম ধৰি চলি অহা মৌখিক পৰম্পৰাৰ জৰিয়তে উদযাপন কৰে।",
    stChapter3Badge: "অধ্যায় 03 · প্ৰকৃতি",
    stChapter3Title: "বনৰীয়া আৰু অদম্য",
    stChapter3Subtitle: "এক অনন্য জীৱবৈচিত্ৰ্যৰ কেন্দ্ৰ",
    stChapter3Body: "নামদাফা ব্যাঘ্ৰ সংৰক্ষিত অৰণ্যত তুষাৰ চিতা, মেঘ চিতা আৰু ১,০০০তকৈও অধিক উদ্ভিদ প্ৰজাতি আছে।",
    stChapter4Badge: "অধ্যায় 04 · অভিযান",
    stChapter4Title: "আপোনাৰ কাহিনী আৰম্ভ হয়",
    stChapter4Subtitle: "লুকাই থকা উপত্যকা, অসীম দিগন্ত",
    stChapter4Body: "ৰহস্যময় মেচুকা উপত্যকাৰ পৰা উচ্চতাৰ ট্ৰেক আৰু গৰ্জনশীল চিয়াং নৈলৈকে, প্ৰতিটো বাঁকে এক নতুন দৃশ্য উন্মোচন কৰে।",
    stStat1Label: "মিটাৰ উচ্চতা",
    stStat2Label: "বনাচ্ছাদিত এলেকা",
    stStat3Label: "আদিবাসী জনজাতি",
    stStat4Label: "বছৰৰ ইতিহাস",
    stStat5Label: "পক্ষী প্ৰজাতি",
    stStat6Label: "উদ্ভিদ প্ৰজাতি",
    stStat7Label: "ট্ৰেকিং পথ",
    stStat8Label: "অভিযান শিবিৰ",
    stCTAButton: "মোৰ যাত্ৰা পৰিকল্পনা কৰক",
    stScrollHint: "দেখিবলৈ স্ক্ৰল কৰক",

    // DESTINATIONS CAROUSEL
    popularDestinations: "জনপ্ৰিয় গন্তব্য",
    popularDestinationsSubtitle: "অৰুণাচলৰ সবচেয়ে প্ৰিয় ঠাইবোৰ অন্বেষণ কৰক",
    exploreText: "অন্বেষণ কৰক",
    destTawangTagline: "বৌদ্ধধৰ্মৰ মুকুটমণি",
    destZiroTagline: "ইউনেস্কো ঐতিহ্য পৰিদৃশ্য",
    destNamdaphaTagline: "জৈৱবৈচিত্ৰ্যৰ কেন্দ্ৰ",
    destMechukaTagline: "লুকোৱা হিমালয়ী স্বৰ্গ",
    destSangtiTagline: "সাৰসৰ উপত্যকা",

    // GUIDES PAGE
    guidesPageTitle: "নিৰ্বাচিত ভ্ৰমণ গাইড",
    guidesPageSubtitle: "অৰুণাচল প্ৰদেশৰ আটাইতকৈ আকৰ্ষণীয় গন্তব্য, উৎসৱ আৰু সাংস্কৃতিক অভিজ্ঞতাত বিশেষজ্ঞ অন্তৰ্দৃষ্টি।",
    readFullGuide: "সম্পূৰ্ণ গাইড পঢ়ক",
    bestTimeLabel: "সৰ্বোত্তম সময়",
    guideCTATitle: "আপোনাৰ হিমালয় যাত্ৰা আৰম্ভ কৰিবলৈ সাজু?",
    guideCTADesc: "এতিয়াই আপোনাৰ ইনাৰ লাইন পাৰমিটৰ বাবে আবেদন কৰক আৰু আমাৰ AI সহকাৰীৰ সৈতে আপোনাৰ অনন্য ভ্ৰমণসূচী পৰিকল্পনা আৰম্ভ কৰক।",
    applyForPermit: "পাৰমিটৰ বাবে আবেদন কৰক",
    planItinerary: "ভ্ৰমণসূচী পৰিকল্পনা কৰক",
    guide1Title: "তাৱাং: লুকোৱা স্বৰ্গ",
    guide1Category: "পাহাৰীয়া গন্তব্য",
    guide1Desc: "৪০০ বছৰীয়া তাৱাং বিহাৰ, হিমায়িত হ্ৰদ আৰু শান্তিৰ আত্মা আৱিষ্কাৰ কৰক।",
    guide2Title: "জিৰো: সংগীত আৰু সংস্কৃতিৰ প্ৰতিধ্বনি",
    guide2Category: "উপত্যকা / সাংস্কৃতিক",
    guide2Desc: "আপাটানি জনজাতিৰ অনন্য টেকসই কৃষি আৰু বিখ্যাত জিৰো সংগীত উৎসৱ অনুভৱ কৰক।",
    guide3Title: "নামদফা: বনজ সীমান্ত",
    guide3Category: "বন্যপ্ৰাণী / প্ৰকৃতি",
    guide3Desc: "হিমালয়ৰ আটাইতকৈ সমৃদ্ধ জৈৱবৈচিত্ৰ্যৰ একটো। বিৰল মেঘচিতাৰ বাসস্থান।",
    guide4Title: "পাচিঘাট: প্ৰৱেশদ্বাৰ নগৰ",
    guide4Category: "নদীতট / অভিযান",
    guide4Desc: "চিয়াং নদীৰ পাৰত অৱস্থিত, হোৱাইট ৱাটাৰ ৰাফটিং আৰু নদী কেম্পিঙৰ বাবে আদৰ্শ।",

    // HOTELS PAGE
    hotelsPageTitle: "শান্ত পৰিৱেশত থাকক",
    hotelsPageSubtitle: "উদীয়মান সূৰ্যৰ ভূমিত হস্তচয়িত আবাসন।",
    bookNow: "এতিয়াই বুক কৰক",
    perNight: "/ৰাতি",

    // TRANSPORT PAGE
    transportPageTitle: "পাহাৰ-প্ৰস্তুত পৰিবহন",
    transportPageSubtitle: "আমাৰ নিৰ্ভৰযোগ্য SUV আৰু অভিযান বাইকৰ বহৰৰ পৰা বাছক, যি সহজে আৰু নিৰাপদে হিমালয়ৰ আঁকোৰা-গোঁজা পথ পাৰ কৰিব পাৰে।",
    reserveNow: "এতিয়াই সংৰক্ষণ কৰক",
    gpsEnabled: "GPS সক্ষম",
    gpsDesc: "সকলো বাহনত দূৰৱৰ্তী অঞ্চলৰ বাবে প্ৰি-লোডেড অফলাইন মানচিত্ৰ আছে।",
    fullyInsured: "সম্পূৰ্ণ বিমাকৃত",
    fullyInsuredDesc: "ৰোডচাইড সহায়তাসহ ব্যাপক বিমা কভাৰেজ।",
    verifiedDrivers: "যাচাইকৃত চালক",
    verifiedDriversDesc: "আমাৰ চালকসকল স্থানীয় আৰু পাহাৰীয়া ড্ৰাইভিঙত বছৰৰ অভিজ্ঞতাসম্পন্ন।",

    // SAFETY PAGE
    safetyPageTitle: "নিৰাপত্তা আৰু সুৰক্ষা",
    safetyPageSubtitle: "অৰুণাচল প্ৰদেশজুৰি জৰুৰীকালীন সেৱা আৰু চিকিৎসা সহায়ত দ্ৰুত প্ৰৱেশাধিকাৰ।",
    searchPlaceholder: "নগৰৰে সন্ধান কৰক (যেনে তাৱাং)...",
    hospitalsTab: "চিকিৎসালয়",
    policeTab: "আৰক্ষী থানা",
    emergencyHotline: "জৰুৰীকালীন হটলাইন",
    emergencySubtitle: "ৰাজ্যব্যাপী একীভূত জৰুৰীকালীন নম্বৰ",
    safeTravelTips: "নিৰাপদ ভ্ৰমণ পৰামৰ্শ",
    safeTip1: "দূৰৱৰ্তী জিলাত উপস্থিত হোৱাৰ পাছত স্থানীয় আৰক্ষী থানাত আপোনাৰ যোগাযোগৰ বিৱৰণ নথিভুক্ত কৰক।",
    safeTip2: "সদায় আপোনাৰ ইনাৰ লাইন পাৰমিট (ILP) আৰু পৰিচয় দস্তাবেজৰ হাৰ্ড কপি বহন কৰক।",
    safeTip3: "মোচন চিকনেছ আৰু উচ্চতাৰ দৰৱসহ এটা মৌলিক চিকিৎসা কিট সঙ্গে ৰাখক।",
    active24x7: "২৪/৭ সক্ৰিয়",

    // ITINERARY PAGE
    itineraryPageTitle: "AI ভ্ৰমণসূচী পৰিকল্পনাকাৰী",
    itineraryPageSubtitle: "অৰুণাচল প্ৰদেশত আপোনাৰ সপোনৰ অভিযান তৈয়াৰ কৰক। আমাৰ AI বিশেষভাৱে আপোনাৰ বাবে সৰ্বোত্তম যাত্ৰা আৰু দৈনিক পৰিকল্পনা পৰামৰ্শ দিয়ে।",
    yourPreferences: "আপোনাৰ পছন্দ",
    interestsLabel: "আপোনাৰ কি আগ্ৰহ?",
    durationLabel: "সময়সীমা (দিন)",
    activitiesLabel: "কাৰ্যক্ৰম (কমাৰে পৃথক)",
    generateItinerary: "ভ্ৰমণসূচী তৈয়াৰ কৰক",
    readyToPlan: "পৰিকল্পনা কৰিবলৈ সাজু?",
    readyToPlanDesc: "বাওঁ দিশত আপোনাৰ বিৱৰণ দিয়ক আৰু আমাৰ AI আপোনাৰ বাবে এটা কাস্টম যাত্ৰা তৈয়াৰ কৰিব।",
    mappingAdventure: "আপোনাৰ হিমালয় অভিযান পৰিকল্পনা কৰা হৈছে...",
    takesMinute: "ইয়াত এক মিনিট পৰ্যন্ত সময় লাগিব পাৰে",

    // PERMIT PAGE
    permitPageTitle: "ইনাৰ লাইন পাৰমিট (ILP) আবেদন",
    permitPageSubtitle: "অৰুণাচল প্ৰদেশৰ প্ৰৱেশ পাৰমিটৰ বাবে ডিজিটেলি আবেদন কৰক। দ্ৰুত অনুমোদনৰ বাবে আপোনাৰ পৰিকল্পনা পৰ্যালোচনা কৰিবলৈ আমাৰ AI সহকাৰী ব্যৱহাৰ কৰক।",
    applicationForm: "আবেদন ফৰ্ম",
    allFieldsMandatory: "* চিহ্নিত সকলো ঘৰ প্ৰক্ৰিয়াকৰণৰ বাবে আৱশ্যকীয়।",
    fullNameLabel: "সম্পূৰ্ণ নাম *",
    emailLabel: "ইমেইল *",
    travelStartLabel: "ভ্ৰমণ আৰম্ভৰ তাৰিখ *",
    travelEndLabel: "ভ্ৰমণ সমাপ্তিৰ তাৰিখ *",
    destinationsLabel: "পৰিকল্পিত গন্তব্য *",
    destinationsHint: "আপুনি ভ্ৰমণ কৰিব পৰিকল্পনা কৰা সকলো জিলা/চহৰৰ তালিকা দিয়ক।",
    idTypeLabel: "পৰিচয় প্ৰমাণৰ ধৰণ *",
    idNumberLabel: "পৰিচয় দস্তাবেজ নম্বৰ *",
    acknowledgeLabel: "মই অৰুণাচল প্ৰদেশৰ সকলো স্থানীয় বিধি আৰু নিৰাপত্তা নিৰ্দেশিকা মানিবলৈ সন্মত।",
    aiPreCheck: "AI পূৰ্ব-পৰীক্ষা",
    submitApplication: "আবেদন জমা দিয়ক",
    aiReviewTool: "AI পৰ্যালোচনা সঁজুলি",
    aiReviewFill: "ফৰ্ম পূৰণ কৰক আৰু 'AI পূৰ্ব-পৰীক্ষা' ক্লিক কৰক আপোনাৰ আবেদনৰ সম্পূৰ্ণতা আৰু সম্মতি সম্পৰ্কে তৎক্ষণাৎ মতামত পাবলৈ।",
    reviewingPlan: "আপোনাৰ পৰিকল্পনা পৰ্যালোচনা কৰা হৈছে...",
    analyzingAI: "AI-এ বিশ্লেষণ কৰা হৈছে...",
    planComplete: "পৰিকল্পনা সম্পূৰ্ণ দেখাইছে!",
    actionRequired: "পদক্ষেপ প্ৰয়োজন",
    missingInfo: "অনুপস্থিত তথ্য:",
    issuesFound: "সমস্যা পোৱা গৈছে",
    suggestions: "পৰামৰ্শ:",

    // TRIBES PAGE
    tribesPageTitle: "অৰুণাচল প্ৰদেশৰ স্থানীয় জনজাতি",
    tribesPageSubtitle: "২৬+ আদিবাসী জনজাতিৰ জীৱন্ত পৰম্পৰা, উৎসৱ আৰু জীৱনধাৰা আৱিষ্কাৰ কৰক যি অৰুণাচল প্ৰদেশক ভাৰতৰ অন্যতম সাংস্কৃতিকভাৱে সমৃদ্ধ ৰাজ্য কৰি তোলে।",
    tribesRegionLabel: "অঞ্চল",
    tribesCultureLabel: "মূল পৰম্পৰা",
    tribe1Name: "আদি",
    tribe1Region: "পূব আৰু পশ্চিম চিয়াং",
    tribe1Desc: "বৃহত্তম জনজাতিসমূহৰ এটা, আদি তেওঁলোকৰ পৰম্পৰাগত বুনন, চোলুং আৰু পোনুং উৎসৱ আৰু চিয়াং নদী উপত্যকাৰ সৈতে গভীৰ সম্পৰ্কৰ বাবে বিখ্যাত।",
    tribe2Name: "আপাটানি",
    tribe2Region: "লোৱাৰ চুবানচিৰি (জিৰো)",
    tribe2Desc: "তেওঁলোকৰ অনন্য ধান-মাছ খেতি পদ্ধতি আৰু নাক-প্লাগ পৰম্পৰাৰ বাবে বিখ্যাত, আপাটানিসকলে আইকনিক জিৰো সংগীত উৎসৱৰ আয়োজন কৰে।",
    tribe3Name: "ন্যিশি",
    tribe3Region: "পাপুম পাৰে আৰু পশ্চিম কামেং",
    tribe3Desc: "অৰুণাচলৰ বৃহত্তম জনজাতি, ন্যিশি তেওঁলোকৰ ন্যোকুম ইউল্লো উৎসৱ, হৰ্নবিল হেডগিয়াৰ আৰু লোক সংগীতৰ বাবে পৰিচিত।",
    tribe4Name: "মনপা",
    tribe4Region: "তাৱাং আৰু পশ্চিম কামেং",
    tribe4Desc: "বৌদ্ধ ধৰ্মাৱলম্বী মনপাসকল হাতৰে বোৱা কাৰ্পেট, থাংকা চিত্ৰকলা আৰু পৰম্পৰাগত মুখা নিৰ্মাণৰ দক্ষ কাৰিগৰ।",
    tribe5Name: "ৱাঞ্চো",
    tribe5Region: "লংডিং জিলা",
    tribe5Desc: "ৱাঞ্চোসকল দক্ষ কাঠখোদাই শিল্পী আৰু বোৱালী। তেওঁলোকৰ মোৰুং পৰম্পৰা, টেটু সংস্কৃতি আৰু ৰঙীন পৰম্পৰাগত পোছাক তেওঁলোকৰ বৈশিষ্ট্য।",
    tribe6Name: "গালো",
    tribe6Region: "পশ্চিম চিয়াং",
    tribe6Desc: "মোপিন উৎসৱৰ বাবে পৰিচিত গালোসকল ঝুম খেতিত পাৰদৰ্শী আৰু পৰম্পৰাগত চিকিৎসা, বুনন আৰু সমাজ পৰিচালনাত দক্ষ।",
    discoverTribes: "তেওঁলোকৰ কাহিনী জানক",

    // ENTREPRENEURS PAGE
    entrepreneursPageTitle: "অৰুণাচল প্ৰদেশৰ উদ্যোক্তা",
    entrepreneursPageSubtitle: "উদীয়মান সূৰ্যৰ ভূমিৰ সেই উদ্ভাৱক আৰু পৰিৱৰ্তনকাৰীসকলক লগ কৰক যি ব্যৱসায় গঢ়িছে আৰু পৰৱৰ্তী প্ৰজন্মক অনুপ্ৰাণিত কৰিছে।",
    entrepreneurSectorLabel: "খণ্ড",
    entrepreneur1Name: "হাগে লেকি",
    entrepreneur1Venture: "অৰুণাচল ইকো ট্ৰেইলছ",
    entrepreneur1Sector: "ইকোট্যুৰিজম আৰু আতিথ্য",
    entrepreneur1Desc: "ৰাজ্যৰ অগ্ৰণী ইকো-ট্যুৰিজম নেটৱৰ্ক প্ৰতিষ্ঠা কৰিছে যি দূৰৱৰ্তী হিমালয়ী গাঁৱসমূহক দায়িত্বশীল ভ্ৰমণকাৰীৰ সৈতে সংযুক্ত কৰে।",
    entrepreneur2Name: "অজিং তাছিং",
    entrepreneur2Venture: "নৰ্থইষ্ট ডিজিটেল হাব",
    entrepreneur2Sector: "প্ৰযুক্তি আৰু ষ্টাৰ্টআপ",
    entrepreneur2Desc: "অঞ্চলৰ প্ৰথম ডিজিটেল সেৱা ষ্টাৰ্টআপ আৰম্ভ কৰিছে আৰু শতাধিক যুৱকক ডিজিটেল দক্ষতাত প্ৰশিক্ষণ দিছে।",
    entrepreneur3Name: "বেংগিয়া তোলুম",
    entrepreneur3Venture: "আদি ৱিভছ",
    entrepreneur3Sector: "হাতৰ কাম আৰু শিল্প",
    entrepreneur3Desc: "পৰম্পৰাগত আদি বুনন আৰু সমসাময়িক ফেশ্বনৰ মিশ্ৰণেৰে ২০০ৰো অধিক আদিবাসী মহিলা কাৰিগৰক ক্ষমতায়িত কৰিছে।",
    entrepreneur4Name: "তাৰা শইকীয়া",
    entrepreneur4Venture: "হিমালয়ান অৰ্গেনিক্স",
    entrepreneur4Sector: "জৈৱিক খেতি আৰু খাদ্য",
    entrepreneur4Desc: "ৰাজ্যৰ প্ৰথম প্ৰমাণিত জৈৱিক কৃষি সমবায় প্ৰতিষ্ঠা কৰিছে যি ৰাষ্ট্ৰীয় বজাৰত ৰাসায়নিকমুক্ত উচ্চভূমিৰ শস্য যোগান ধৰে।",
    meetEntrepreneurs: "তেওঁলোকৰ কাহিনী পঢ়ক",

    // HOME – TRIBES & ENTREPRENEURS SECTION
    homeCultureSectionTitle: "মানুহ আৰু ঐতিহ্য",
    homeCultureSectionSubtitle: "অৰুণাচল প্ৰদেশৰ আত্মা তাৰ অসাধাৰণ মানুহৰ মাজত বাস কৰে — প্ৰাচীন জনজাতি আৰু আধুনিক উদ্যোক্তা।",
    featTribesTitle: "স্থানীয় জনজাতি",
    featTribesDesc: "২৬+ আদিবাসী জনজাতিৰ সমৃদ্ধ সাংস্কৃতিক বৈচিত্ৰ্য অন্বেষণ কৰক, যাৰ প্ৰত্যেকৰে অনন্য উৎসৱ, শিল্প আৰু পৰম্পৰা আছে।",
    featEntrepreneursTitle: "উদ্যোক্তা",
    featEntrepreneursDesc: "অৰুণাচল প্ৰদেশৰ সেই উদ্ভাৱকসকলক লগ কৰক যি ব্যৱসায় গঢ়িছে আৰু পৰৱৰ্তী প্ৰজন্মক অনুপ্ৰাণিত কৰিছে।",
    exploreTribes: "জনজাতি জানক",
    exploreEntrepreneurs: "উদ্যোক্তাক লগ কৰক",
  },
}

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: Translations
}

const LanguageContext = createContext<LanguageContextType>({
  language: "en",
  setLanguage: () => {},
  t: translations.en,
})

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>("en")

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY) as Language | null
    if (stored && stored in translations) {
      setLanguageState(stored)
    }
  }, [])

  const setLanguage = (lang: Language) => {
    localStorage.setItem(STORAGE_KEY, lang)
    setLanguageState(lang)
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t: translations[language] }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  return useContext(LanguageContext)
}

export const LANGUAGES: { code: Language; label: string; nativeLabel: string }[] = [
  { code: "en", label: "English", nativeLabel: "English" },
  { code: "hi", label: "Hindi", nativeLabel: "हिंदी" },
  { code: "bn", label: "Bengali", nativeLabel: "বাংলা" },
  { code: "as", label: "Assamese", nativeLabel: "অসমীয়া" },
]
