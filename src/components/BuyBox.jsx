import { useState, useCallback } from "react";
import { Link } from "react-router-dom";

export default function BuyBox({ product, reviewCount = 0, qaCount = 0, onNavigate }) {
  const [mem, setMem]     = useState(product.memories?.[0]);
  const [color, setColor] = useState(product.colors?.[0]);
  const [qty, setQty]     = useState(1);
  const [fav, setFav]     = useState(false);

  const ratingVal = Number(product.rating?.value ?? 0);
  const ratingCnt = Number(product.rating?.count ?? reviewCount ?? 0);
  const pid = product?.id;

  // تنقّل داخلي مستقل عند عدم وجود pid (يفضّل استقلال المكوّن)
  const scrollToSection = useCallback((target) => {
    const id = target === "qa" ? "sec-qa" : "sec-reviews";
    const el = document.getElementById(id);
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY - 80;
    window.scrollTo({ top, behavior: "smooth" });
  }, []);

  const go = (target) => {
    // لو المالك مرّر onNavigate نستخدمه؛ غير ذلك نعتمد السلوك الداخلي
    if (typeof onNavigate === "function") return onNavigate(target);
    scrollToSection(target);
  };

  return (
    <div className="buy">
      <h1 className="p-title">{product.title}</h1>

      {/* سطر التقييم + الروابط */}
      <div className="rating-row" aria-label={`التقييم ${ratingVal} من 5`}>
        <span className="stars">
          {"★".repeat(Math.round(ratingVal)) + "☆".repeat(5 - Math.round(ratingVal))}
        </span>
        <span className="rating-num">{ratingVal.toFixed(1)}</span>
        <span className="rating-count">({ratingCnt} مراجعة)</span>

        <span className="divider">|</span>

        {pid ? (
          <Link className="link-sm" to={`/product/${pid}/reviews`}>
            التقييمات ({reviewCount})
          </Link>
        ) : (
          <button type="button" className="link-sm" onClick={() => go("reviews")}>
            التقييمات ({reviewCount})
          </button>
        )}

        <span className="dot">•</span>

        {pid ? (
          <Link className="link-sm" to={`/product/${pid}/qa`}>
            سؤال وجواب ({product.qaCount ?? qaCount ?? 0})
          </Link>
        ) : (
          <button type="button" className="link-sm" onClick={() => go("qa")}>
            سؤال وجواب ({product.qaCount ?? qaCount ?? 0})
          </button>
        )}
      </div>

      {/* السعر */}
      <div className="price">
        <div className="price-now">
          {formatNumber(product.price)} <span>{product.currency || ""}</span>
        </div>
      </div>

      {/* السعة */}
      {Array.isArray(product.memories) && product.memories.length > 0 && (
        <div className="opts">
          <div className="lbl">السعة</div>
          <div className="pills">
            {product.memories.map((m) => (
              <button
                key={m}
                className={`pill ${mem === m ? "is-on" : ""}`}
                onClick={() => setMem(m)}
                type="button"
              >
                {m}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* الألوان */}
      {Array.isArray(product.colors) && product.colors.length > 0 && (
        <div className="opts">
          <div className="lbl">اللون</div>
          <div className="swatches">
            {product.colors.map((c) => (
              <button
                key={c.hex}
                className={`sw ${color?.hex === c.hex || color === c ? "is-on" : ""}`}
                style={{ background: c.hex }}
                onClick={() => setColor(c)}
                aria-label={c.name}
                title={c.name}
                type="button"
              />
            ))}
          </div>
        </div>
      )}

      {/* الكمية */}
      <div className="qty">
        <button
          className="btn"
          onClick={() => setQty((v) => Math.min(99, v + 1))}
          aria-label="زيادة"
          type="button"
        >
          +
        </button>
        <div className="val" aria-live="polite">{qty}</div>
        <button
          className="btn"
          onClick={() => setQty((v) => Math.max(1, v - 1))}
          aria-label="إنقاص"
          type="button"
        >
          –
        </button>
      </div>

      {/* الأزرار العريضة */}
      <div className="buttons">
        <button className="btn-cart" type="button">أضف إلى السلة</button>
        <button className="btn-buy" type="button">اشترِ الآن</button>
        <button
          className={`btn-fav ${fav ? "is-on" : ""}`}
          type="button"
          aria-pressed={fav}
          aria-label={fav ? "إزالة من المفضلة" : "أضف إلى المفضلة"}
          title={fav ? "إزالة من المفضلة" : "أضف إلى المفضلة"}
          onClick={() => setFav((v) => !v)}
        >
          ♥
        </button>
      </div>

      {/* شارات */}
      <ul className="badges">
        <li>إرجاع 14 يوم</li>
        <li>دفع آمن</li>
        <li>فاتورة</li>
      </ul>
    </div>
  );
}

function formatNumber(v) {
  return Number(v || 0).toLocaleString("ar-EG");
}
