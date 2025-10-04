import { useRef } from "react";

export default function ProductCarousel({ items = [], itemWidth = 220, gap = 12, renderItem }) {
  const trackRef = useRef(null);

  const jump = (dir) => {
    const el = trackRef.current;
    if (!el) return;
    const step = dir * (itemWidth + gap) * 2;
    el.scrollBy({ left: step, behavior: "smooth" });
  };

  if (!items?.length) return <div className="muted">لا توجد عناصر</div>;

  return (
    <div className="carousel">
      <button className="car-arrow left" onClick={() => jump(-1)} aria-label="السابق">‹</button>
      <div ref={trackRef} className="carousel-track no-scrollbar" style={{ gap }}>
        {items.map((it) => (
          <div key={it.id || it.title} className="car-item" style={{ minWidth:itemWidth, maxWidth:itemWidth }}>
            {renderItem ? renderItem(it) : (
              <a href={it.url || "#"} className="card">
                <div className="card-img"><img src={it.image} alt={it.title} /></div>
                <div className="card-title">{it.title}</div>
                <div className="card-price">{Number(it.price).toLocaleString("tr-TR")} <span>TRY</span></div>
              </a>
            )}
          </div>
        ))}
      </div>
      <button className="car-arrow right" onClick={() => jump(1)} aria-label="التالي">›</button>
    </div>
  );
}
