// src/components/SpecsSection.jsx
import { useState } from "react";
import Section from "./Section.jsx";

export default function SpecsSection({ specs = [] }) {
  const [open, setOpen] = useState(false);
  const clamped = !open && specs.length > 8;

  return (
    <Section title="خصائص المنتج">
      <div className={`specs-wrap ${clamped ? "is-clamped" : ""}`}>
        <div className="specs-grid">
          {specs.map((s, i) => (
            <div className="spec-item" key={i}>
              <span className="spec-ico" aria-hidden="true">
                <svg viewBox="0 0 24 24" width="16" height="16">
                  <path d="M4 12l4 4 12-12"
                        fill="none" stroke="currentColor" strokeWidth="2"
                        strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              <span className="spec-text">{s}</span>
            </div>
          ))}
        </div>
      </div>

      {specs.length > 8 && (
        <div className="specs-more">
          <button type="button" className="btn-view-all" onClick={() => setOpen(v => !v)}>
            {open ? "إخفاء" : "عرض المزيد"}
          </button>
        </div>
      )}
    </Section>
  );
}
