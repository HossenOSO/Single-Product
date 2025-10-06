import { useEffect, useMemo, useState, useCallback } from "react";

export default function Gallery({ images = [] }) {
  // تطبيع بسيط للصور (تأمين src/alt) وتفادي القيم الفارغة
  const pics = useMemo(
    () =>
      (Array.isArray(images) ? images : [])
        .filter(Boolean)
        .map((im, i) => ({
          src: im?.src || "",
          alt: im?.alt || `صورة ${i + 1}`,
        })),
    [images]
  );

  const total = pics.length || 1;
  const [idx, setIdx] = useState(0);
  const [isFav, setIsFav] = useState(false);
  const [inCompare, setInCompare] = useState(false);

  // تأمين الفهرس ضمن المدى
  const safeIdx = useCallback(
    (i) => {
      const t = total || 1;
      return ((i % t) + t) % t;
    },
    [total]
  );

  const goNext = useCallback(() => setIdx((i) => safeIdx(i + 1)), [safeIdx]);
  const goPrev = useCallback(() => setIdx((i) => safeIdx(i - 1)), [safeIdx]);

  // في حال تغيّرت قائمة الصور وأصبح idx خارج المدى، نثبّته
  useEffect(() => {
    setIdx((i) => safeIdx(i));
  }, [pics.length, safeIdx]);

  // التعامل مع لوحة المفاتيح داخل المعرض فقط
  const onKeyDown = (e) => {
    if (e.key === "ArrowRight") {
      // في RTL: السهم اليمين يُعيد للصورة السابقة
      e.preventDefault();
      e.stopPropagation();
      goPrev();
    }
    if (e.key === "ArrowLeft") {
      // في RTL: السهم اليسار يتقدّم للصورة التالية
      e.preventDefault();
      e.stopPropagation();
      goNext();
    }
  };

  const current = pics[idx]?.src || "";
  const currentAlt = pics[idx]?.alt || "صورة المنتج";
  const single = pics.length <= 1;

  return (
    <div
      className="gallery"
      role="region"
      aria-label="صور المنتج"
      tabIndex={0}
      onKeyDown={onKeyDown}
    >
      <div className="image img-wrap">
        {/* أيقونات أعلى الصورة */}
        <div className="img-icos" aria-label="أفعال الصورة">
          <button
            type="button"
            className={`img-ico ico-wish ${isFav ? "is-on" : ""}`}
            aria-pressed={isFav}
            aria-label={isFav ? "إزالة من المفضلة" : "أضف إلى المفضلة"}
            onClick={() => setIsFav((v) => !v)}
            title={isFav ? "إزالة من المفضلة" : "أضف إلى المفضلة"}
          >
            <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
              <path
                d="M12.1 8.64l-.1.1-.11-.1C9.14 6.1 5.6 6.28 3.3 8.6a4.46 4.46 0 000 6.32l7.67 7.07a1 1 0 001.36 0l7.67-7.07a4.46 4.46 0 000-6.32c-2.3-2.32-5.84-2.5-8.69 0z"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          <button
            type="button"
            className={`img-ico ico-compare ${inCompare ? "is-on" : ""}`}
            aria-pressed={inCompare}
            aria-label={inCompare ? "إزالة من المقارنة" : "أضف إلى المقارنة"}
            onClick={() => setInCompare((v) => !v)}
            title={inCompare ? "إزالة من المقارنة" : "أضف إلى المقارنة"}
          >
            <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
              <path
                d="M7 7h10M13 3l4 4-4 4M17 17H7M11 21l-4-4 4-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>

        {/* أسهم التنقّل (تعطيل عند صورة واحدة) */}
        <div className="img-nav" aria-hidden="true">
          <button
            type="button"
            className="img-arrow prev"
            onClick={goPrev}
            title="السابق"
            aria-label="السابق"
            disabled={single}
          >
            <svg viewBox="0 0 24 24" width="20" height="20">
              <path
                d="M15 19l-7-7 7-7"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <button
            type="button"
            className="img-arrow next"
            onClick={goNext}
            title="التالي"
            aria-label="التالي"
            disabled={single}
          >
            <svg viewBox="0 0 24 24" width="20" height="20">
              <path
                d="M9 5l7 7-7 7"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>

        <img src={current} alt={currentAlt} />
      </div>

      {/* مصغّرات أسفل الصورة بدون سكرول */}
      {pics.length > 1 && (
        <ul className="thumbs thumbs-grid" role="listbox" aria-label="مصغّرات الصور">
          {pics.map((img, i) => {
            const key = img.src || `thumb-${i}`;
            return (
              <li key={key} role="option" aria-selected={idx === i ? "true" : "false"}>
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
            );
          })}
        </ul>
      )}
    </div>
  );
}
