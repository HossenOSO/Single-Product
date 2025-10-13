// src/components/plp/filters/SwatchesFilter.jsx
import React from "react";

export default function SwatchesFilter({ options = [], selected = new Set(), onToggle }) {
  return (
    <div className="plpf-swatches" role="list">
      {options.map((o) => {
        const active = selected.has(o.value);
        return (
          // eslint-disable-next-line jsx-a11y/role-supports-aria-props
          <button
            key={o.value}
            type="button"
            role="listitem"
            className={`plpf-swatch ${active ? "is-active" : ""}`}
            title={o.label || o.value}
            aria-label={o.label || o.value}
            aria-pressed={active ? "true" : "false"}
            onClick={() => onToggle?.(o.value)}
          >
            <span className="plpf-dot" style={{ background: o.hex || o.value }} />
          </button>
        );
      })}
    </div>
  );
}
