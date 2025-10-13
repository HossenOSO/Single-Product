// src/utils/plp.js

export function createEmptyState() {
  return {
    price: {},
    categories: new Set(),
    brands: new Set(),
    sizes: new Set(),
    colors: new Set(),
    materials: new Set(),
    patterns: new Set(),
    seasons: new Set(),
    inStock: false,
  };
}

export function anyActive(state) {
  return !!(
    state.inStock ||
    state.price.min != null ||
    state.price.max != null ||
    state.categories.size ||
    state.brands.size ||
    state.sizes.size ||
    state.colors.size ||
    state.materials.size ||
    state.patterns.size ||
    state.seasons.size
  );
}

export function buildFacetsFromItems(items) {
  const uniq = (arr) => [...new Set(arr)];
  const countBy = (arr) => arr.reduce((m, x) => ((m[x] = (m[x] || 0) + 1), m), {});
  const prices = items.map((p) => Number(p.price || 0));
  const hasPrices = prices.length > 0;

  const brandCount = countBy(items.map((p) => String(p.brand || "").toLowerCase()));
  const catCount   = countBy(items.map((p) => String(p.category || "").toLowerCase()));
  const sizeCount  = countBy(items.flatMap((p) => p.sizes || []));
  const colorCount = countBy(items.flatMap((p) => (p.colors || []).map(String)));

  return {
    price: hasPrices ? { min: Math.floor(Math.min(...prices)), max: Math.ceil(Math.max(...prices)) } : null,
    categories: uniq(Object.keys(catCount)).map((v) => ({ value: v, label: v, count: catCount[v] })),
    brands:     uniq(Object.keys(brandCount)).map((v) => ({ value: v, label: v, count: brandCount[v] })),
    sizes:      uniq(Object.keys(sizeCount)).map((v) => ({ value: v, label: v, count: sizeCount[v] })),
    colors:     uniq(Object.keys(colorCount)).map((v) => ({ value: v, label: v, hex: v, count: colorCount[v] })),
    materials:  [],
    patterns:   [],
    seasons:    [],
  };
}

export function applyFilters(items, f) {
  const norm = (x) => String(x).toLowerCase().trim();
  const colorsNeed = new Set([...f.colors].map(norm));
  return items.filter((p) => {
    if (f.price.min != null && Number(p.price) < Number(f.price.min)) return false;
    if (f.price.max != null && Number(p.price) > Number(f.price.max)) return false;
    if (f.categories.size && !f.categories.has(String(p.category || "").toLowerCase())) return false;
    if (f.brands.size && !f.brands.has(String(p.brand || "").toLowerCase())) return false;
    if (f.sizes.size) {
      const ps = new Set(p.sizes || []);
      let ok = false; for (const s of f.sizes) if (ps.has(s)) { ok = true; break; }
      if (!ok) return false;
    }
    if (f.colors.size) {
      const pc = new Set((p.colors || []).map(norm));
      let ok = false; for (const c of colorsNeed) if (pc.has(c)) { ok = true; break; }
      if (!ok) return false;
    }
    if (f.materials.size && !f.materials.has(p.material)) return false;
    if (f.patterns.size && !f.patterns.has(p.pattern)) return false;
    if (f.seasons.size && !f.seasons.has(p.season)) return false;
    if (f.inStock && !p.inStock) return false;
    return true;
  });
}

export function sortItems(list, sortKey) {
  const arr = [...list];
  switch (sortKey) {
    case "priceAsc":  return arr.sort((a, b) => (a.price || 0) - (b.price || 0));
    case "priceDesc": return arr.sort((a, b) => (b.price || 0) - (a.price || 0));
    case "newest":    return arr.sort((a, b) => new Date(b.date || 0) - new Date(a.date || 0));
    default:          return arr; // relevant
  }
}
