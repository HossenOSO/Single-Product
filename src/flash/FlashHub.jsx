import React from "react";
import "./flash-hub.css";

export default function FlashHub() {
  // عدّ شكلي الآن
  const t = ["00", "21", "00"];

  const slots = [
    { range: "12:00 - 15:00", note: "نشط الآن", active: true },
    { range: "15:00 - 18:00", note: "بعد 22 دقيقة" },
    { range: "18:00 - 21:00", note: "اليوم" },
    { range: "21:00 - 24:00", note: "اليوم" },
    { range: "09:00 - 12:00", note: "غداً" }
  ];

  return (
    <>
      {/* شريط بخلفية ممتدة عبر الشاشة */}
      <section className="fh-band" role="region" aria-label="Flash Hub">
        <div className="fh-inner">
          <div className="fh-header">
            <h2 className="fh-title">بيع مفاجئ</h2>

    <div className="fh-tabs" role="tablist" aria-label="أنواع الخصومات">
      <button
        type="button"
        role="tab"
        aria-selected="true"
        className="tab tab-3h"
      >
        <span className="t-label">خصومات 3 ساعات</span>
        <span className="t-time" aria-live="polite">
          <span className="d">{t[0]}</span>
          <span className="colon">:</span>
          <span className="d">{t[1]}</span>
          <span className="colon">:</span>
          <span className="d">{t[2]}</span>
        </span>
      </button>

      <button
        type="button"
        role="tab"
        aria-selected="false"
        className="tab tab-24"
      >
        <span className="t-label">خصومات 24 ساعة</span>
        <Chevron className="chev"/>
      </button>
    </div>
          </div>
        </div>
      </section>

      {/* المواعيد أسفل الشريط */}
      <div className="fh-sched">
        <div className="fh-sched-inner" role="list" aria-label="مواعيد العروض">
          {slots.map((s, i) => (
            <div key={i} className={`fh-slot ${s.active ? "is-active" : ""}`} role="listitem">
              <div className="fh-slot-time">{s.range}</div>
              <div className={`fh-slot-note ${s.active ? "ok" : ""}`}>{s.note}</div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

function Chevron({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
      <path fill="currentColor" d="M9 6l6 6-6 6" />
    </svg>
  );
}
