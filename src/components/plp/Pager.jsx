// src/components/plp/Pager.jsx
import React from "react";

export default function Pager({ page, totalPages, onPrev, onNext, onGoto }) {
  const pages = Array.from({ length: Math.max(1, totalPages) }, (_, i) => i + 1);
  return (
    <nav className="plpf-pager" aria-label="ترقيم الصفحات">
      <button className="plpf-pgbtn" onClick={onPrev} disabled={page === 1}>‹</button>
      {pages.map((n) => (
        <button key={n} className={`plpf-pgbtn ${page === n ? "is-active" : ""}`} onClick={() => onGoto(n)}>
          {n}
        </button>
      ))}
      <button className="plpf-pgbtn" onClick={onNext} disabled={page >= totalPages}>›</button>
    </nav>
  );
}
