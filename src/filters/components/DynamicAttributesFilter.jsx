import React from 'react';
import Fold from '../ui/Fold';
import ListFilter from '../ui/ListFilter';

export default function DynamicAttributesFilter({
  filters = [],
  filtersValues = {},
  selectedMap = {},
  onToggle,
  onReset,
}) {
  const getValuesByAttrId = (id, trendyolId) =>
    filtersValues[id] ||
    filtersValues[String(id)] ||
    filtersValues[trendyolId] ||
    filtersValues[String(trendyolId)] ||
    [];

  const groups = React.useMemo(() => {
    const out = [];
    for (const att of Array.isArray(filters) ? filters : []) {
      const attId = att?.id ?? Number(att?.trendyol_id);
      const key = `attr_${attId}`;
      const label = att?.name ?? att?.attribute_translations?.[0]?.name ?? `Attr ${attId}`;
      const raw = getValuesByAttrId(attId, att?.trendyol_id);
      const options = raw.map(v => ({
        value: String(v?.id ?? v?.trendyol_id ?? v?.value),
        label: String(v?.value ?? ''),
      }));
      out.push({ key, label, options });
    }
    return out;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters, filtersValues]);

  return (
    <>
      {groups.map(g => (
        <Fold
          key={g.key}
          title={g.label}
          dirty={(selectedMap?.[g.key]?.size ?? 0) > 0}
          onReset={() => onReset(g.key)}
        >
          <ListFilter
            options={g.options}
            selected={selectedMap?.[g.key] ?? new Set()}
            onToggle={(val) => onToggle(g.key, val)}
            searchable
            countSuffix
          />
        </Fold>
      ))}
    </>
  );
}
