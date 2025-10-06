import { useRef, useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";

export default function Reviews({ reviews, seed, productId, onAddClick, onViewAll, onItemClick }) {
  const list =
    (Array.isArray(reviews) && reviews) ||
    (Array.isArray(seed?.reviews) && seed.reviews) ||
    (Array.isArray(seed?.product?.reviews) && seed.product.reviews) || [];

  const trackRef = useRef(null);
  const [canL, setCanL] = useState(false);
  const [canR, setCanR] = useState(false);

  const update = useCallback(() => {
    const el = trackRef.current; if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    const x = Math.max(0, Math.min(el.scrollLeft, max));
    setCanL(x > 2); setCanR(max - x > 2);
  }, []);

  useEffect(() => {
    update();
    const el = trackRef.current; if (!el) return;
    const onScroll = () => update();
    const onResize = () => update();
    el.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    return () => {
      el.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, [update]);

  const jump = (dir) => {
    const el = trackRef.current; if (!el) return;
    const step = Math.max(360 + 12, Math.floor(el.clientWidth * 0.9));
    el.scrollBy({ left: dir * step, behavior: "smooth" });
  };

  const Actions = () => (
    <div className="rv-viewall" style={{ marginTop: 10 }}>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", justifyContent: "center" }}>
        {productId ? (
          <Link className="btn-view-all" to={`/product/${productId}/reviews`}>عرض كل التعليقات</Link>
        ) : (
          <button className="btn-view-all" onClick={() => onViewAll?.()}>عرض كل التعليقات</button>
        )}
        {onAddClick ? (
          <button className="btn-view-all" onClick={onAddClick}>أضِف تعليقًا</button>
        ) : productId ? (
          <Link className="btn-view-all" to={`/product/${productId}/reviews?add=1`}>أضِف تعليقًا</Link>
        ) : (
          <button className="btn-view-all" onClick={() => onViewAll?.()}>أضِف تعليقًا</button>
        )}
      </div>
    </div>
  );

  return (
    <div className="rv reviews-sec">
      <div className="carousel">
        <button className="car-arrow left" onClick={() => jump(-1)} disabled={!canL} aria-label="يسار">‹</button>

        <div ref={trackRef} className="carousel-track no-scrollbar" style={{ gap: 12 }} dir="ltr" role="list">
          {list.length ? list.map((r) => (
            <article
              key={`${r.user_name}-${r.created_at}-${(r.comment||"").slice(0,8)}`}
              className="review-card rv-mini"
              role="listitem"
              style={{ minWidth: 360, maxWidth: 360, cursor: onItemClick ? "pointer" : "default" }}
              onClick={() => onItemClick?.(r)}
            >
              <header className="review-head">
                <time className="review-date">{r.created_at}</time>
                <div className="review-user">{r.user_name}</div>
                <div className="review-avatar" aria-hidden="true">
                  {initials(r.user_name)}
                </div>
              </header>

              <div className="review-stars" aria-label={`التقييم ${r.rating} من 5`}>
                <span className="stars">
                  {"★".repeat(Math.round(r.rating)) + "☆".repeat(5 - Math.round(r.rating))}
                </span>
                <span className="stars-num">{Number(r.rating).toFixed(1)}</span>
              </div>

              <p className="review-text">{r.comment}</p>
            </article>
          )) : (
            <div className="muted" style={{textAlign:"center", padding:"10px 0"}}>لا توجد تعليقات بعد</div>
          )}
        </div>

        <button className="car-arrow right" onClick={() => jump(1)} disabled={!canR} aria-label="يمين">›</button>
      </div>

      <Actions />
    </div>
  );
}
function initials(name=""){const p=String(name).trim().split(/\s+/).slice(0,2);return p.length?p.map(s=>s[0]).join("").toUpperCase():"؟";}
