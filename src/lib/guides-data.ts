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
 * SVG viewport: 989 × 526  (matches public/images/image.png native resolution)
 *
 * Image geographic bounds (calibrated from design):
 *   Longitude 90.135°–98.808°E  →  x = (lon − 90.135) / 8.673 × 989
 *   Latitude  25.79°–30.18°N   →  y = (30.181 − lat)  / 4.391 × 526
 *
 * Pin positions have been carefully calibrated to match actual geographic locations
 * on the Arunachal Pradesh political map for accurate representation.
 */
export const locations: Location[] = [
  {
    id: "tawang",
    name: "Tawang",
    district: "Tawang District",
    category: "Mountain Destination",
    color: "#4F46E5",
    svgX: 195,  // lon 91.8697°E (northwest corner, near Bhutan border)
    svgY: 305,  // lat 27.5861°N
    bestTime: "Mar – May, Sep – Oct",
    image: "https://picsum.photos/seed/arunachal-festival-culture/800/450",
    desc: "Home to India's largest Buddhist monastery, frozen glacial lakes, and snow-capped Himalayan passes at over 10,000 ft.",
    placesToVisit: [
      "Tawang Monastery – India's largest Buddhist monastery (400 yrs old)",
      "Sela Pass – stunning 13,700 ft high-altitude pass",
      "Nuranang (Jung) Falls",
      "Madhuri / Shungetser Lake",
      "Bum La Pass – China border viewpoint",
      "PT Tso Lake & Gorichen Base",
      "Tawang War Memorial",
    ],
    foodAndDrinks: [
      "Zan – hearty flatbread served with vegetables or meat",
      "Thukpa – traditional Tibetan noodle soup",
      "Momos – steamed / fried dumplings",
      "Po Cha – salted butter tea",
      "Chang – local barley beer",
      "Khura – buckwheat pancakes",
    ],
    tribes: [
      {
        name: "Monpa",
        desc: "The dominant Buddhist tribe of Tawang, known for their rich Buddhist traditions, intricate wood carvings, and beautiful Thangka paintings. They celebrate the colourful Torgya festival with mask dances.",
      },
    ],
    activities: [
      "High-altitude trekking",
      "Monastery & gompa tours",
      "Photography of Himalayan landscapes",
      "Winter snowfall experience",
    ],
  },
  {
    id: "ziro",
    name: "Ziro Valley",
    district: "Lower Subansiri District",
    category: "Valley / Cultural",
    color: "#059669",
    svgX: 425,  // lon 93.8290°E (central-west region)
    svgY: 320,  // lat 27.5360°N
    bestTime: "Feb – Apr, Aug – Oct",
    image: "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=800&h=450&fit=crop&auto=format&q=80",
    desc: "A UNESCO World Heritage tentative site — lush pine-dotted paddy fields, the iconic Apatani tribe, and the celebrated Ziro Music Festival.",
    placesToVisit: [
      "Talley Valley Wildlife Sanctuary",
      "Meghna Cave Temple",
      "Apatani Villages – Hong, Hari, Hija, Bamin",
      "Ziro Music Festival amphitheatre (September)",
      "Pine grove & bamboo forests",
      "Kile Pakho scenic viewpoint",
    ],
    foodAndDrinks: [
      "Apong – traditional homemade rice beer",
      "Bamboo shoot-based local dishes",
      "Pika Pila – fermented bamboo shoot with pork fat",
      "Potur – millet beer",
      "Smoked pork with tribal herbs",
      "Pehak – fiery green chilli paste",
    ],
    tribes: [
      {
        name: "Apatani",
        desc: "Famous for their sustainable wetland paddy-cum-fish farming practices, distinct facial tattoos, and traditional nose plugs (Yapin Hullo). They celebrate the Myoko spring festival and Murung festival with great fervour.",
      },
    ],
    activities: [
      "Attending the Ziro Festival of Music (September)",
      "Village walks through Apatani settlements",
      "Nature trails through pine forests",
      "Organic farm visits",
    ],
  },
  {
    id: "namdapha",
    name: "Namdapha",
    district: "Changlang District",
    category: "Wildlife / Nature",
    color: "#DC2626",
    svgX: 713,  // lon 96.3807°E
    svgY: 352,  // lat 27.4816°N
    bestTime: "Oct – Mar",
    image: "https://images.unsplash.com/photo-1448375240586-882707db888b?w=800&h=450&fit=crop&auto=format&q=80",
    desc: "A biodiversity hotspot spanning tropical to alpine forests — home to Snow Leopards, Red Pandas, and over 1,000 plant species in a UNESCO-recognised park.",
    placesToVisit: [
      "Namdapha National Park – biodiversity hotspot spanning 1,985 sq km",
      "Miao Museum – gateway to the park",
      "Vijaynagar – India's most remote village",
      "Hornbill Nature Camp, Deban",
      "Noa-Dihing River banks",
      "Lisu (Yobin) tribal villages",
    ],
    foodAndDrinks: [
      "Smoked meat with indigenous forest herbs",
      "Fresh river fish prepared in jungle style",
      "Bamboo-tube rice",
      "Wild mushroom stir-fry",
      "Tangsa rice beer",
      "Forest honey with flatbread",
    ],
    tribes: [
      {
        name: "Lisu (Yobin)",
        desc: "A vibrant cross-border tribe living in harmony with the dense rainforests. They wear brilliantly coloured traditional dress and are skilled hunters and forest stewards.",
      },
      {
        name: "Singpho",
        desc: "One of the earliest tea-cultivating communities in India, living in harmony with the jungle; known for their rich oral traditions and bamboo craft.",
      },
    ],
    activities: [
      "Wildlife spotting (Snow Leopards, Red Pandas, Tigers)",
      "Intense jungle trekking",
      "Bird watching (900+ species including hornbills)",
      "River angling on Noa-Dihing",
    ],
  },
  {
    id: "pasighat",
    name: "Pasighat",
    district: "East Siang District",
    category: "Riverside / Adventure",
    color: "#D97706",
    svgX: 593,  // lon 95.3262°E
    svgY: 254,  // lat 28.0617°N
    bestTime: "Oct – Apr",
    image: "https://picsum.photos/seed/arunachal-mountain-river/800/450",
    desc: "Arunachal's oldest town sits where the mighty Siang River bursts into the plains — a paradise for rafters, anglers, and culture seekers.",
    placesToVisit: [
      "Daying Ering Wildlife Sanctuary",
      "The mighty Siang River gorge",
      "Kekar Monying viewpoint",
      "Pange Eco-Camp",
      "Dambuk – Orange Festival venue",
      "Jonai & Mebo villages",
    ],
    foodAndDrinks: [
      "Pika Pila – tangy bamboo shoot pickle",
      "Roasted meat platters",
      "Apong – Adi rice beer (mild & strong varieties)",
      "Lukter – sun-dried or smoked meat",
      "Bamboo rice (paro anyang)",
      "Opo – steamed sticky-rice cake",
    ],
    tribes: [
      {
        name: "Adi",
        desc: "Celebrated for their vibrant festivals like Solung (harvest), intricate bamboo architecture, and warm hospitality. The Adi are one of Arunachal's largest tribes, with sub-groups including Minyong, Padam, Galo and Bori.",
      },
    ],
    activities: [
      "White-water rafting on the Siang River",
      "Angling & kayaking",
      "Wildlife boat safaris at D'Ering Sanctuary",
      "Adi village cultural tours",
    ],
  },
  {
    id: "bomdila",
    name: "Bomdila",
    district: "West Kameng District",
    category: "Monastery & Nature",
    color: "#7C3AED",
    svgX: 260,  // lon 92.4159°E
    svgY: 350,  // lat 27.2645°N
    bestTime: "Apr – Oct",
    image: "https://picsum.photos/seed/tawang-monastery-panorama/800/450",
    desc: "Scenic hill town framed by apple orchards and rhododendrons — gateway to Tawang, famed for serene monasteries and the world-class Eaglenest birding corridor.",
    placesToVisit: [
      "Bomdila Monastery (Gentse Gaden Rabgyel Ling)",
      "Apple & kiwi orchards",
      "Bomdila Viewpoint – panoramic Himalayan views",
      "Eaglenest Wildlife Sanctuary",
      "Dirang Dzong & hot springs",
      "Sangti Valley (Black-necked cranes in winter)",
    ],
    foodAndDrinks: [
      "Steamed Momos with chilli dip",
      "Churpa – fermented yak cheese stew",
      "Thukpa – Tibetan noodle broth",
      "Butter tea (Po Cha)",
      "Zan – traditional flatbread",
      "Ara – distilled grain spirit",
    ],
    tribes: [
      {
        name: "Monpa",
        desc: "A Buddhist community reflecting a rich mix of Buddhist and animist cultures; known for thangka paintings and prayer-flag making.",
      },
      {
        name: "Sherdukpen",
        desc: "Traditional weavers of striped woollen shawls; perform elaborate mask dances during the Torgya festival.",
      },
      {
        name: "Aka (Hrusso)",
        desc: "Women wear distinctive brass nose rings; known for melodic folk songs and bamboo craft.",
      },
      {
        name: "Miji",
        desc: "A smaller tribe practising a blend of animist traditions with distinct weaving patterns and oral folklore.",
      },
    ],
    activities: [
      "Scenic drives through apple orchards",
      "Exploring local handicraft centres",
      "Birding at Eaglenest (Rufous-necked Hornbill)",
      "Dirang hot-spring soaking",
    ],
  },
  {
    id: "aalo",
    name: "Aalo (Along)",
    district: "West Siang District",
    category: "Valley Adventure",
    color: "#0891B2",
    svgX: 533,  // lon 94.8010°E
    svgY: 241,  // lat 28.1691°N
    bestTime: "Oct – Apr",
    image: "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=800&h=450&fit=crop&auto=format&q=80",
    desc: "Adventure hub of central Arunachal — the Galo tribe's heartland, known for cane suspension bridges, orange orchards, and river rafting on the wild Siyom.",
    placesToVisit: [
      "Siyom River hanging bridges",
      "Sprawling Orange Orchards",
      "Patum Bridge – iconic cane suspension bridge",
      "Pangin – Siang-Siyom confluence",
      "Kamki Eco-Park",
      "Tuting – near Tibet border (restricted)",
    ],
    foodAndDrinks: [
      "Freshly harvested oranges",
      "Bamboo shoot fry",
      "Local millet beer",
      "Apong – rice beer in bamboo cups",
      "Smoked pork with bamboo shoot",
      "Ngam – Galo-style fish preparation",
    ],
    tribes: [
      {
        name: "Galo",
        desc: "Known for their unique cane and bamboo stilt houses and the vibrant Mopin harvest festival with mask dances, rice beer, and communal feasts. Skilled in Nyibo (traditional healing) rituals.",
      },
    ],
    activities: [
      "River rafting on the Siyom (Grade III–IV)",
      "Crossing traditional cane suspension bridges",
      "Cultural homestays with Galo families",
      "Orange orchard walks",
    ],
  },
  {
    id: "itanagar",
    name: "Itanagar",
    district: "Papum Pare District",
    category: "Capital / Heritage",
    color: "#92400E",
    svgX: 400,  // lon 93.6053°E (capital, south-central)
    svgY: 375,  // lat 27.0844°N
    bestTime: "Oct – Apr",
    image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&h=450&fit=crop&auto=format&q=80",
    desc: "The state capital balances ancient heritage and modern governance — explore the historic Ita Fort, serene Ganga Lake, and the vibrant Nyishi cultural heartland.",
    placesToVisit: [
      "Ita Fort – 14th century historical brick fort",
      "Ganga Lake (Gyakar Sinyi) – serene natural lake",
      "Jawaharlal Nehru State Museum",
      "Buddhist Temple & Gompa Complex",
      "Polo Park",
      "Craft Centre & Emporium",
    ],
    foodAndDrinks: [
      "Bamboo shoot pork curry",
      "Apong – rice beer",
      "Momos with red chilli dip",
      "Zan flatbread with vegetables",
      "Smoked chicken with local herbs",
      "Pehak – green chilli chutney",
    ],
    tribes: [
      {
        name: "Nyishi",
        desc: "The largest tribe in Arunachal Pradesh, known for their distinctive hornbill feather headgear (which has now been replaced with a beak replica for conservation). They celebrate the Nyokum Yullo festival praying for prosperity.",
      },
    ],
    activities: [
      "Heritage walks to Ita Fort",
      "Museum visits & cultural immersion",
      "Shopping at craft emporiums",
      "Ganga Lake boating",
    ],
  },
  {
    id: "mechuka",
    name: "Mechuka",
    district: "Shi-Yomi District",
    category: "Hidden Valley",
    color: "#0D9488",
    svgX: 460,  // lon 94.1370°E (north-central, near Tibet)
    svgY: 185,  // lat 28.5975°N
    bestTime: "Apr – Oct",
    image: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=800&h=450&fit=crop&auto=format&q=80",
    desc: "A surreal hidden valley near the Tibet border at 6,000 ft — rolling green meadows, ancient monasteries, and the Memba tribe's Tibetan-flavoured culture.",
    placesToVisit: [
      "Mechuka Valley – stunning high-altitude meadows",
      "Samten Yongcha Monastery – ancient Buddhist monastery",
      "Yargyap Chu River",
      "Dorjiling Gompa",
      "Kaying village viewpoint",
      "Indo-China border viewpoint",
    ],
    foodAndDrinks: [
      "Thukpa – Tibetan-style noodle soup",
      "Tsampa – roasted barley flour dough",
      "Butter tea (Po Cha)",
      "Chang – barley beer",
      "Steamed Momos",
      "Dried meat with highland herbs",
    ],
    tribes: [
      {
        name: "Memba",
        desc: "A Buddhist tribe whose culture closely mirrors Tibetan traditions. They are known for colourful Thangka art, ancient gompas, and elaborate mask dance performances during their festivals.",
      },
    ],
    activities: [
      "Trekking through high-altitude meadows",
      "Monastery tours & meditation",
      "Paragliding over Mechuka Valley",
      "Photography of snow-capped peaks",
    ],
  },
  {
    id: "roing",
    name: "Roing",
    district: "Lower Dibang Valley District",
    category: "Nature / Tribal",
    color: "#BE185D",
    svgX: 651,  // lon 95.8361°E
    svgY: 245,  // lat 28.1365°N
    bestTime: "Oct – Apr",
    image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&h=450&fit=crop&auto=format&q=80",
    desc: "A paradise for nature lovers in the Dibang Valley — featuring Mehao Wildlife Sanctuary, the snow-capped Mayudia Pass, and the ancient Idu Mishmi tribe.",
    placesToVisit: [
      "Mehao Wildlife Sanctuary",
      "Mayudia Pass – snow-covered mountain pass",
      "Nehru Van Udyan",
      "Bhismaknagar Fort – ancient ruins",
      "Dibang River rafting stretch",
      "Idu Mishmi Cultural & Literary Society Museum",
    ],
    foodAndDrinks: [
      "Idu Mishmi smoked meat with bamboo shoot",
      "River fish with local herbs",
      "Rice beer (Igru)",
      "Bamboo shoot pickle",
      "Wild fern stir-fry",
      "Roasted millet flatbread",
    ],
    tribes: [
      {
        name: "Idu Mishmi",
        desc: "A tribe deeply connected to the Dibang Valley's biodiversity; they have a traditional conservation ethos where the tiger is revered as a brother. Known for their unique silver jewellery, indigo-dyed textiles, and the Reh festival.",
      },
    ],
    activities: [
      "Wildlife safaris at Mehao Sanctuary",
      "Scenic drive to Mayudia Pass",
      "Dibang River rafting",
      "Idu Mishmi village cultural visits",
    ],
  },
];
