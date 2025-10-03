import React from "react";
import "./flash-shelf.css";

export default function FlashShelf({ children }) {
  return (
    <section className="fs-wrap fs-narrow" role="region" aria-labelledby="fs-title">
      <div className="fs-head">
        {/* يسار: أيقونة البرق من Icons8 + النص */}
        <div className="fs-left">
          <LightningIcon className="fs-bolt" aria-hidden="true" />
          <div style={{ display: "flex", flexDirection: "column" }}>
            <h2 id="fs-title" className="fs-title">البيع المفاجئ</h2>
            <span className="fs-sub">لا تضيع هذه الفرصة</span>
          </div>
        </div>

        {/* يمين: الوقت + زر أيقونة */}
        <div className="fs-right">
          <div className="fs-count" aria-hidden="true">
            <TimeBox value="01" />
            <span className="fs-colon">:</span>
            <TimeBox value="37" />
            <span className="fs-colon">:</span>
            <TimeBox value="01" />
          </div>

          <button className="fs-viewall fs-icon" aria-label="اذهب الآن">
            <ChevronLeftIcon className="fs-chevron" aria-hidden="true" />
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

/* أيقونة البرق من الرابط الذي أرسلته */
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

/* سهم يسار للأيقونة فقط */
function ChevronLeftIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" width="18" height="18">
      <path fill="currentColor" d="M15 6l-6 6 6 6" />
    </svg>
  );
}
