// src/filters/index.jsx
import React from 'react';
import { FiltersProvider, useFilters } from './FiltersProvider';

import CategoriesFilter from './components/CategoriesFilter';
import BrandsFilter from './components/BrandsFilter';
import ColorsFilter from './components/ColorsFilter';
import DynamicAttributesFilter from './components/DynamicAttributesFilter';
import PriceFilter from './components/PriceFilter';

export { FiltersProvider, useFilters };

export function FiltersSidebar() {
  const { backend, state, actions, counts } = useFilters();

  return (
    <>
      {/* زر إعادة ضبط أعلى العمود */}
      <div
        className="plpf-side-actions"
        style={{ display: 'flex', justifyContent: 'flex-start', marginBottom: 8 }}
      >
        <button className="plpf-resetall" onClick={actions.resetAll}>
          إعادة ضبط الكل
        </button>
      </div>

      {/* نطاق السعر */}
      <PriceFilter />

      {/* التصنيفات */}
      <CategoriesFilter
        data={backend.cats}
        selected={state.sel.categories}
        onToggle={(v) => actions.toggleSet('categories', String(v))}
        onReset={() => actions.resetSet('categories')}
        counts={counts.categories}
      />

      {/* العلامات التجارية */}
      <BrandsFilter
        data={backend.brands}
        selected={state.sel.brands}
        onToggle={(v) => actions.toggleSet('brands', String(v))}
        onReset={() => actions.resetSet('brands')}
        counts={counts.brands}
      />

      {/* الألوان */}
      <ColorsFilter
        data={backend.colors}
        selected={state.sel.colors}
        onToggle={(v) => actions.toggleSet('colors', String(v))}
        onReset={() => actions.resetSet('colors')}
        counts={counts.colors}
      />

      {/* الصفات الديناميكية */}
      <DynamicAttributesFilter
        filters={backend.filters}
        filtersValues={backend.filtersValues}
        selectedMap={state.sel.dynamic}
        onToggle={actions.toggleDyn}
        onReset={actions.resetDyn}
      />
    </>
  );
}
