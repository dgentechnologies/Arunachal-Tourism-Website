export interface Tribe {
  name: string;
  desc: string;
}

export interface Location {
  id: string;
  name: string;
  district: string;
  category: string;
  color: string;
  /** X position in the SVG viewport (0–800) */
  svgX: number;
  /** Y position in the SVG viewport (0–520) */
  svgY: number;
  bestTime: string;
  image: string;
  desc: string;
  placesToVisit: string[];
  foodAndDrinks: string[];
  tribes: Tribe[];
  activities: string[];
}

/**
 * SVG viewport: 800 × 520
 * Longitude 91.5°–97.5°  →  x = (lon − 91.5) / 6 × 800
 * Latitude  26.5°–29.5°  →  y = (29.5 − lat) / 3 × 520
 */
export const locations: Location[] = [
  {
    id: "tawang",
    name: "Tawang",
    district: "Tawang District",
    category: "Mountain Destination",
    color: "#4F46E5",
    svgX: 49,
    svgY: 331,
    bestTime: "Mar – Jun, Oct – Nov",
    image: "https://picsum.photos/seed/tawang800/800/450",
    desc: "Home to the 400-year-old Tawang Monastery — the largest in India — frozen glacial lakes, and snow-capped Himalayan passes.",
    placesToVisit: [
      "Tawang Monastery (400 yr old, largest in India)",
      "Sela Pass – 13,700 ft alpine pass",
      "Madhuri / Shungetser Lake",
      "Nuranang (Jung) Waterfall",
      "Bum La Pass – China border",
      "PT Tso Lake & Gorichen Base",
      "Tawang War Memorial",
    ],
    foodAndDrinks: [
      "Thukpa – hearty Tibetan noodle soup",
      "Momos – steamed / fried dumplings",
      "Po Cha – salted butter tea",
      "Chang – local barley beer",
      "Khura – buckwheat pancakes",
      "Gyurma – traditional blood sausage",
    ],
    tribes: [
      {
        name: "Monpa",
        desc: "The dominant Buddhist tribe of Tawang; renowned for thangka paintings, mask dances (Torgya festival) and handwoven carpets.",
      },
      {
        name: "Sherdukpen",
        desc: "Followers of Dunyi-Polo religion; celebrated for their distinctive colourful woven shawls.",
      },
    ],
    activities: [
      "Monastery & gompa hopping",
      "High-altitude trekking",
      "Winter snowfall experience",
      "Bird watching (Eaglenest corridor)",
    ],
  },
  {
    id: "ziro",
    name: "Ziro Valley",
    district: "Lower Subansiri District",
    category: "Valley / Cultural",
    color: "#059669",
    svgX: 311,
    svgY: 338,
    bestTime: "Mar – May, Sep – Oct",
    image: "https://picsum.photos/seed/zirovalley/800/450",
    desc: "A UNESCO World Heritage tentative site — lush pine-dotted paddy fields, the iconic Apatani tribe, and the indie Ziro Music Festival.",
    placesToVisit: [
      "Apatani Villages – Hong, Hari, Hija, Bamin, Mudang-Tage",
      "Talley Valley Wildlife Sanctuary",
      "Kile Pakho scenic viewpoint",
      "Dolo Mando Hill",
      "Ziro Music Festival amphitheatre (September)",
      "Pine Grove & bamboo forests",
    ],
    foodAndDrinks: [
      "Pika Pila – fermented bamboo shoot with pork fat",
      "Apong – traditional Apatani rice beer",
      "Potur – millet beer",
      "Bamboo-shoot curry",
      "Smoked pork with tribal herbs",
      "Pehak – fiery green chilli paste",
    ],
    tribes: [
      {
        name: "Apatani",
        desc: "UNESCO-listed for their unique paddy-cum-fish farming. Women traditionally wore Yapin Hullo nose plugs and facial tattoos. They celebrate Myoko (spring) and Murung festivals.",
      },
    ],
    activities: [
      "Cultural village walks",
      "Ziro Music Festival (Sep)",
      "Paddy-field nature walks",
      "Organic farm visits",
    ],
  },
  {
    id: "namdapha",
    name: "Namdapha",
    district: "Changlang District",
    category: "Wildlife / Nature",
    color: "#DC2626",
    svgX: 621,
    svgY: 348,
    bestTime: "Oct – Apr",
    image: "https://picsum.photos/seed/namdapha800/800/450",
    desc: "One of the richest biodiversity hotspots on Earth — spanning 1,985 km², it shelters four big cats and over 1,000 plant species.",
    placesToVisit: [
      "Namdapha National Park (1,985 sq km)",
      "Miao town – base for the park",
      "Vijaynagar – India's remotest village",
      "Hornbill Nature Camp, Deban",
      "Noa-Dihing River banks",
      "Lisu (Yobin) tribal villages",
    ],
    foodAndDrinks: [
      "Bamboo-tube rice",
      "Smoked river fish with herbs",
      "Wild mushroom stir-fry",
      "Black dal with smoked meat",
      "Tangsa rice beer",
      "Forest honey with flat bread",
    ],
    tribes: [
      {
        name: "Lisu (Yobin)",
        desc: "Vibrant cross-border tribe wearing brilliantly coloured traditional dress; skilled hunters and forest stewards.",
      },
      {
        name: "Tangsa",
        desc: "Over 30 sub-groups with distinct dialects and rich oral traditions; known for weaving and Wihu Kuh festival.",
      },
      {
        name: "Nocte",
        desc: "Skilled weavers and craftspeople; celebrate the colourful Oriah Harvest Festival.",
      },
    ],
    activities: [
      "Wildlife safari (Tiger, Snow Leopard, Red Panda)",
      "Bird watching (900+ species, hornbills)",
      "Jungle trekking trails",
      "River angling on Noa-Dihing",
    ],
  },
  {
    id: "pasighat",
    name: "Pasighat",
    district: "East Siang District",
    category: "Riverside / Adventure",
    color: "#D97706",
    svgX: 510,
    svgY: 248,
    bestTime: "Nov – Mar",
    image: "https://picsum.photos/seed/pasighat800/800/450",
    desc: "Arunachal's oldest town sits where the mighty Siang River bursts into the plains — a paradise for rafters, anglers, and culture seekers.",
    placesToVisit: [
      "Siang River Gorge",
      "D'Ering Wildlife Sanctuary",
      "Pange Eco-Camp",
      "Kekar Monying & Borguli Hills",
      "Dambuk – Orange Festival venue",
      "Jonai & Mebo villages",
    ],
    foodAndDrinks: [
      "Apong – Adi rice beer (two varieties: mild & strong)",
      "Lukter – sun-dried or smoked meat",
      "Bamboo rice (paro anyang)",
      "Smoked fish with bamboo shoot",
      "Pehak – green chilli chutney",
      "Opo – steamed sticky-rice cake",
    ],
    tribes: [
      {
        name: "Adi",
        desc: "One of Arunachal's largest tribes with sub-groups Minyong, Padam, Galo and Bori. Famous for the Ponung dance and Solung harvest festival. Skilled in cane-bamboo weaving.",
      },
    ],
    activities: [
      "Grade IV–V white-water rafting",
      "River island camping",
      "Angling & kayaking",
      "Adi village cultural tours",
    ],
  },
  {
    id: "bomdila",
    name: "Bomdila",
    district: "West Kameng District",
    category: "Monastery & Nature",
    color: "#7C3AED",
    svgX: 123,
    svgY: 387,
    bestTime: "Mar – Jun, Sep – Nov",
    image: "https://picsum.photos/seed/bomdila800/800/450",
    desc: "Scenic hill town framed by apple orchards and rhododendrons — the gateway to Tawang with its serene monasteries and Eaglenest birding paradise.",
    placesToVisit: [
      "Bomdila Monastery (Gentse Gaden Rabgyel Ling)",
      "Eaglenest Wildlife Sanctuary",
      "Tipi Orchid Research Centre",
      "Dirang Dzong & hot springs",
      "Sangti Valley (Black-necked cranes in winter)",
      "Apple & kiwi orchards",
    ],
    foodAndDrinks: [
      "Thukpa (Tibetan noodle broth)",
      "Momos (steamed dumplings)",
      "Butter tea (Po Cha)",
      "Yak cheese & yak meat dishes",
      "Zan – roasted maize flatbread",
      "Ara – traditional distilled grain spirit",
    ],
    tribes: [
      {
        name: "Sherdukpen",
        desc: "Traditional weavers of striped woollen shawls; perform elaborate mask dances during the Torgya festival.",
      },
      {
        name: "Aka (Hrusso)",
        desc: "Women wear distinctive brass nose rings; known for melodic folk songs and bamboo craft.",
      },
      {
        name: "Monpa",
        desc: "Buddhist community also present; known for thangka paintings and prayer-flag making.",
      },
    ],
    activities: [
      "Monastery meditation visits",
      "Birding (Eaglenest – Rufous-necked Hornbill)",
      "Apple orchard walks",
      "Dirang hot-spring soaking",
    ],
  },
  {
    id: "aalo",
    name: "Aalo (Along)",
    district: "West Siang District",
    category: "Valley Adventure",
    color: "#0891B2",
    svgX: 405,
    svgY: 231,
    bestTime: "Oct – May",
    image: "https://picsum.photos/seed/aaloalong/800/450",
    desc: "Adventure hub of central Arunachal — gateway to the mystical Mechuka valley and the wild Siyom river, deep in Galo and Adi heartland.",
    placesToVisit: [
      "Mechuka Valley – 6,000 ft Tibetan-flavour valley",
      "Siyom River confluence",
      "Tuting – near Tibet border (restricted)",
      "Pangin – Siang-Siyom confluence",
      "Adi Kailash viewpoint",
      "Kamki Eco-Park",
    ],
    foodAndDrinks: [
      "Apong – rice beer in bamboo cups",
      "Smoked pork with bamboo shoot",
      "Opo – glutinous rice cake",
      "Ngam – Galo-style fish preparation",
      "Wild mushroom & fern stir-fry",
      "Pae – millet-based fermented drink",
    ],
    tribes: [
      {
        name: "Galo",
        desc: "Vibrant tribe; celebrate Mopin (spring) festival with mask dances, rice beer, and communal feasts. Known for traditional healing (Nyibo rituals).",
      },
      {
        name: "Adi (Minyong)",
        desc: "Warrior tradition; known for Ponung song & dance and expert bamboo-cane weaving.",
      },
      {
        name: "Memba",
        desc: "Buddhist tribe near the Tibet border; culture closely mirrors Tibetan traditions with colourful thangka art.",
      },
    ],
    activities: [
      "River rafting on Siyom (Grade III–IV)",
      "Mechuka valley trek & camping",
      "Galo village cultural tours",
      "Paragliding at Mechuka",
    ],
  },
];
