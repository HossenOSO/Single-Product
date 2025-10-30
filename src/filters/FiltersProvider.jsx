// src/filters/FiltersProvider.jsx
import React from 'react';
import { buildCounts } from './helpers/counts';

const Ctx = React.createContext(null);

export const useFilters = () => {
  const ctx = React.useContext(Ctx);
  if (!ctx) throw new Error('useFilters must be used inside <FiltersProvider>');
  return ctx;
};

const toS = (x) => (x == null ? '' : String(x));
const toN = (x) => {
  const n = Number(x);
  return Number.isFinite(n) ? n : NaN;
};

export function FiltersProvider({ backend, items, children }) {
  // تطبيع الداتا القادمة من الباك
  const cats = Array.isArray(backend?.categories) ? backend.categories : [];
  const brands = Array.isArray(backend?.filterBrands) ? backend.filterBrands : [];
  const colors = Array.isArray(backend?.colors) ? backend.colors : [];
  const filters = Array.isArray(backend?.filters) ? backend.filters : [];
  const filtersValues = backend?.filtersValues || {};

  // حدود السعر من المنتجات
  const priceBounds = React.useMemo(() => {
    let lo = Number.POSITIVE_INFINITY;
    let hi = Number.NEGATIVE_INFINITY;
    for (const p of Array.isArray(items) ? items : []) {
      const n = toN(p?.price);
      if (Number.isFinite(n)) {
        if (n < lo) lo = n;
        if (n > hi) hi = n;
      }
    }
    if (!Number.isFinite(lo) || !Number.isFinite(hi)) return { min: 0, max: 0 };
    return { min: Math.floor(lo), max: Math.ceil(hi) };
  }, [items]);

  // الحالة
  const [sel, setSel] = React.useState({
    price: { min: undefined, max: undefined },
    categories: new Set(),
    brands: new Set(),
    colors: new Set(),
    dynamic: {}, // key -> Set()
  });

  // سكرول لانهائي
  const INITIAL_CHUNK = 24;
  const CHUNK = 24;
  const [visible, setVisible] = React.useState(INITIAL_CHUNK);

  // أفعال
  const setPrice = (rng = {}) => {
    setSel((prev) => ({ ...prev, price: { min: rng?.min, max: rng?.max } }));
  };

  const toggleSet = (key, val) => {
    setSel((prev) => {
      const next = new Set(prev[key] ?? []);
      next.has(val) ? next.delete(val) : next.add(val);
      return { ...prev, [key]: next };
    });
  };

  const resetSet = (key) => setSel((prev) => ({ ...prev, [key]: new Set() }));

  const toggleDyn = (k, val) => {
    setSel((prev) => {
      const cur = prev.dynamic?.[k] ?? new Set();
      const next = new Set(cur);
      next.has(val) ? next.delete(val) : next.add(val);
      return { ...prev, dynamic: { ...prev.dynamic, [k]: next } };
    });
  };

  const resetDyn = (k) =>
    setSel((prev) => ({ ...prev, dynamic: { ...prev.dynamic, [k]: new Set() } }));

  const resetAll = () => {
    setSel({
      price: { min: undefined, max: undefined },
      categories: new Set(),
      brands: new Set(),
      colors: new Set(),
      dynamic: {},
    });
  };

  // فلترة المنتجات حسب الاختيارات
  const filteredItems = React.useMemo(() => {
    let out = Array.isArray(items) ? items.slice() : [];

    // السعر
    const hasMin = sel.price?.min != null;
    const hasMax = sel.price?.max != null;
    if (hasMin || hasMax) {
      const lo = hasMin ? Number(sel.price.min) : Number.NEGATIVE_INFINITY;
      const hi = hasMax ? Number(sel.price.max) : Number.POSITIVE_INFINITY;
      out = out.filter((p) => {
        const n = toN(p?.price);
        return Number.isFinite(n) && n >= lo && n <= hi;
      });
    }

    // التصنيفات
    if (sel.categories.size) {
      const picked = sel.categories;
      out = out.filter((p) => {
        const cands = [p.categoryId, p.category?.id, p.category?.slug, p.category?.name, p.category]
          .map(toS)
          .filter(Boolean);
        return cands.some((v) => picked.has(v));
      });
    }

    // العلامات
    if (sel.brands.size) {
      const picked = sel.brands;
      out = out.filter((p) => {
        const cands = [p.brandId, p.brand?.id, p.brand?.name, p.brand]
          .map(toS)
          .filter(Boolean);
        return cands.some((v) => picked.has(v));
      });
    }

    // الألوان
    if (sel.colors.size) {
      const picked = sel.colors;
      out = out.filter((p) => {
        const arr = Array.isArray(p.colors) ? p.colors : [];
        const cands = arr.flatMap((c) => [toS(c?.id), toS(c?.name), toS(c)]).filter(Boolean);
        return cands.some((v) => picked.has(v));
      });
    }

    // الصفات الديناميكية لاحقًا مع داتا المنتجات الحقيقية
    return out;
  }, [items, sel]);

  // إعادة ضبط العدّاد عند تغيّر الفلاتر
  React.useEffect(() => {
    setVisible(INITIAL_CHUNK);
  }, [sel]);

  // العدادات
  const counts = React.useMemo(() => buildCounts(filteredItems), [filteredItems]);

  // العناصر المرئية والتحميل الإضافي
  const visibleItems = React.useMemo(
    () => filteredItems.slice(0, visible),
    [filteredItems, visible]
  );
  const hasMore = visible < filteredItems.length;
  const loadMore = () => setVisible((v) => v + CHUNK);

  const value = {
    backend: { cats, brands, colors, filters, filtersValues },
    state: { sel, priceBounds },
    items: {
      all: Array.isArray(items) ? items : [],
      filtered: filteredItems,
      visible: visibleItems,
      hasMore,
    },
    counts,
    actions: { setPrice, toggleSet, resetSet, toggleDyn, resetDyn, resetAll, loadMore },
  };

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}
