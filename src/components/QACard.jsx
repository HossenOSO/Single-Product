import React from "react";

/**
 * بطاقة سؤال/جواب مختصرة قابلة للنقر:
 * - أفاتار واسم وتاريخ السائل فوق نص السؤال
 * - ثم (إن وجد) أفاتار واسم وتاريخ المجيب فوق نص الإجابة
 * - النقر على البطاقة يفتح ThreadModal عبر onOpenThread(item)
 */
export default function QACard({ item, onOpenThread }) {
  if (!item) return null;

  const msgs = Array.isArray(item.thread) ? item.thread : [];
  const first  = msgs[0];
  const second = msgs[1];
  const extraCount = Math.max(0, msgs.length - 2);

  const asker    = first?.name  || "مستخدم";
  const askDate  = first?.date  || item.date;
  const answerer = second?.name || "البائع";
  const ansDate  = second?.date;

  const open = () => onOpenThread?.(item);
  const onKey = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      open();
    }
  };

  return (
    <article
      className="qa-card"
      role="button"
      tabIndex={0}
      title="سؤال/جواب"
      onClick={open}
      onKeyDown={onKey}
      aria-label="افتح المحادثة"
    >
      {first && (
        <div className="qa-block">
          <header className="qa-head">
            <div className="qa-avatar" aria-hidden="true">{initials(asker)}</div>
            <div className="qa-meta">
              <div className="qa-name">{asker}</div>
              {askDate && <time className="qa-date">{askDate}</time>}
            </div>
          </header>
          <p className="qa-q qa-text">{first.text}</p>
        </div>
      )}

      {second && (
        <div className="qa-block qa-answer">
          <header className="qa-head">
            <div className="qa-avatar seller" aria-hidden="true">{initials(answerer)}</div>
            <div className="qa-meta">
              <div className="qa-name">{answerer}</div>
              {ansDate && <time className="qa-date">{ansDate}</time>}
            </div>
          </header>
          <p className="qa-a qa-text">{second.text}</p>
        </div>
      )}

      {extraCount > 0 && (
        <div className="qa-more">
          <span className="qa-more-dot" aria-hidden="true">•</span>
          <span className="qa-more-count">+{extraCount} ردّ</span>
        </div>
      )}

      <div className="qa-open-hint">انقر لعرض المحادثة</div>
    </article>
  );
}

function initials(name = "") {
  const parts = String(name).trim().split(/\s+/).slice(0, 2);
  return parts.length ? parts.map((p) => p[0]).join("").toUpperCase() : "؟";
}
