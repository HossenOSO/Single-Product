import React from 'react';
import Fold from '../ui/Fold';
import ListFilter from '../ui/ListFilter';

export default function BrandsFilter({ data = [], selected, onToggle, onReset, counts = {} }) {
  const options = Array.isArray(data)
    ? data.map(b => {
        const value = String(b?.id ?? b?.trendyol_id ?? b?.slug ?? b?.name);
        const label = String(b?.name ?? '');
        return { value, label, count: counts[value] };
      })
    : [];

  return (
    <Fold title="العلامات التجارية" dirty={(selected?.size ?? 0) > 0} onReset={onReset}>
      <ListFilter
        options={options}
        selected={selected}
        onToggle={(val) => onToggle(val)}
        searchable
        countSuffix
      />
    </Fold>
  );
}
