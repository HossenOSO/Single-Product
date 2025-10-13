// src/components/plp/filters/Fold.jsx
import React, { useState, useMemo } from "react";

export default function Fold({ title, dirty, onReset, children, defaultOpen = true }) {
  const [open, setOpen] = useState(!!defaultOpen);
  const uid = useMemo(() => "fld-" + Math.random().toString(36).slice(2, 8), []);
  return (
    <section className={`plpf-fold ${open ? "is-open" : ""}`}>
      <button className="plpf-fold-head" onClick={() => setOpen(o => !o)} aria-expanded={open} aria-controls={uid}>
        <span className="plpf-fold-ttl">{title}</span>
        <span className="plpf-fold-spacer" />
        {dirty && onReset && (
          <span
            className="plpf-mini-reset"
            role="button"
            tabIndex={0}
            onClick={(e) => { e.stopPropagation(); onReset(); }}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") { e.preventDefault(); e.stopPropagation(); onReset(); }
            }}
          >
            إعادة
          </span>
        )}
        <span className="plpf-fold-ico" aria-hidden="true">
          <svg width="16" height="16" viewBox="0 0 16 16">
            <path d="M4 6l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </span>
      </button>
      <div id={uid} className="plpf-fold-body" aria-hidden={!open}>
        <div className="plpf-fold-inner">{children}</div>
      </div>
    </section>
  );
}
