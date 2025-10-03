// src/components/OtherSellers.jsx
export default function OtherSellers({ sellers = [] }) {
  if (!Array.isArray(sellers) || sellers.length === 0) return null;

  return (
    <>
      {/* العنوان خارج الصندوق */}
      <div className="os-title">بائعون آخرون لهذا المنتج</div>

      {/* الصندوق المبسّط */}
      <div className="os-card">
        <ul className="os-list">
          {sellers.map((s, i) => (
            <li key={i} className="os-item">
              <a href={s.storeUrl} className="os-store" title={s.name}>
                <img
                  className="os-logo"
                  src={s.logo}
                  alt=""
                  onError={(e)=>{ e.currentTarget.style.visibility="hidden"; }}
                />
                <span className="os-name">{s.name}</span>
              </a>

              <div className="os-meta">
                <span className="os-price">
                  {Number(s.price).toLocaleString("tr-TR")} <small>TRY</small>
                </span>
                {typeof s.rating === "number" && (
                  <span className="os-rate" title="تقييم البائع">★ {s.rating.toFixed(1)}</span>
                )}
              </div>

              <div className="os-row">
                {s.shipping && <span className="os-badge">{s.shipping}</span>}
                {s.delivery && <span className="os-badge">{s.delivery}</span>}
              </div>

              {/* زر بحدّ محايد ويمتلئ عند الهوفر وفق الهوية */}
              <a href={s.offerUrl || s.storeUrl} className="os-btn">اذهب للعرض</a>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
