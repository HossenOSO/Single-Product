import { useRef, useEffect, useState, useCallback } from "react";

export default function QASection({ qa = [], count = 0, onViewAll }) {
  const trackRef = useRef(null);
  const [canL, setCanL] = useState(false);
  const [canR, setCanR] = useState(false);

  const update = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    const x = Math.max(0, Math.min(el.scrollLeft, max));
    setCanL(x > 2);
    setCanR(max - x > 2);
  }, []);

  useEffect(() => {
    update();
    const el = trackRef.current;
    if (!el) return;
    const onScroll = () => update();
    const onResize = () => update();
    el.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    return () => {
      el.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, [update]);

  const jump = (dirStep) => {
    const el = trackRef.current;
    if (!el) return;
    const itemW = 320;
    const gap = 12;
    const step = Math.max(itemW + gap, Math.floor(el.clientWidth * 0.9));
    el.scrollBy({ left: dirStep * step, behavior: "smooth" });
  };

  const handleViewAll = () => {
    if (typeof onViewAll === "function") return onViewAll();
  };

  return (
    <div className="qa-wrap">
      {qa?.length ? (
        <div className="carousel">
          <button
            className="car-arrow left"
            onClick={() => jump(-1)}
            disabled={!canL}
            aria-label="يسار"
          >
            ‹
          </button>

          <div
            ref={trackRef}
            className="carousel-track"
            style={{ gap: 12 }}
            dir="ltr"
          >
            {qa.map((q, i) => (
              <article key={i} className="qa-card car-item" style={{ minWidth:320, maxWidth:320 }}>
                <header className="qa-head">
                  <div className="qa-q">سؤال</div>
                  <time className="qa-date">{q.date || ""}</time>
                </header>
                <p className="qa-text">{q.question}</p>

                <div className="qa-divider" />

                <header className="qa-head">
                  <div className="qa-a">إجابة</div>
                </header>
                <p className="qa-text muted">{q.answer || "— لا توجد إجابة بعد"}</p>
              </article>
            ))}
          </div>

          <button
            className="car-arrow right"
            onClick={() => jump(1)}
            disabled={!canR}
            aria-label="يمين"
          >
            ›
          </button>
        </div>
      ) : (
        <div className="muted">لا توجد أسئلة بعد</div>
      )}

      <div className="qa-viewall">
        <button className="btn-view-all" onClick={handleViewAll}>
          عرض كل الأسئلة {count ? `(${count})` : ""}
        </button>
      </div>
    </div>
  );
}
