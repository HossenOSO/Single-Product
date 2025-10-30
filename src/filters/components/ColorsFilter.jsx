import React from 'react';
import Fold from '../ui/Fold';
import SwatchesFilter from '../ui/SwatchesFilter';

export default function ColorsFilter({ data = [], selected, onToggle, onReset, counts = {} }) {
  const options = Array.isArray(data)
    ? data.map(col => {
        const value = String(col?.id ?? col?.trendyol_id ?? col?.name);
        const label = String(col?.name ?? col?.trendyol_name ?? '');
        const hex   = col?.code ?? null;
        return { value, label, hex, count: counts[value] };
      })
    : [];

  return (
    <Fold title="الألوان" dirty={(selected?.size ?? 0) > 0} onReset={onReset}>
      <SwatchesFilter
        options={options}
        selected={selected}
        onToggle={(val) => onToggle(val)}
      />
    </Fold>
  );
}
