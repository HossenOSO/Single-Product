export const mockProduct = {
  id: "iphone-17-pro-max",
  title: "IPHONE 17 PRO MAX 256GB/512GB 1 SIM + eSIM",
  brand: "Apple",
  brandUrl: "/brand/apple",
  category: { name: "موبايلات", url: "/c/mobiles" },
  seller: {
    id: "mega-store",
    name: "Mega Store Mobile",
    logo: "https://dummyimage.com/80x80/111723/ffffff&text=MS",
    storeUrl: "/store/mega-store",
    followers: 486200,
    score: 9.7,
    successful: true
  },
  rating: { value: 4.2, count: 37 },
  price: 87360,
  currency: "TRY",
  stock: 10,
  shippingDays: 7,
  qaCount: 121,

  images: [
    { src: "https://picsum.photos/id/1011/900/1200", alt: "عرض أمامي" },
    { src: "https://picsum.photos/id/1012/900/1200", alt: "عرض جانبي" },
    { src: "https://picsum.photos/id/1013/900/1200", alt: "عرض خلفي" },
    { src: "https://picsum.photos/id/1015/900/1200", alt: "تفاصيل مقربة" }
  ],
  memories: ["256GB", "512GB"],
  colors: [
    { name: "أزرق", hex: "#1f3a5c" },
    { name: "رمادي", hex: "#6b737f" },
    { name: "أبيض", hex: "#f4f5f7" }
  ],
  description:
    "شريحة A19 Pro بدقة 3nm. شاشة 6.9 OLED 120Hz بدقة 2868×1320. شريحة A19 Pro بدقة 3nm. شاشة 6.9 OLED 120Hz بدقة 2868×1320. شريحة A19 Pro بدقة 3nm. شاشة 6.9 OLED 120Hz بدقة 2868×1320.",
  specs: ["بطارية 4700mAh", "شحن سريع", "كاميرات 48MP", "هيكل ألومنيوم", "بطارية 4700mAh", "شحن سريع", "كاميرات 48MP", "هيكل ألومنيوم"],

  /* بائعون آخرون للمنتج */
  otherSellers: [
    { name:"TechOne", logo:"https://via.placeholder.com/56x56?text=T1", storeUrl:"#", offerUrl:"#", price:3299, rating:4.6, shipping:"شحن سريع", delivery:"2-4 أيام" },
    { name:"Mega Store", logo:"https://via.placeholder.com/56x56?text=MS", storeUrl:"#", offerUrl:"#", price:3190, rating:4.2, shipping:"دفع عند الاستلام", delivery:"5-7 أيام" },
  
  ],

  /* الأقسام السفلية */
  similar: [
    { id: "p1", title: "iPhone 17 Pro 256GB", price: 79990, image: "https://picsum.photos/id/1050/600/600" },
    { id: "p2", title: "iPhone 16 Pro Max 256GB", price: 72990, image: "https://picsum.photos/id/1060/600/600" },
    { id: "p3", title: "Samsung S25 Ultra 256GB", price: 68990, image: "https://picsum.photos/id/1044/600/600" },
    { id: "p4", title: "Xiaomi 15 Pro 256GB", price: 45990, image: "https://picsum.photos/id/1033/600/600" },
    { id: "p1b", title: "iPhone 17 Pro 256GB", price: 79990, image: "https://picsum.photos/id/1050/600/600" },
    { id: "p2b", title: "iPhone 16 Pro Max 256GB", price: 72990, image: "https://picsum.photos/id/1060/600/600" },
    { id: "p3b", title: "Samsung S25 Ultra 256GB", price: 68990, image: "https://picsum.photos/id/1044/600/600" },
    { id: "p4b", title: "Xiaomi 15 Pro 256GB", price: 45990, image: "https://picsum.photos/id/1033/600/600" }
  ],
  collections: [
    { name: "هواتف للألعاب", url: "#" },
    { name: "هواتف بكاميرا قوية", url: "#" },
    { name: "هواتف بطارية كبيرة", url: "#" },
    { name: "هواتف شحن سريع", url: "#" },
    { name: "هواتف للألعاب", url: "#" },
    { name: "هواتف بكاميرا قوية", url: "#" },
    { name: "هواتف بطارية كبيرة", url: "#" },
    { name: "هواتف شحن سريع", url: "#" }
  ],
  popular: [
    { id: "pp1", title: "AirPods Pro 2", price: 8990, image: "https://picsum.photos/id/1080/600/600" },
    { id: "pp2", title: "Apple Watch 10", price: 13490, image: "https://picsum.photos/id/1084/600/600" },
    { id: "pp3", title: "iPad Air M3", price: 22990, image: "https://picsum.photos/id/1074/600/600" },
    { id: "pp4", title: "MagSafe Charger", price: 1490, image: "https://picsum.photos/id/1070/600/600" },
    { id: "pp1b", title: "AirPods Pro 2", price: 8990, image: "https://picsum.photos/id/1080/600/600" },
    { id: "pp2b", title: "Apple Watch 10", price: 13490, image: "https://picsum.photos/id/1084/600/600" },
    { id: "pp3b", title: "iPad Air M3", price: 22990, image: "https://picsum.photos/id/1074/600/600" },
    { id: "pp4b", title: "MagSafe Charger", price: 1490, image: "https://picsum.photos/id/1070/600/600" }
  ],
  recommended: [
    { id: "r1", title: "جراب حماية iPhone 17", price: 690, image: "https://picsum.photos/id/1027/600/600" },
    { id: "r2", title: "واقٍ زجاجي للشاشة", price: 350, image: "https://picsum.photos/id/1024/600/600" },
    { id: "r3", title: "سماعات بلوتوث", price: 1290, image: "https://picsum.photos/id/1020/600/600" },
    { id: "r4", title: "شاحن سريع 35W", price: 890, image: "https://picsum.photos/id/1019/600/600" },
    { id: "r1b", title: "جراب حماية iPhone 17", price: 690, image: "https://picsum.photos/id/1027/600/600" },
    { id: "r2b", title: "واقٍ زجاجي للشاشة", price: 350, image: "https://picsum.photos/id/1024/600/600" },
    { id: "r3b", title: "سماعات بلوتوث", price: 1290, image: "https://picsum.photos/id/1020/600/600" },
    { id: "r4b", title: "شاحن سريع 35W", price: 890, image: "https://picsum.photos/id/1019/600/600" }
  ]
};

export const mockReviews = {
  data: [
    { user_name: "أحمد",   rating: 5, created_at: "2025-08-10", comment: "ممتاز" },
    { user_name: "سارة",   rating: 4, created_at: "2025-08-11", comment: "جيد" },
    { user_name: "ليلى",   rating: 5, created_at: "2025-08-12", comment: "الشحن سريع والجهاز أصلي" },
    { user_name: "محمد",   rating: 3, created_at: "2025-08-12", comment: "السعر مرتفع قليلاً" },
    { user_name: "رامي",   rating: 4, created_at: "2025-08-13", comment: "الأداء قوي والبطارية مناسبة" },
    { user_name: "نور",    rating: 5, created_at: "2025-08-14", comment: "الكاميرا رائعة" },
    { user_name: "هالة",   rating: 4, created_at: "2025-08-15", comment: "تغليف جيد وخدمة ممتازة" },
    { user_name: "فهد",    rating: 2, created_at: "2025-08-15", comment: "تأخر في التوصيل" },
    { user_name: "مروان",  rating: 5, created_at: "2025-08-16", comment: "أفضل هاتف جربته" },
    { user_name: "دانا",   rating: 4, created_at: "2025-08-17", comment: "مطابق للوصف" },
    { user_name: "جميلة",  rating: 5, created_at: "2025-08-18", comment: "بطارية تصمد يوم كامل" },
    { user_name: "أنس",    rating: 3, created_at: "2025-08-19", comment: "حرارة بسيطة أثناء اللعب" }
  ],
  links: { first: null, last: null, prev: null, next: null },
  meta: { current_page: 1, last_page: 1, total: 12, links: [{ url: null, label: "1", active: true }] }
};
