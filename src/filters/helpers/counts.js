// عدادات مبنية من قائمة المنتجات
const toS = (x) => (x == null ? '' : String(x));

export function buildCounts(items) {
  const counts = {
    categories: Object.create(null),
    brands: Object.create(null),
    colors: Object.create(null),
  };

  for (const p of Array.isArray(items) ? items : []) {
    const catCands = [p.categoryId, p.category?.id, p.category?.slug, p.category?.name, p.category]
      .map(toS).filter(Boolean);
    for (const v of new Set(catCands)) counts.categories[v] = (counts.categories[v] || 0) + 1;

    const brCands = [p.brandId, p.brand?.id, p.brand?.name, p.brand]
      .map(toS).filter(Boolean);
    for (const v of new Set(brCands)) counts.brands[v] = (counts.brands[v] || 0) + 1;

    const cols = Array.isArray(p.colors) ? p.colors : [];
    const colCands = cols.flatMap((c) => [toS(c?.id), toS(c?.name), toS(c)]).filter(Boolean);
    for (const v of new Set(colCands)) counts.colors[v] = (counts.colors[v] || 0) + 1;
  }

  return counts;
}
