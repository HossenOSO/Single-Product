import { useRef, useEffect, useState, useCallback } from "react";

export default function Reviews({ seed, onViewAll }) {
  const list = Array.isArray(seed?.data) ? seed.data : [];
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
    const itemW = 360;      // عرض بطاقة التعليق
    const gap = 12;         // نفس المسافة في CSS
    const step = Math.max(itemW + gap, Math.floor(el.clientWidth * 0.9));
    el.scrollBy({ left: dirStep * step, behavior: "smooth" });
  };

  const goAll = () => {
    if (typeof onViewAll === "function") return onViewAll();
    const el = document.getElementById("all-reviews");
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY - 80;
    window.scrollTo({ top, behavior: "smooth" });
  };

  if (!list.length) return <div className="muted">لا توجد تعليقات بعد</div>;

  return (
    <div className="rv">
      {/* سلايدر داخلي بنفس هيكل الأقسام الأخرى */}
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
           {list.map((r) => (
            <article key={`${r.user_name}-${r.created_at}-${r.comment?.slice(0,8)}`} className="review-card">
              <header className="review-head">
                <div className="review-avatar" aria-hidden="true">
                  {initials(r.user_name)}
                </div>
                <div className="review-user">{r.user_name}</div>
                <time className="review-date">{r.created_at}</time>
              </header>

              <div
                className="review-stars"
                aria-label={`التقييم ${r.rating} من 5`}
              >
                <span className="stars">
                  {"★".repeat(Math.round(r.rating)) +
                    "☆".repeat(5 - Math.round(r.rating))}
                </span>
                <span className="stars-num">
                  {Number(r.rating).toFixed(1)}
                </span>
              </div>

              <p className="review-text">{r.comment}</p>
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

      <div className="rv-viewall">
        <button className="btn-view-all" onClick={goAll}>
          عرض كل التعليقات
        </button>
      </div>
    </div>
  );
}

function initials(name = "") {
  const parts = String(name).trim().split(/\s+/).slice(0, 2);
  return parts.length ? parts.map((p) => p[0]).join("").toUpperCase() : "؟";
}
