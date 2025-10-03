import { useState, useEffect, useCallback } from "react";

export default function Gallery({ images = [] }) {
  const [idx, setIdx] = useState(0);
  const [isFav, setIsFav] = useState(false);
  const [inCompare, setInCompare] = useState(false);

  const total = images.length || 1;
  const safeIdx = (i) => ((i % total) + total) % total;

  const goNext = useCallback(() => setIdx((i) => safeIdx(i + 1)), [total]);
  const goPrev = useCallback(() => setIdx((i) => safeIdx(i - 1)), [total]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowRight") goPrev();
      if (e.key === "ArrowLeft") goNext();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [goNext, goPrev]);

  const current = images[idx]?.src || "";

  return (
    <div className="gallery" role="region" aria-label="صور المنتج">
      <div className="image img-wrap">
        {/* أيقونات أعلى الصورة */}
        <div className="img-icos" aria-label="أفعال الصورة">
          <button
            type="button"
            className={`img-ico ico-wish ${isFav ? "is-on" : ""}`}
            aria-pressed={isFav}
            aria-label="أضف إلى المفضلة"
            onClick={() => setIsFav((v) => !v)}
            title="أضف إلى المفضلة"
          >
            <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
              <path
                d="M12.1 8.64l-.1.1-.11-.1C9.14 6.1 5.6 6.28 3.3 8.6a4.46 4.46 0 000 6.32l7.67 7.07a1 1 0 001.36 0l7.67-7.07a4.46 4.46 0 000-6.32c-2.3-2.32-5.84-2.5-8.69 0z"
                fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"
              />
            </svg>
          </button>

          <button
            type="button"
            className={`img-ico ico-compare ${inCompare ? "is-on" : ""}`}
            aria-pressed={inCompare}
            aria-label="أضف إلى المقارنة"
            onClick={() => setInCompare((v) => !v)}
            title="أضف إلى المقارنة"
          >
            <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
              <path
                d="M7 7h10M13 3l4 4-4 4M17 17H7M11 21l-4-4 4-4"
                fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>

        {/* أسهم التنقّل */}
        <div className="img-nav" aria-hidden="true">
          <button type="button" className="img-arrow prev" onClick={goPrev} title="السابق" aria-label="السابق">
            <svg viewBox="0 0 24 24" width="20" height="20"><path d="M15 19l-7-7 7-7" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </button>
          <button type="button" className="img-arrow next" onClick={goNext} title="التالي" aria-label="التالي">
            <svg viewBox="0 0 24 24" width="20" height="20"><path d="M9 5l7 7-7 7" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </button>
        </div>

        <img src={current} alt={images[idx]?.alt || "صورة المنتج"} />
      </div>

      {/* مصغّرات أسفل الصورة بدون سكرول */}
      {images.length > 1 && (
        <ul className="thumbs thumbs-grid" role="listbox" aria-label="مصغّرات الصور">
          {images.map((img, i) => (
            <li
              key={i}
              role="option"
              aria-selected={idx === i ? "true" : "false"}
            >
              <button
                type="button"
                className={`thumb ${idx === i ? "is-active" : ""}`}
                onClick={() => setIdx(i)}
                title={`الصورة ${i + 1}`}
                aria-label={`الانتقال إلى الصورة ${i + 1}`}
              >
                <img src={img.src} alt={img.alt || `عرض ${i + 1}`} />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
