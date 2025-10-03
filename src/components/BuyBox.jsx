import { useState } from "react";

export default function BuyBox({ product, reviewCount = 0, qaCount = 0, onNavigate }) {
  const [mem, setMem] = useState(product.memories?.[0]);
  const [color, setColor] = useState(product.colors?.[0]);
  const [qty, setQty] = useState(1);
  const [fav, setFav] = useState(false);

  const ratingVal = Number(product.rating?.value ?? 0);
  const ratingCnt = Number(product.rating?.count ?? reviewCount ?? 0);

  return (
    <div className="buy">
      <h1 className="p-title">{product.title}</h1>

      <div className="rating-row" aria-label={`التقييم ${ratingVal} من 5`}>
        <span className="stars">
          {"★".repeat(Math.round(ratingVal)) + "☆".repeat(5 - Math.round(ratingVal))}
        </span>
        <span className="rating-num">{ratingVal.toFixed(1)}</span>
        <span className="rating-count">({ratingCnt} مراجعة)</span>

        <span className="divider">|</span>

        <button
          type="button"
          className="link-sm"
          onClick={() => onNavigate && onNavigate("reviews")}
        >
          التقييمات ({reviewCount})
        </button>

        <span className="dot">•</span>

        <button
          type="button"
          className="link-sm"
          onClick={() => onNavigate && onNavigate("qa")}
        >
          سؤال وجواب ({product.qaCount ?? 0})
        </button>
      </div>

      <div className="price">
        <div className="price-now">
          {Number(product.price).toLocaleString("tr-TR")} <span>{product.currency}</span>
        </div>
      </div>

      <fieldset className="variant">
        <legend>السعة</legend>
        {product.memories?.map((m) => (
          <label className="pill" key={m}>
            <input
              type="radio"
              name="mem"
              value={m}
              checked={mem === m}
              onChange={() => setMem(m)}
            />
            <span>{m}</span>
          </label>
        ))}
      </fieldset>

      <fieldset className="variant">
        <legend>اللون</legend>
        {product.colors?.map((c) => (
          <label className="swatch" key={c.hex} title={c.name}>
            <input
              type="radio"
              name="color"
              value={c.hex}
              checked={color?.hex === c.hex}
              onChange={() => setColor(c)}
            />
            <span style={{ "--sw": c.hex }} />
          </label>
        ))}
      </fieldset>

      <div className="qty">
        <button className="qty-btn" onClick={() => setQty((v) => Math.max(1, v - 1))}>−</button>
        <input
          type="number"
          min="1"
          value={qty}
          onChange={(e) => setQty(Math.max(1, Number(e.target.value || 1)))}
        />
        <button className="qty-btn" onClick={() => setQty((v) => v + 1)}>+</button>
        <span className="stock">متاح {product.stock}</span>
      </div>

      {/* أزرار أعرض + أيقونة المفضلة بعدها مباشرة */}
      <div className="ctas ctas-wide">
        <button className="btn btn-buy btn-wide">شراء الآن</button>
        <button className="btn btn-cart btn-wide">أضف إلى السلة</button>

        <button
          type="button"
          className={`btn-fav ${fav ? "is-on" : ""}`}
          aria-pressed={fav}
          aria-label="أضف إلى المفضلة"
          onClick={() => setFav((v) => !v)}
          title="أضف إلى المفضلة"
        >
          <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
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
      </div>

      <ul className="badges">
        <li>إرجاع 14 يوم</li>
        <li>دفع آمن</li>
        <li>فاتورة</li>
      </ul>
    </div>
  );
}
