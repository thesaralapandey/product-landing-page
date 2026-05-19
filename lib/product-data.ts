export type ProductOffer = {
  sku: string;
  name: string;
  category: string;
  badge: string;
  basePrice: number;
  offerPrice: number;
  savingsLabel: string;
  items?: string[];
};

export const productData = {
  brandName: "Twakka Tukka",
  productName: "Food",
  heroHeadline: "Fresh Bites, Spicy Nights, Pure Street Delight",
  heroSubheadline:
    "From juicy momos to smoky chowmein and crunchy panipuri, every order is made to satisfy cravings fast.",
  description:
    "Craving real street flavors? We bring you the bold taste of your favorites hot, fresh, and made to hit different every single time. From juicy, flavor-packed momos to smoky, wok-tossed chowmein, crispy panipuri, and signature chatpate, every bite is loaded with authentic spices and irresistible street-style kick.",
  shortBenefitsLine:
    "Hot. Fresh. Addictive. Authentic street taste, made fresh, delivered fast — satisfying every craving instantly.",
  heroImage: {
    src: "/products/food-collage.png",
    alt: "Twakka Tukka street food platter",
  },
  galleryImages: [
    {
      src: "/products/food-collage.png",
      alt: "Twakka Tukka food collage",
    },
    {
      src: "/products/food-feature-1.png",
      alt: "Twakka Tukka spicy food close-up",
    },
    {
      src: "/products/food-feature-2.png",
      alt: "Twakka Tukka momo close-up",
    },
  ],
  trustHighlights: [
    {
      title: "Cash on Delivery",
      copy: "Place your order now and pay when your food arrives.",
    },
    {
      title: "Fast Delivery",
      copy: "Quick preparation and fast handoff for hot, fresh food.",
    },
    {
      title: "Customer Support",
      copy: "Our team follows up quickly to confirm each order.",
    },
    {
      title: "Easy Ordering",
      copy: "Choose your item, submit your details, and we handle the rest.",
    },
  ],
  benefits: [
    {
      title: "Instant Craving Satisfaction",
      description:
        "Hot, spicy, tangy flavors that hit immediately without the wait or disappointment.",
    },
    {
      title: "Authentic Street Taste",
      description:
        "Real local flavor just like your favorite street stalls: bold, nostalgic, and addictive.",
    },
    {
      title: "Fresh & Made-to-Order",
      description:
        "Prepared after the order so every bite feels hot, juicy, and full of flavor.",
    },
    {
      title: "Perfect Flavor Balance",
      description:
        "Spicy, tangy, and crunchy textures come together in one proper comfort-food hit.",
    },
  ],
  whyBuy: [
    {
      icon: "🔥",
      title: "Fresh on every order",
      description:
        "Everything is prepared after ordering to keep the taste bold and the texture right.",
    },
    {
      icon: "⚡",
      title: "Fast comfort food",
      description:
        "Quick delivery and free COD ordering make this an easy answer to sudden cravings.",
    },
    {
      icon: "🌶️",
      title: "Street-style flavor",
      description:
        "Each bite brings spicy, tangy, nostalgic street food energy without compromise.",
    },
  ],
  offers: [
    {
      sku: "momo",
      name: "Momo",
      category: "Individual Item",
      badge: "Best Seller",
      basePrice: 150,
      offerPrice: 120,
      savingsLabel: "Save Rs. 30 today",
    },
    {
      sku: "chowmein",
      name: "Chowmein",
      category: "Individual Item",
      badge: "Hot Deal",
      basePrice: 180,
      offerPrice: 150,
      savingsLabel: "Save Rs. 30 today",
    },
    {
      sku: "chatpate",
      name: "Chatpate",
      category: "Individual Item",
      badge: "Street Favorite",
      basePrice: 100,
      offerPrice: 80,
      savingsLabel: "Save Rs. 20 today",
    },
    {
      sku: "panipuri",
      name: "Panipuri",
      category: "Individual Item",
      badge: "Crunchy Pick",
      basePrice: 80,
      offerPrice: 60,
      savingsLabel: "Save Rs. 20 today",
    },
    {
      sku: "combo-street-special",
      name: "Combo 1: Street Special",
      category: "Combo Deal",
      badge: "Best Value",
      basePrice: 330,
      offerPrice: 250,
      savingsLabel: "Save Rs. 80 today",
      items: ["Momo", "Chowmein", "Drink"],
    },
    {
      sku: "combo-spicy-lover",
      name: "Combo 2: Spicy Lover Pack",
      category: "Combo Deal",
      badge: "Fan Favorite",
      basePrice: 260,
      offerPrice: 200,
      savingsLabel: "Save Rs. 60 today",
      items: ["Chatpate", "Panipuri", "Momo"],
    },
    {
      sku: "combo-full-feast",
      name: "Combo 3: Full Feast",
      category: "Combo Deal",
      badge: "Biggest Saving",
      basePrice: 500,
      offerPrice: 350,
      savingsLabel: "Save Rs. 150 today",
      items: ["Momo", "Chowmein", "Chatpate", "Panipuri", "Drink"],
    },
  ] as ProductOffer[],
  testimonials: [
    {
      name: "Laksh P.",
      quote:
        "Best momos I’ve had in a long time! Fresh, juicy, and full of flavor. The chatpate is next level.",
    },
    {
      name: "Kamala Devi",
      quote:
        "Chowmein tastes exactly like street-style but even cleaner and better. Super fast service too!",
    },
    {
      name: "Sarbochha P.",
      quote:
        "Panipuri was so crispy and spicy. I ended up ordering twice in the same week.",
    },
    {
      name: "Pratigya P.",
      quote:
        "Affordable, tasty, and always fresh. This place has become my go-to for quick cravings.",
    },
    {
      name: "Chahana K.",
      quote:
        "The combo deals are worth it. Huge portion, great taste, and perfect for sharing with friends.",
    },
  ],
  faqs: [
    {
      question: "Are your foods freshly made?",
      answer:
        "Yes, all our food items are prepared fresh after you place your order to ensure maximum taste and quality.",
    },
    {
      question: "Do you offer delivery?",
      answer:
        "Yes, we offer fast delivery so your food arrives hot, fresh, and ready to enjoy.",
    },
    {
      question: "What are your combo deals?",
      answer:
        "We offer special combo packs that include momo, chowmein, chatpate, and panipuri at discounted prices for better value.",
    },
    {
      question: "Are your prices affordable?",
      answer:
        "Yes, our pricing is budget-friendly so everyone can enjoy delicious street food without spending too much.",
    },
    {
      question: "Do you use hygienic ingredients?",
      answer:
        "Absolutely. We focus on clean preparation and quality ingredients to ensure safe and tasty food.",
    },
    {
      question: "How can I place an order?",
      answer:
        "You can order directly through the website checkout form, and our team will call you soon to confirm your cash-on-delivery order.",
    },
  ],
} as const;
