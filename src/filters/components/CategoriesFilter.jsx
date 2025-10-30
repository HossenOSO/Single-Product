import React from 'react';
import Fold from '../ui/Fold';
import ListFilter from '../ui/ListFilter';

export default function CategoriesFilter({ data = [], selected, onToggle, onReset, counts = {} }) {
  const options = Array.isArray(data)
    ? data.map(c => {
        const value = String(c?.id ?? c?.slug ?? c?.trendyol_id ?? c?.name);
        const label = String(c?.name ?? c?.trendyol_name ?? '');
        return { value, label, count: counts[value] };
      })
    : [];

  return (
    <Fold title="التصنيفات" dirty={(selected?.size ?? 0) > 0} onReset={onReset}>
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
