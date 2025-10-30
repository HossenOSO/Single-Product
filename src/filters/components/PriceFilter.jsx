import React from 'react';
import Fold from '../ui/Fold';
import PriceRange from '../ui/PriceRange';
import { useFilters } from '../FiltersProvider';

export default function PriceFilter() {
  const { state, actions } = useFilters();
  const dirty = state.sel.price?.min != null || state.sel.price?.max != null;

  return (
    <Fold title="السعر" dirty={dirty} onReset={() => actions.setPrice({})}>
      <PriceRange
        min={state.priceBounds?.min ?? 0}
        max={state.priceBounds?.max ?? 0}
        value={state.sel.price}
        onChange={actions.setPrice}
        currency="TRY"
        currencyPosition="suffix"
      />
    </Fold>
  );
}
