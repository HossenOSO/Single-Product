// PopularSection.jsx
import { useRef, useEffect, useState, useCallback } from "react";
import Section from "./Section.jsx";

export default function PopularSection({ items = [] }) {
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
    el.addEventListener("scroll", onScroll, { passive:true });
    window.addEventListener("resize", onResize);
    return () => {
      el.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, [update]);

  const jump = (dir) => {
    const el = trackRef.current; if (!el) return;
    const step = Math.max(220 + 12, Math.floor(el.clientWidth * 0.9));
    el.scrollBy({ left: dir * step, behavior: "smooth" });
  };

  return (
    <Section title="المنتجات الشعبية">
      <div className="carousel">
        <button className="car-arrow left" onClick={() => jump(-1)} disabled={!canL} aria-label="السابق">‹</button>

        <div ref={trackRef} className="carousel-track no-scrollbar" dir="ltr" style={{ gap: 12 }} role="list">
          {items.map((p) => (
            <div key={p.id || p.title} className="car-item" style={{ minWidth: 220, maxWidth: 220 }}>
              <a href={p.url || "#"} className="pcard">
                <div className="pc-img"><img src={p.image} alt={p.title} /></div>
                <div className="pc-title">{p.title}</div>
                <div className="pc-price">
                  {Number(p.price || 0).toLocaleString("ar-EG")}
                  <span className="pc-curr"> ر.س</span>
                </div>
              </a>
            </div>
          ))}
        </div>

        <button className="car-arrow right" onClick={() => jump(1)} disabled={!canR} aria-label="التالي">›</button>
      </div>
    </Section>
  );
}
