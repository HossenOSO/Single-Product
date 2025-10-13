import React, { useMemo, useState, useEffect, useCallback } from "react";
import "../../styles/plpf.css";

import {
  createEmptyState,
  anyActive,
  buildFacetsFromItems,
  applyFilters,
  sortItems,
} from "../../utils/plp.js";

import Toolbar from "./filters/Toolbar.jsx";
import Fold from "./filters/Fold.jsx";
import PriceRange from "./filters/PriceRange.jsx";
import ListFilter from "./filters/ListFilter.jsx";
import ChipsFilter from "./filters/ChipsFilter.jsx";
import SwatchesFilter from "./filters/SwatchesFilter.jsx";
import ProductGrid from "./ProductGrid.jsx";
import Pager from "./Pager.jsx";

export default function PLPFilters({
  items = [],
  facets: facetsProp,
  title = "المنتجات",
  withGrid = true,
  pageSize = 24,
  initialState,
  initialSort = "relevant",
  initialPage = 1,
  onChange,
  showHeaderCount = true, // نعرض العدّاد بجانب العنوان
}) {
  // ===== State =====
  const [state, setState] = useState(initialState || createEmptyState());
  const [sortKey, setSortKey] = useState(initialSort);
  const [page, setPage] = useState(initialPage);

  // ===== Facets =====
  const facets = useMemo(
    () => facetsProp || buildFacetsFromItems(items),
    [facetsProp, items]
  );

  // ===== Filtering/Sorting (محلي) =====
  const filtered = useMemo(() => applyFilters(items, state), [items, state]);
  const sorted = useMemo(() => sortItems(filtered, sortKey), [filtered, sortKey]);

  // ===== Pagination =====
  const totalPages = Math.max(1, Math.ceil(sorted.length / pageSize));
  useEffect(() => setPage(1), [state, sortKey, pageSize]);
  const paged = useMemo(() => {
    const start = (page - 1) * pageSize;
    return sorted.slice(start, start + pageSize);
  }, [sorted, page, pageSize]);

  // ===== Notify parent (اختياري) =====
  useEffect(() => { onChange?.(sorted, state); }, [sorted, state, onChange]);

  const toggleSet = useCallback((part, value) => {
    setState((s) => {
      const nx = new Set(s[part] || []);
      nx.has(value) ? nx.delete(value) : nx.add(value);
      return { ...s, [part]: nx };
    });
  }, []);
  const resetPart = useCallback((part) => {
    setState((s) => ({ ...s, [part]: part === "price" ? {} : new Set() }));
  }, []);

  // ===== Local search/show more =====
  const [brandQuery, setBrandQuery] = useState("");
  const [catQuery, setCatQuery] = useState("");
  const [moreBrands, setMoreBrands] = useState(false);
  const [moreCats, setMoreCats] = useState(false);
  const MAX_VISIBLE = 8;

  const catOptions = useMemo(() => {
    const q = catQuery.trim().toLowerCase();
    const src = facets.categories || [];
    return q ? src.filter(o => String(o.label || o.value).toLowerCase().includes(q)) : src;
  }, [facets.categories, catQuery]);

  const brandOptions = useMemo(() => {
    const q = brandQuery.trim().toLowerCase();
    const src = facets.brands || [];
    return q ? src.filter(o => String(o.label || o.value).toLowerCase().includes(q)) : src;
  }, [facets.brands, brandQuery]);

  return (
    <div className="plpf" dir="rtl">
      {/* Toolbar — بدون عدّاد وبدون فرز، فقط إعادة ضبط الكل */}
      <Toolbar
        showCount={false}
        count={sorted.length}
        showReset={anyActive(state)}
        onResetAll={() => setState(createEmptyState())}
      />

      <div className="plpf-grid">
        {/* Main grid */}
        {withGrid && (
          <main className="plpf-main">
            <div className="plpf-head">
              <h2 className="plpf-title">{title}</h2>

              {/* هنا وضعنا العدّاد + قائمة الفرز جنبًا إلى جنب */}
              <div className="plpf-head-right">
                {showHeaderCount && (
                  <div className="plpf-meta">{sorted.length} منتج</div>
                )}
                <div className="plpf-sort">
                  <select
                    className="plpf-sel"
                    value={sortKey}
                    onChange={(e) => setSortKey(e.target.value)}
                    aria-label="ترتيب حسب"
                  >
                    <option value="relevant">الأكثر صلة</option>
                    <option value="priceAsc">السعر: من الأقل إلى الأعلى</option>
                    <option value="priceDesc">السعر: من الأعلى إلى الأدنى</option>
                    <option value="newest">الأحدث</option>
                  </select>
                </div>
              </div>
            </div>

            <ProductGrid items={paged} />

            <Pager
              page={page}
              totalPages={totalPages}
              onPrev={() => setPage((p) => Math.max(1, p - 1))}
              onNext={() => setPage((p) => Math.min(totalPages, p + 1))}
              onGoto={(n) => setPage(n)}
            />
          </main>
        )}

        {/* Sidebar */}
        <aside className="plpf-side" aria-label="فلاتر المنتجات">
          {facets.price && (
            <Fold
              title="نطاق السعر"
              dirty={state.price.min != null || state.price.max != null}
              onReset={() => resetPart("price")}
              defaultOpen
            >
              <PriceRange
                min={facets.price.min}
                max={facets.price.max}
                value={state.price}
                onChange={(v) => setState((s) => ({ ...s, price: v }))}
              />
            </Fold>
          )}

          {catOptions?.length > 0 && (
            <Fold
              title="التصنيفات"
              dirty={state.categories.size > 0}
              onReset={() => resetPart("categories")}
              defaultOpen
            >
              <ListFilter
                options={moreCats ? catOptions : catOptions.slice(0, MAX_VISIBLE)}
                selected={state.categories}
                onToggle={(v) => toggleSet("categories", v)}
                countSuffix
                searchable
                searchValue={catQuery}
                onSearchChange={setCatQuery}
              />
              {catOptions.length > MAX_VISIBLE && (
                <button className="plpf-morebtn" onClick={() => setMoreCats(v => !v)}>
                  {moreCats ? "عرض أقل" : `عرض المزيد (${catOptions.length - MAX_VISIBLE})`}
                </button>
              )}
            </Fold>
          )}

          {brandOptions?.length > 0 && (
            <Fold
              title="العلامات التجارية"
              dirty={state.brands.size > 0}
              onReset={() => resetPart("brands")}
              defaultOpen
            >
              <ListFilter
                options={moreBrands ? brandOptions : brandOptions.slice(0, MAX_VISIBLE)}
                selected={state.brands}
                onToggle={(v) => toggleSet("brands", v)}
                countSuffix
                searchable
                searchValue={brandQuery}
                onSearchChange={setBrandQuery}
              />
              {brandOptions.length > MAX_VISIBLE && (
                <button className="plpf-morebtn" onClick={() => setMoreBrands(v => !v)}>
                  {moreBrands ? "عرض أقل" : `عرض المزيد (${brandOptions.length - MAX_VISIBLE})`}
                </button>
              )}
            </Fold>
          )}

          {facets.sizes?.length > 0 && (
            <Fold
              title="المقاس"
              dirty={state.sizes.size > 0}
              onReset={() => resetPart("sizes")}
              defaultOpen
            >
              <ChipsFilter
                options={facets.sizes}
                selected={state.sizes}
                onToggle={(v) => toggleSet("sizes", v)}
              />
            </Fold>
          )}

          {facets.colors?.length > 0 && (
            <Fold
              title="الألوان"
              dirty={state.colors.size > 0}
              onReset={() => resetPart("colors")}
              defaultOpen
            >
              <SwatchesFilter
                options={facets.colors}
                selected={state.colors}
                onToggle={(v) => toggleSet("colors", v)}
              />
            </Fold>
          )}

          <Fold
            title="التوفر"
            dirty={!!state.inStock}
            onReset={() => setState((s) => ({ ...s, inStock: false }))}
            defaultOpen={false}
          >
            <label className="plpf-chk">
              <input
                type="checkbox"
                checked={!!state.inStock}
                onChange={(e) =>
                  setState((s) => ({ ...s, inStock: e.target.checked }))
                }
              />
              <span className="plpf-lbl">متوفر في المخزون</span>
            </label>
          </Fold>
        </aside>
      </div>
    </div>
  );
}
