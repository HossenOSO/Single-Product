// src/pages/PLPFiltersPage.jsx
import React from 'react';
import PLPFilters from '../filters/PLPFilters';

import { FiltersProvider, FiltersSidebar, useFilters } from '../filters';

import backend from '../data/backendMock.json';
import plpDemoItems from '../data/plpDemoItems';

function PageContent() {
  const { items, actions } = useFilters();

  return (
    <PLPFilters
      title="المنتجات"
      items={items.visible}
      total={items.filtered.length}
      onResetAll={actions.resetAll}
      renderFiltersSide={() => <FiltersSidebar />}
      hasMore={items.hasMore}
      onLoadMore={items.hasMore ? actions.loadMore : undefined}
    />
  );
}

export default function PLPFiltersPage() {
  return (
    <div className="page pad">
      <FiltersProvider backend={backend} items={plpDemoItems}>
        <PageContent />
      </FiltersProvider>
    </div>
  );
}
