import React from "react";
import "./flash-shelf.css";

/* شريط الفلاش فقط — يوضع فوق كرت المنتج عندما يكون المنتج فلاش */
export default function FlashShelf({ compact = true, narrow = true }) {
  const wrapClass = [
    "fs-wrap",
    "fs-attach",
    compact ? "fs-compact" : "",
    narrow ? "fs-narrow" : ""
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <section className={wrapClass} role="region" aria-labelledby="fs-title">
      <div className="fs-head">
        {/* اليسار: أيقونة + نص */}
        <div className="fs-left">
          <LightningIcon className="fs-bolt" aria-hidden="true" />
          <div style={{ display: "flex", flexDirection: "column" }}>
            <h2 id="fs-title" className="fs-title">البيع المفاجئ</h2>
            <span className="fs-sub">لا تضيع هذه الفرصة</span>
          </div>
        </div>

        {/* اليمين: العد + زر أيقونة فقط */}
        <div className="fs-right" style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <div className="fs-count" aria-hidden="true">
            <TimeBox value="01" />
            <span className="fs-colon">:</span>
            <TimeBox value="37" />
            <span className="fs-colon">:</span>
            <TimeBox value="01" />
          </div>

          <button type="button" className="fs-viewall fs-icon" aria-label="اذهب الآن">
            <GoIcon className="fs-go" aria-hidden="true" />
          </button>
        </div>
      </div>
    </section>
  );
}

/* صندوق الوقت */
function TimeBox({ value }) {
  return (
    <div className="fs-tbox">
      <span className="fs-tval">{value}</span>
    </div>
  );
}

/* أيقونة البرق كصورة (Icons8) */
function LightningIcon({ className }) {
  return (
    <img
      className={`${className} fs-bolt-img`}
      src="https://img.icons8.com/?size=100&id=5rjf4RBWzzU4&format=png&color=000000"
      alt=""
      aria-hidden="true"
    />
  );
}

/* أيقونة “اذهب” داخل دائرة */
function GoIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" width="18" height="18">
      <circle cx="12" cy="12" r="10" fill="currentColor" opacity="0.12" />
      <path d="M10 7l5 5-5 5M10 7v10" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}
