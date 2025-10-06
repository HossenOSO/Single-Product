import { useRef, useEffect, useState, useCallback } from "react";

/**
 * سلايدر عام للمنتجات
 * @param {Array}  items       عناصر السلايدر [{id,title,price,image,url,currency?}, ...]
 * @param {number} itemWidth   العرض الثابت لكل بطاقة (افتراضي 220)
 * @param {number} gap         المسافة بين البطاقات (افتراضي 12)
 * @param {string} currency    عملة افتراضية عند غياب currency من العنصر
 * @param {fn}     renderItem  دالة اختيارية لرسم عنصر مخصص (تستقبل العنصر وتعيد JSX)
 */
export default function ProductCarousel({
  items = [],
  itemWidth = 220,
  gap = 12,
  currency = "",
  renderItem,
}) {
  const list = Array.isArray(items) ? items : [];
  const hasItems = list.length > 0;

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

  const pageScroll = (dir) => {
    const el = trackRef.current;
    if (!el) return;
    const step = Math.max(itemWidth * 2 + gap * 2, Math.floor(el.clientWidth * 0.9));
    el.scrollBy({ left: dir * step, behavior: "smooth" });
  };

  const fmt = (v) => Number(v || 0).toLocaleString("ar-EG");
  const keyFor = (it, i) => it?.id || `${it?.title || "item"}|${it?.image || ""}|${i}`;

  if (!hasItems) return <div className="muted">لا توجد عناصر</div>;

  return (
    <div className="carousel">
      {/* سهم يسار */}
      <button
        className="car-arrow left"
        onClick={() => pageScroll(-1)}
        disabled={!canL}
        aria-label="السابق"
      >
        ‹
      </button>

      {/* المسار: LTR لضبط منطق الحركة */}
      <div
        ref={trackRef}
        className="carousel-track no-scrollbar"
        dir="ltr"
        style={{ gap }}
        role="list"
      >
        {list.map((it, i) => {
          const cur = it?.currency || currency || "";
          return (
            <div
              key={keyFor(it, i)}
              className="car-item"
              role="listitem"
              style={{ minWidth: itemWidth, maxWidth: itemWidth }}
            >
              {renderItem ? (
                renderItem(it)
              ) : (
                <a href={it?.url || "#"} className="car item">
                  <div className="pcard">
                    <div className="pc-img">
                      <img
                        src={it?.image || ""}
                        alt={it?.title || "منتج"}
                        loading="lazy"
                      />
                    </div>
                    <div className="pc-title">{it?.title || "بدون عنوان"}</div>
                    <div className="pc-price">
                      {fmt(it?.price)}
                      {cur && <span className="pc-curr"> {cur}</span>}
                    </div>
                  </div>
                </a>
              )}
            </div>
          );
        })}
      </div>

      {/* سهم يمين */}
      <button
        className="car-arrow right"
        onClick={() => pageScroll(1)}
        disabled={!canR}
        aria-label="التالي"
      >
        ›
      </button>
    </div>
  );
}
