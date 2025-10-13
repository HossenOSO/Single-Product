// src/data/plpDemoItems.js
import { mockProduct } from "./productMock.js";
// 1) ابدأ ببياناتك الحالية من mockProduct
const base = [
  ...(mockProduct.similar || []),
  ...(mockProduct.popular || []),
  ...(mockProduct.recommended || []),
];

const seed = base.map((x, i) => ({
  id: x.id || `seed-${i}`,
  title: x.title || x.name || `Product ${i + 1}`,
  image: x.image || x.img || (Array.isArray(x.images) ? x.images[0] : undefined),
  price:
    Number.isFinite(Number(x.price || x.salePrice))
      ? Number(x.price || x.salePrice)
      : Math.round(300 + Math.random() * 1200),
  brand: String(x.brand || "brand").toLowerCase(),
  category: String(x.category?.name || "category").toLowerCase(),
  sizes: x.sizes || ["40", "41", "42", "43"].slice(0, 2 + (i % 3)),
  colors: x.colors || ["black", "red", "blue", "white"].slice(0, 1 + (i % 4)),
  inStock: x.inStock ?? (i % 5 !== 0),
  date: x.date || new Date(Date.now() - i * 86400000).toISOString(),
}));

// 2) قوائم كبيرة من التصنيفات والبراندات للاختبار
const CATEGORIES = [
  "sneakers","boots","sandals","running","football","basketball","outdoor","casual",
  "formal","slippers","trail","kids-shoes","training","tennis","hiking","loafers",
];
const BRANDS = [
  "nike","adidas","puma","reebok","asics","new balance","skechers","under armour",
  "mizuno","hummel","lotto","fila","diadora","converse","on","salomon",
];

const SIZES = ["39","40","41","42","43","44","45"];
const COLORS = ["black","white","red","blue","green","yellow","gray","navy","beige"];

let idCounter = seed.length;
const EXTRA = [];
const EXTRA_COUNT = 80; 
for (let i = 0; i < EXTRA_COUNT; i++) {
  const cat = CATEGORIES[i % CATEGORIES.length];
  const brand = BRANDS[i % BRANDS.length];

  EXTRA.push({
    id: `extra-${idCounter + i}`,
    title: `${brand.toUpperCase()} ${cat.replace(/-/g, " ")} ${i + 1}`,
    image: undefined, // placeholder مربع من الواجهة
    price: Math.round(150 + (i % 25) * 35 + Math.random() * 60),
    brand,                 
    category: cat,        
    sizes: SIZES.slice(0, 3 + (i % 4)),
    colors: COLORS.slice(0, 1 + (i % 5)),
    inStock: i % 7 !== 0,
    date: new Date(Date.now() - i * 86400000).toISOString(),
  });
}

// 4) النتيجة النهائية
const plpDemoItems = [...seed, ...EXTRA];

export default plpDemoItems;
