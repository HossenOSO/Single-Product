// src/components/OtherSellers.jsx
export default function OtherSellers({ sellers = [], currency = "" }) {
  if (!Array.isArray(sellers) || sellers.length === 0) return null;

  const fmt = (v) => Number(v || 0).toLocaleString("ar-EG");

  const keyFor = (s, i) =>
    `${s?.name || "store"}|${s?.offerUrl || ""}|${s?.storeUrl || ""}|${i}`;

  return (
    <>
      {/* العنوان خارج الكرت */}
      <div className="os-title">بائعون آخرون لهذا المنتج</div>

      {/* الكرت */}
      <div className="os-card">
        <ul className="os-list">
          {sellers.map((s, i) => {
            const price = typeof s.price === "number" ? s.price : null;
            const showPrice = price != null;
            const href = s.offerUrl || s.storeUrl || "#";

            return (
              <li key={keyFor(s, i)} className="os-item">
                <a href={s.storeUrl || "#"} className="os-store" title={s.name || ""}>
                  <img
                    className="os-logo"
                    src={s.logo}
                    alt={s.name ? `شعار ${s.name}` : "شعار المتجر"}
                    onError={(e) => {
                      e.currentTarget.style.visibility = "hidden";
                    }}
                  />
                  <span className="os-name">{s.name || "متجر"}</span>
                </a>

                <div className="os-meta">
                  {showPrice && (
                    <span className="os-price">
                      {fmt(price)} {currency && <small>{currency}</small>}
                    </span>
                  )}
                  {typeof s.rating === "number" && (
                    <span className="os-rate" title="تقييم البائع">
                      ★ {s.rating.toFixed(1)}
                    </span>
                  )}
                </div>

                <div className="os-row">
                  {s.shipping && <span className="os-badge">{s.shipping}</span>}
                  {s.delivery && <span className="os-badge">{s.delivery}</span>}
                </div>

                {/* زر بالهوية: إطار ثم امتلاء عند الهوفر */}
                <a href={href} className="os-btn">
                  اذهب للعرض
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
}
