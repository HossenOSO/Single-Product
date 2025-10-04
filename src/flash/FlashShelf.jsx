import React from "react";
import "./flash-shelf.css";

export default function FlashShelf({ children }) {
  return (
    <section className="fs-wrap" role="region" aria-labelledby="fs-title">
      <div className="fs-head">
        {/* يسار: أيقونة برق مزدوج + النصوص */}
        <div className="fs-left">
          <DoubleLightningIcon className="fs-bolt" aria-hidden="true" />
          <div style={{ display: "flex", flexDirection: "column" }}>
            <h2 id="fs-title" className="fs-title">البيع المفاجئ</h2>
            <span className="fs-sub">لا تضيع هذه الفرصة</span>
          </div>
        </div>

        {/* يمين: الوقت + زر */}
        <div className="fs-right" style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <div className="fs-count" aria-hidden="true">
            <TimeBox value="01" />
            <span className="fs-colon">:</span>
            <TimeBox value="37" />
            <span className="fs-colon">:</span>
            <TimeBox value="01" />
          </div>
          <button className="fs-viewall">اذهب الآن</button>
        </div>
      </div>

      <div className="fs-cards" tabIndex={0}>
        {children}
      </div>
    </section>
  );
}

/* مكون صندوق الوقت */
function TimeBox({ value }) {
  return (
    <div className="fs-tbox">
      <span className="fs-tval">{value}</span>
    </div>
  );
}

/* أيقونة برق مزدوج */
function DoubleLightningIcon({ className }) {
  return (
    <svg
      className={className}
      viewBox="0 0 48 24"
      width="28"
      height="20"
      fill="currentColor"
    >
      <path d="M13 2L3 14h7l-1 8 11-14h-7V2z" />
      <path d="M35 2l-10 12h7l-1 8 11-14h-7V2z" />
    </svg>
  );
}
