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
  signIn: string
  languageLabel: string

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
    signIn: "Sign In",
    languageLabel: "English",

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
  },

  hi: {
    // NAV
    guides: "गाइड",
    hotels: "होटल",
    transport: "परिवहन",
    permit: "परमिट",
    itinerary: "यात्रा कार्यक्रम",
    safety: "सुरक्षा",
    signIn: "साइन इन",
    languageLabel: "हिंदी",

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
  },

  bn: {
    // NAV
    guides: "গাইড",
    hotels: "হোটেল",
    transport: "পরিবহন",
    permit: "পারমিট",
    itinerary: "ভ্রমণসূচি",
    safety: "নিরাপত্তা",
    signIn: "সাইন ইন",
    languageLabel: "বাংলা",

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
  },

  as: {
    // NAV
    guides: "গাইড",
    hotels: "হোটেল",
    transport: "পৰিবহন",
    permit: "পাৰমিট",
    itinerary: "ভ্ৰমণসূচী",
    safety: "সুৰক্ষা",
    signIn: "চাইন ইন",
    languageLabel: "অসমীয়া",

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
