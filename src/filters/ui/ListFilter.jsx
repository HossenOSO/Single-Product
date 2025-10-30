// src/components/plp/filters/ListFilter.jsx
import React, { useMemo, useState } from "react";

export default function ListFilter({
  options = [],             // [{value,label,count,hex?}]
  selected = new Set(),     // Set<string>
  onToggle,
  countSuffix = true,
  searchable = false,
  searchValue = "",
  onSearchChange,
}) {
  return (
    <>
      {searchable && (
        <form
          className="plpf-searchin"
          role="search"
          onSubmit={(e) => e.preventDefault()}
        >
          <input
            className="plpf-inp"
            type="text"
            value={searchValue}
            onChange={(e) => onSearchChange?.(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                e.stopPropagation();
              }
            }}
            placeholder="ابحث…"
            aria-label="بحث"
          />
        </form>
      )}
      <ul className="plpf-list" role="list">
        {options.map((o) => (
          <li key={o.value} role="listitem">
            <label className="plpf-chk">
              <input
                type="checkbox"
                checked={selected.has(o.value)}
                onChange={() => onToggle?.(o.value)}
              />
              <span className="plpf-lbl">{o.label ?? o.value}</span>
              {countSuffix && o.count != null && (
                <span className="plpf-facet-count">{o.count}</span>
              )}
            </label>
          </li>
        ))}
      </ul>
    </>
  );
}
