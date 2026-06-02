const dotenv = require('dotenv');
dotenv.config();

const mongoose = require('mongoose');
const Product = require('./models/Product');
const Dealer = require('./models/Dealer');
const News = require('./models/News');
const Offer = require('./models/Offer');

// ──────────────────────────────────────────────
// PRODUCTS — 10 Motorcycles, 3 Scooters, 2 EVs
// ──────────────────────────────────────────────
const products = [
  // ─── Motorcycles ───
  {
    name: 'Splendor Plus',
    slug: 'splendor-plus',
    category: 'motorcycle',
    engine_cc: 97.2,
    torque_nm: 8.05,
    torque_rpm: 6000,
    power_bhp: 8.02,
    cooling: 'Air Cooled',
    price_min: 72250,
    price_max: 79450,
    image_url: '/images/splendor-plus.jpg',
    badge: 'bestseller',
    features: ['i3S Technology', 'Integrated Braking System', 'Side Stand Indicator', 'Tubeless Tyres'],
    colors: ['Black with Purple', 'Black with Silver', 'Heavy Grey with Green'],
    is_featured: true,
  },
  {
    name: 'HF Deluxe',
    slug: 'hf-deluxe',
    category: 'motorcycle',
    engine_cc: 97.2,
    torque_nm: 8.05,
    torque_rpm: 6000,
    power_bhp: 8.02,
    cooling: 'Air Cooled',
    price_min: 63250,
    price_max: 69150,
    image_url: '/images/hf-deluxe.jpg',
    badge: null,
    features: ['i3S Technology', 'Tubeless Tyres', 'IBS'],
    colors: ['Black with Blue', 'Heavy Grey', 'Red'],
    is_featured: false,
  },
  {
    name: 'Glamour',
    slug: 'glamour',
    category: 'motorcycle',
    engine_cc: 124.7,
    torque_nm: 10.4,
    torque_rpm: 6000,
    power_bhp: 10.7,
    cooling: 'Air Cooled',
    price_min: 83350,
    price_max: 90250,
    image_url: '/images/glamour.jpg',
    badge: null,
    features: ['Auto Sail Technology', 'Real-Time Mileage Indicator', 'i3S', 'Side Stand Engine Cut-Off'],
    colors: ['Techno Blue', 'Sports Red', 'Tornado Grey'],
    is_featured: true,
  },
  {
    name: 'Super Splendor',
    slug: 'super-splendor',
    category: 'motorcycle',
    engine_cc: 124.7,
    torque_nm: 10.35,
    torque_rpm: 5500,
    power_bhp: 10.7,
    cooling: 'Air Cooled',
    price_min: 85150,
    price_max: 92000,
    image_url: '/images/super-splendor.jpg',
    badge: null,
    features: ['i3S Technology', 'Personal Winker', 'IBS', 'Side Stand Indicator'],
    colors: ['Moon Yellow', 'Sports Red', 'Sparking Alpha Blue'],
    is_featured: false,
  },
  {
    name: 'Xtreme 125R',
    slug: 'xtreme-125r',
    category: 'motorcycle',
    engine_cc: 125,
    torque_nm: 10.5,
    torque_rpm: 7000,
    power_bhp: 11.4,
    cooling: 'Air Cooled',
    price_min: 95000,
    price_max: 102000,
    image_url: '/images/xtreme-125r.jpg',
    badge: 'new',
    features: ['Full LED Lighting', 'Digital Console', 'Single-Channel ABS', 'Under-Seat USB Charger'],
    colors: ['Neon Sparks', 'Matte Black', 'Red Raid'],
    is_featured: true,
  },
  {
    name: 'Xtreme 160R',
    slug: 'xtreme-160r',
    category: 'motorcycle',
    engine_cc: 163,
    torque_nm: 14.0,
    torque_rpm: 6500,
    power_bhp: 15.2,
    cooling: 'Air Cooled',
    price_min: 127000,
    price_max: 140000,
    image_url: '/images/xtreme-160r.jpg',
    badge: 'bestseller',
    features: ['0-60 in 4.7s', 'Inverted LCD Console', 'Single-Channel ABS', 'Petal Disc Brakes'],
    colors: ['Stealth Black', 'Sports Red', 'Vibrant Blue'],
    is_featured: true,
  },
  {
    name: 'Karizma XMR',
    slug: 'karizma-xmr',
    category: 'motorcycle',
    engine_cc: 210,
    torque_nm: 20.4,
    torque_rpm: 6500,
    power_bhp: 25.2,
    cooling: 'Liquid Cooled',
    price_min: 178000,
    price_max: 192000,
    image_url: '/images/karizma-xmr.jpg',
    badge: 'new',
    features: ['Full LED Lighting', 'TFT Display with Bluetooth', 'Dual-Channel ABS', 'Traction Control'],
    colors: ['Matte Black', 'Racing Red', 'Pearl White'],
    is_featured: true,
  },
  {
    name: 'Xtreme 200S',
    slug: 'xtreme-200s',
    category: 'motorcycle',
    engine_cc: 199.6,
    torque_nm: 17.35,
    torque_rpm: 6500,
    power_bhp: 18.1,
    cooling: 'Air & Oil Cooled',
    price_min: 139000,
    price_max: 148500,
    image_url: '/images/xtreme-200s.jpg',
    badge: null,
    features: ['Full Fairing', 'Digital-Analog Console', 'Single-Channel ABS', 'LED Projector Headlamp'],
    colors: ['Pearl Fadeless White', 'Matte Blue', 'Panther Black'],
    is_featured: false,
  },
  {
    name: 'Mavrick 440',
    slug: 'mavrick-440',
    category: 'motorcycle',
    engine_cc: 440,
    torque_nm: 36.0,
    torque_rpm: 5000,
    power_bhp: 26.5,
    cooling: 'Liquid Cooled',
    price_min: 199000,
    price_max: 229000,
    image_url: '/images/mavrick-440.jpg',
    badge: 'premia',
    features: ['6-Speed Gearbox', 'Dual-Channel ABS', 'TFT Display with Navigation', 'LED Lighting', 'Slipper Clutch'],
    colors: ['Phantom Black', 'Valor Green', 'Ivory White'],
    is_featured: true,
  },
  {
    name: 'Xpulse 200 4V',
    slug: 'xpulse-200-4v',
    category: 'motorcycle',
    engine_cc: 199.6,
    torque_nm: 17.35,
    torque_rpm: 6500,
    power_bhp: 19.1,
    cooling: 'Air & Oil Cooled',
    price_min: 142000,
    price_max: 155000,
    image_url: '/images/xpulse-200-4v.jpg',
    badge: 'premia',
    features: ['21" Front Wheel', 'Long Travel Suspension', 'Turn-by-Turn Navigation', 'Rally Mode', 'Windshield'],
    colors: ['Trail Green', 'Matte Black', 'Solar Red'],
    is_featured: true,
  },

  // ─── Scooters ───
  {
    name: 'Destini 125',
    slug: 'destini-125',
    category: 'scooter',
    engine_cc: 124.6,
    torque_nm: 10.4,
    torque_rpm: 5500,
    power_bhp: 9.0,
    cooling: 'Air Cooled',
    price_min: 77900,
    price_max: 86700,
    image_url: '/images/destini-125.jpg',
    badge: null,
    features: ['i3S Technology', 'External Fuel Filler', 'Integrated Braking System', 'Boot Light'],
    colors: ['Matte Grey', 'Nexus Blue', 'Pearl Silver White'],
    is_featured: false,
  },
  {
    name: 'Pleasure Plus',
    slug: 'pleasure-plus',
    category: 'scooter',
    engine_cc: 110.9,
    torque_nm: 8.7,
    torque_rpm: 5500,
    power_bhp: 8.0,
    cooling: 'Air Cooled',
    price_min: 67900,
    price_max: 74800,
    image_url: '/images/pleasure-plus.jpg',
    badge: 'bestseller',
    features: ['Integrated Braking System', 'Boot Light', 'Mobile Charging Port', 'Stylish Body Graphics'],
    colors: ['Matte Pearl Blue', 'Glossy Red', 'Candy Blazing Red'],
    is_featured: true,
  },
  {
    name: 'Maestro Edge 125',
    slug: 'maestro-edge-125',
    category: 'scooter',
    engine_cc: 124.6,
    torque_nm: 10.4,
    torque_rpm: 5500,
    power_bhp: 9.0,
    cooling: 'Air Cooled',
    price_min: 80250,
    price_max: 88350,
    image_url: '/images/maestro-edge-125.jpg',
    badge: null,
    features: ['i3S Technology', 'Side Stand Indicator', 'External Fuel Filler', 'Service Reminder'],
    colors: ['Matte Techno Blue', 'Pearl Fadeless White', 'Panther Black'],
    is_featured: false,
  },

  // ─── Electric Vehicles ───
  {
    name: 'Vida V1',
    slug: 'vida-v1',
    category: 'electric',
    engine_cc: 0,
    torque_nm: 26,
    torque_rpm: 0,
    power_bhp: 6.0,
    cooling: 'N/A',
    price_min: 126900,
    price_max: 149900,
    image_url: '/images/vida-v1.jpg',
    badge: 'new',
    is_electric: true,
    range_km: 143,
    features: ['Removable Battery', 'Touchscreen Dashboard', 'Connected Vehicle Tech', 'Regenerative Braking', 'OTA Updates'],
    colors: ['Matte White', 'Matte Black', 'Matte Sports Red'],
    is_featured: true,
  },
  {
    name: 'Vida V2',
    slug: 'vida-v2',
    category: 'electric',
    engine_cc: 0,
    torque_nm: 32,
    torque_rpm: 0,
    power_bhp: 7.5,
    cooling: 'N/A',
    price_min: 149900,
    price_max: 179900,
    image_url: '/images/vida-v2.jpg',
    badge: 'new',
    is_electric: true,
    range_km: 165,
    features: ['Swappable Dual Battery', '7" TFT Touchscreen', 'Navigation Assist', 'Theft Alert', 'Fast Charging', 'Cruise Control'],
    colors: ['Aurora Teal', 'Stellar Blue', 'Cosmic Black'],
    is_featured: true,
  },
];

// ──────────────────────────────────────────────
// DEALERS — 8 across 5 Indian cities
// ──────────────────────────────────────────────
const dealers = [
  {
    name: 'MotoVerse Mumbai Central',
    city: 'Mumbai',
    state: 'Maharashtra',
    address: '12, Lamington Road, Grant Road, Mumbai 400007',
    phone: '+91-22-2382-1100',
    lat: 18.9647,
    lng: 72.8258,
    is_premia: true,
  },
  {
    name: 'MotoVerse Andheri',
    city: 'Mumbai',
    state: 'Maharashtra',
    address: '45, SV Road, Andheri West, Mumbai 400058',
    phone: '+91-22-2637-5500',
    lat: 19.1197,
    lng: 72.8464,
    is_premia: false,
  },
  {
    name: 'MotoVerse Karol Bagh',
    city: 'Delhi',
    state: 'Delhi',
    address: '78, Pusa Road, Karol Bagh, New Delhi 110005',
    phone: '+91-11-2875-2200',
    lat: 28.6519,
    lng: 77.1902,
    is_premia: true,
  },
  {
    name: 'MotoVerse Dwarka',
    city: 'Delhi',
    state: 'Delhi',
    address: 'Plot 6, Sector 7, Dwarka, New Delhi 110077',
    phone: '+91-11-4568-9100',
    lat: 28.5921,
    lng: 77.0460,
    is_premia: false,
  },
  {
    name: 'MotoVerse Koramangala',
    city: 'Bangalore',
    state: 'Karnataka',
    address: '22, 80 Feet Road, Koramangala 4th Block, Bengaluru 560034',
    phone: '+91-80-4567-1234',
    lat: 12.9352,
    lng: 77.6245,
    is_premia: true,
  },
  {
    name: 'MotoVerse T Nagar',
    city: 'Chennai',
    state: 'Tamil Nadu',
    address: '15, Usman Road, T Nagar, Chennai 600017',
    phone: '+91-44-2434-5500',
    lat: 13.0418,
    lng: 80.2341,
    is_premia: false,
  },
  {
    name: 'MotoVerse Anna Nagar',
    city: 'Chennai',
    state: 'Tamil Nadu',
    address: '3rd Avenue, W Block, Anna Nagar, Chennai 600040',
    phone: '+91-44-2621-7788',
    lat: 13.0860,
    lng: 80.2095,
    is_premia: false,
  },
  {
    name: 'MotoVerse Kothrud',
    city: 'Pune',
    state: 'Maharashtra',
    address: '101, Karve Road, Kothrud, Pune 411038',
    phone: '+91-20-2546-8800',
    lat: 18.5074,
    lng: 73.8077,
    is_premia: true,
  },
];

// ──────────────────────────────────────────────
// NEWS — 5 articles
// ──────────────────────────────────────────────
const news = [
  {
    title: 'MotoVerse Launches the All-New Mavrick 440',
    slug: 'motoverse-launches-mavrick-440',
    excerpt: 'The Mavrick 440 marks MotoVerse\'s entry into the premium middleweight segment with a 440cc liquid-cooled engine.',
    content: 'MotoVerse has officially unveiled the Mavrick 440, a premium cruiser motorcycle powered by a 440cc single-cylinder liquid-cooled engine producing 26.5 BHP and 36 Nm of torque. The bike features a 6-speed gearbox, dual-channel ABS, TFT display with turn-by-turn navigation, and a slipper clutch. Available in three stunning colors — Phantom Black, Valor Green, and Ivory White — the Mavrick 440 is priced between ₹1,99,000 and ₹2,29,000. Bookings are now open at all MotoVerse Premia dealerships.',
    category: 'launch',
    image_url: '/images/news/mavrick-launch.jpg',
    published_at: new Date('2026-05-28'),
  },
  {
    title: 'Vida V2 Electric Scooter Unveiled with 165 km Range',
    slug: 'vida-v2-electric-scooter-unveiled',
    excerpt: 'The next-generation Vida V2 raises the bar for urban electric mobility with swappable dual batteries and fast charging.',
    content: 'MotoVerse has expanded its electric lineup with the Vida V2, featuring a swappable dual-battery system that delivers a class-leading 165 km range on a single charge. The scooter boasts a 7-inch TFT touchscreen with navigation assist, theft alert system, cruise control, and OTA updates. Priced from ₹1,49,900, the Vida V2 is available for test rides at select dealerships across Mumbai, Delhi, Bangalore, Chennai, and Pune.',
    category: 'launch',
    image_url: '/images/news/vida-v2-launch.jpg',
    published_at: new Date('2026-05-20'),
  },
  {
    title: 'MotoVerse Wins "Manufacturer of the Year" at Auto Awards 2026',
    slug: 'motoverse-wins-manufacturer-of-the-year-2026',
    excerpt: 'The prestigious award recognizes MotoVerse\'s commitment to innovation, sustainability, and customer satisfaction.',
    content: 'MotoVerse has been honored with the coveted "Manufacturer of the Year" title at the Auto Awards 2026. The award recognizes the company\'s outstanding performance in product innovation, electric vehicle development through the Vida brand, expansion of the Premia dealership network, and industry-leading after-sales service. CEO Rajesh Mehta accepted the award, stating: "This recognition belongs to our 10,000+ strong workforce and our loyal customers who inspire us every day."',
    category: 'award',
    image_url: '/images/news/auto-awards.jpg',
    published_at: new Date('2026-05-15'),
  },
  {
    title: 'MotoVerse Xtreme Riders Fest 2026 — Goa Edition',
    slug: 'xtreme-riders-fest-2026-goa',
    excerpt: 'Over 5,000 riders gathered in Goa for the biggest MotoVerse riding festival featuring stunts, races, and the Xtreme lineup.',
    content: 'The annual MotoVerse Xtreme Riders Fest returned to Goa with a bang, attracting over 5,000 enthusiasts from across India. The three-day event featured professional stunt shows, amateur racing competitions on the Xtreme 160R, test rides of the Karizma XMR and Mavrick 440, live music performances, and exclusive merchandise drops. Participants also got a sneak peek at upcoming models slated for 2027.',
    category: 'event',
    image_url: '/images/news/riders-fest.jpg',
    published_at: new Date('2026-05-10'),
  },
  {
    title: 'MotoVerse Expands Premia Dealership Network to 50 Cities',
    slug: 'motoverse-expands-premia-network-50-cities',
    excerpt: 'The premium dealership format now spans 50 Indian cities, offering an elevated buying and ownership experience.',
    content: 'MotoVerse has announced the expansion of its Premia dealership network to 50 cities across India, up from 30 cities last year. Premia dealerships offer a premium retail experience with dedicated lounges, personalized vehicle consultations, advanced test ride tracks, and priority service bays. The expansion covers key Tier 2 cities including Jaipur, Lucknow, Chandigarh, Coimbatore, and Vizag. Each new Premia outlet also features a dedicated Vida EV experience zone.',
    category: 'corporate',
    image_url: '/images/news/premia-expansion.jpg',
    published_at: new Date('2026-04-25'),
  },
];

// ──────────────────────────────────────────────
// OFFERS — 4 active
// ──────────────────────────────────────────────
const offers = [
  {
    title: 'Summer Bonanza — ₹5,000 Cashback on Splendor Plus',
    description: 'Get ₹5,000 instant cashback when you purchase a Splendor Plus this summer. Valid on all variants. Combine with exchange offers for even bigger savings!',
    discount_type: 'cashback',
    discount_value: 5000,
    valid_till: new Date('2026-08-31'),
    applicable_on: ['splendor-plus', 'super-splendor', 'hf-deluxe'],
    is_active: true,
  },
  {
    title: 'Xtreme 160R — 0% EMI for 12 Months',
    description: 'Ride home the Xtreme 160R with 0% interest EMI for 12 months through our financing partners. No processing fee. Instant approval.',
    discount_type: 'emi',
    discount_value: 0,
    valid_till: new Date('2026-07-31'),
    applicable_on: ['xtreme-160r', 'xtreme-125r', 'xtreme-200s'],
    is_active: true,
  },
  {
    title: '10% Off on Vida V1 — Go Electric',
    description: 'Enjoy a flat 10% discount on Vida V1 as part of our Go Electric campaign. Additional state EV subsidies applicable. Limited period offer.',
    discount_type: 'percent',
    discount_value: 10,
    valid_till: new Date('2026-09-30'),
    applicable_on: ['vida-v1', 'vida-v2'],
    is_active: true,
  },
  {
    title: 'Karizma XMR — ₹8,000 Flat Discount',
    description: 'Flat ₹8,000 off on the Karizma XMR. Valid on bookings made before July 15. Includes free first-year insurance and road-side assistance.',
    discount_type: 'flat',
    discount_value: 8000,
    valid_till: new Date('2026-07-15'),
    applicable_on: ['karizma-xmr'],
    is_active: true,
  },
];

// ──────────────────────────────────────────────
// SEED RUNNER
// ──────────────────────────────────────────────
const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Clear existing data
    await Product.deleteMany({});
    await Dealer.deleteMany({});
    await News.deleteMany({});
    await Offer.deleteMany({});
    console.log('🗑️  Cleared existing data');

    // Insert seed data
    const insertedProducts = await Product.insertMany(products);
    console.log(`📦 Inserted ${insertedProducts.length} products`);

    const insertedDealers = await Dealer.insertMany(dealers);
    console.log(`🏪 Inserted ${insertedDealers.length} dealers`);

    const insertedNews = await News.insertMany(news);
    console.log(`📰 Inserted ${insertedNews.length} news articles`);

    const insertedOffers = await Offer.insertMany(offers);
    console.log(`🎉 Inserted ${insertedOffers.length} offers`);

    console.log('\n🌱 Seed completed successfully!');
    console.log(`   Products:  ${insertedProducts.length}`);
    console.log(`   Dealers:   ${insertedDealers.length}`);
    console.log(`   News:      ${insertedNews.length}`);
    console.log(`   Offers:    ${insertedOffers.length}`);

    process.exit(0);
  } catch (err) {
    console.error('❌ Seed failed:', err.message);
    process.exit(1);
  }
};

seed();
