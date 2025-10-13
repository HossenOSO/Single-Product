// src/components/plp/ProductGrid.jsx
import React from "react";

export default function ProductGrid({ items = [] }) {
  return (
    <div className="plpf-gridcards">
      {items.map((p) => (
        <article key={p.id} className="plpf-card">
          <div className="plpf-img">
            {p.image ? <img src={p.image} alt={p.title} /> : <div className="plpf-imgph" />}
          </div>
          <div className="plpf-ttl">{p.title}</div>
          <div className="plpf-pr">TRY {Number(p.price || 0).toFixed(2)}</div>
          <button className="plpf-btn">أضف إلى السلة</button>
        </article>
      ))}
    </div>
  );
}
