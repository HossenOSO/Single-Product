import React from "react";
import "./flash-hub.css";

export default function FlashHub() {
  // عدّ شكلي
  const t = ["00", "21", "00"];

  // مواعيد شكلية
  const slots = [
    { range: "12:00 - 15:00", note: "نشط الآن", active: true },
    { range: "15:00 - 18:00", note: "بعد 22 دقيقة" },
    { range: "18:00 - 21:00", note: "اليوم" },
    { range: "21:00 - 24:00", note: "اليوم" },
    { range: "09:00 - 12:00", note: "غداً" }
  ];

  return (
    <>
      {/* خلفية ممتدة — محتوى متمركز */}
      <section className="fh-band" role="region" aria-label="Flash Hub">
        <div className="fh-inner fh-bar">
          {/* الطرف الأيمن: مجموعة صغيرة فقط */}
          <div className="fh-ctrl">
            <span className="chip-ghost">خصومات 24 ساعة</span>

            <div className="chip-clock" aria-hidden="true">
              <span className="seg">{t[0]}</span>
              <span className="colon">:</span>
              <span className="seg">{t[1]}</span>
              <span className="colon">:</span>
              <span className="seg">{t[2]}</span>
            </div>

            <button type="button" className="icon-btn" aria-label="اذهب">
              <Arrow className="arrow" />
            </button>
          </div>


          <h2 className="fh-title">بيع مفاجئ</h2>
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

function Arrow({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
      <path fill="currentColor" d="M9 6l6 6-6 6" />
    </svg>
  );
}
