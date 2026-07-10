export const SITE = {
  name: "GSB Holidays",
  shortName: "GSB",
  tagline: "Lakeside Camping & Resort",
  headline: "Escape to the",
  headlineAccent: "Water's Edge",
  subheadline:
    "Luxury villas, glamping tents and lakeside cottages, wrapped in nature, adventure and warm hospitality.",
  location: "Pawna Lake, Lonavala, Maharashtra",
  phone: "+91 84529 89850",
  email: "gsbholidays@gmail.com",
  address: "GSB Holidays, Mumbai, Maharashtra, India",
  social: {
    instagram: "https://www.instagram.com/pawnalake238",
    facebook: "https://www.facebook.com/profile.php?id=61584727873937",
    whatsapp: "https://wa.me/918452989850",
  },
  mapEmbedQuery: "Pawna Lake, Lonavala, Maharashtra",
};

export const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Packages", href: "/packages" },
  { label: "Gallery", href: "/gallery" },
  { label: "Contact", href: "/contact" },
];

export type Package = {
  slug: string;
  name: string;
  type: string;
  price: number;
  priceUnit: string;
  maxGuests: number;
  description: string;
  amenities: string[];
  image: string;
  images?: string[];
  video?: string | null;
};

export const PACKAGES: Package[] = [
  {
    slug: "gsb-royal-villa",
    name: "GSB Royal Villa",
    type: "Villa",
    price: 12999,
    priceUnit: "per night",
    maxGuests: 6,
    description:
      "A private lakeview villa with a wraparound deck, plush interiors and uninterrupted sunset views.",
    amenities: ["Private deck", "AC bedrooms", "Lake view", "Breakfast included", "Bonfire access"],
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1600&auto=format&fit=crop",
  },
  {
    slug: "gsb-lakeview-cottage",
    name: "GSB Lakeview Cottage",
    type: "Cottage",
    price: 8499,
    priceUnit: "per night",
    maxGuests: 4,
    description:
      "A cosy stone-and-timber cottage steps away from the water, perfect for family getaways.",
    amenities: ["Garden seating", "Lake view", "Breakfast included", "Bonfire access"],
    image:
      "https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?q=80&w=1600&auto=format&fit=crop",
  },
  {
    slug: "gsb-luxury-glamping-tent",
    name: "GSB Luxury Glamping Tent",
    type: "Glamping",
    price: 6999,
    priceUnit: "per night",
    maxGuests: 3,
    description:
      "Premium Swiss-cottage tents with hotel-grade beds, ensuite bathrooms and a private sit-out under the stars.",
    amenities: ["Ensuite bathroom", "Premium bedding", "Stargazing deck", "Dinner included"],
    image:
      "https://images.unsplash.com/photo-1517824806704-9040b037703b?q=80&w=1600&auto=format&fit=crop",
  },
  {
    slug: "gsb-riverside-camp-tent",
    name: "GSB Riverside Camp Tent",
    type: "Camping",
    price: 3499,
    priceUnit: "per night",
    maxGuests: 2,
    description:
      "Classic dome tents right by the water's edge, with a bonfire, live music and starlit skies.",
    amenities: ["Shared washrooms", "Bonfire & music", "Dinner & breakfast", "Lake activities"],
    image:
      "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?q=80&w=1600&auto=format&fit=crop",
  },
];

export type Activity = {
  name: string;
  description: string;
  icon: "kayak" | "bonfire" | "stars" | "trek" | "water" | "music";
};

export const ACTIVITIES: Activity[] = [
  {
    name: "Kayaking & Boating",
    description: "Paddle across still waters at sunrise or drift lazily at sunset.",
    icon: "kayak",
  },
  {
    name: "Bonfire & BBQ Grill",
    description: "Gather around the fire with grilled food and warm conversation.",
    icon: "bonfire",
  },
  {
    name: "Stargazing Deck",
    description: "Unpolluted night skies make every star visible from camp.",
    icon: "stars",
  },
  {
    name: "Nature Trekking",
    description: "Guided trails through the hills surrounding the lake.",
    icon: "trek",
  },
  {
    name: "Water Sports",
    description: "Jet skiing, banana boat rides and more on the lake.",
    icon: "water",
  },
  {
    name: "Campfire Music Nights",
    description: "Live acoustic sets under the open sky every weekend.",
    icon: "music",
  },
];

export type Testimonial = {
  name: string;
  location: string;
  rating: number;
  quote: string;
};

export const TESTIMONIALS: Testimonial[] = [
  {
    name: "Ananya Rao",
    location: "Pune",
    rating: 5,
    quote:
      "The Royal Villa's deck view at sunrise alone was worth the trip. GSB Holidays took care of every detail.",
  },
  {
    name: "Vikram Shah",
    location: "Mumbai",
    rating: 5,
    quote:
      "Our glamping tent felt like a boutique hotel room dropped by the lake. Loved the bonfire nights.",
  },
  {
    name: "Meera Nair",
    location: "Bengaluru",
    rating: 4,
    quote:
      "Great activities lineup — kayaking in the morning and stargazing at night. Staff were wonderful hosts.",
  },
  {
    name: "Rohan Deshmukh",
    location: "Nashik",
    rating: 5,
    quote:
      "Booked the Riverside Camp Tent for a friends' trip — the music nights and food made it unforgettable.",
  },
];

export const GALLERY_IMAGES = [
  "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?q=80&w=1400&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1400&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1517824806704-9040b037703b?q=80&w=1400&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?q=80&w=1400&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1487730116645-74489c95b41b?q=80&w=1400&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1508873696983-2dfd5898f08b?q=80&w=1400&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?q=80&w=1400&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1523712999610-f77fbcfc3843?q=80&w=1400&auto=format&fit=crop",
];

export const EXPLORE_LOCATIONS = [
  {
    name: "Pawna Lake Backwaters",
    description: "Still, open water right at camp — perfect for sunrise boat rides.",
    image:
      "https://images.unsplash.com/photo-1500534623283-312aade485b7?q=80&w=1400&auto=format&fit=crop",
  },
  {
    name: "Tikona Fort Trek",
    description: "A popular sunrise trek a short drive from the lake.",
    image:
      "https://images.unsplash.com/photo-1470770903676-69b98201ea1c?q=80&w=1400&auto=format&fit=crop",
  },
  {
    name: "Lohagad Fort",
    description: "A historic hill fort nearby, ideal for a half-day outing.",
    image:
      "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=1400&auto=format&fit=crop",
  },
];
