// src/components/plp/filters/ChipsFilter.jsx
import React from "react";

export default function ChipsFilter({ options = [], selected = new Set(), onToggle }) {
  return (
    <div className="plpf-chips" role="list">
      {options.map((o) => {
        const active = selected.has(o.value);
        return (
          // eslint-disable-next-line jsx-a11y/role-supports-aria-props
          <button
            key={o.value}
            type="button"
            role="listitem"
            className={`plpf-chip ${active ? "is-active" : ""}`}
            onClick={() => onToggle?.(o.value)}
            aria-pressed={active ? "true" : "false"}
          >
            {o.label ?? o.value}
          </button>
        );
      })}
    </div>
  );
}
