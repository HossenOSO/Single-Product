import { useRef } from "react";

export default function Reviews({ seed }) {
  const list = Array.isArray(seed?.data) ? seed.data : [];
  const trackRef = useRef(null);

  const jump = (dir) => {
    const el = trackRef.current;
    if (!el) return;
    const itemWidth = 320; // عرض بطاقة التعليق
    const gap = 12;        // نفس الفاصل بين العناصر
    const step = dir * (itemWidth + gap) * 2; // عنصران بالنقرة
    el.scrollBy({ left: step, behavior: "smooth" }); // نفس منطق ProductPage
  };

  if (!list.length) return <div className="rv-empty">لا توجد تعليقات بعد</div>;

  return (
    <div className="carousel reviews-wrap" dir="rtl">
      {/* أسهم مطابقة تماماً لما في ProductPage */}
      <button
        type="button"
        className="car-arrow left"
        onClick={() => jump(-1)}
        aria-label="السابق"
        title="السابق"
      >
        ‹
      </button>

      {/* نفس المسار المستخدم هناك: carousel-track + no-scrollbar */}
      <div
        ref={trackRef}
        className="carousel-track no-scrollbar"
        role="list"
        style={{ gap: 12 }}
      >
        {list.map((r, i) => (
          <article
            key={i}
            className="rv-item car-item"
            role="listitem"
            style={{ minWidth: 320, maxWidth: 340, flex: "0 0 auto" }}
          >
            <header className="rv-hdr">
              <div className="rv-author">{r.user_name}</div>
              <time className="rv-date">{r.created_at}</time>
            </header>

            <div className="rv-stars" aria-label={`التقييم ${r.rating} من 5`}>
              {"★".repeat(Math.round(r.rating)) + "☆".repeat(5 - Math.round(r.rating))}
              <span style={{ marginInlineStart: 8, fontWeight: 700 }}>
                {Number(r.rating).toFixed(1)}
              </span>
            </div>

            <p className="rv-body">{r.comment}</p>
          </article>
        ))}
      </div>

      <button
        type="button"
        className="car-arrow right"
        onClick={() => jump(1)}
        aria-label="التالي"
        title="التالي"
      >
        ›
      </button>
    </div>
  );
}
