// src/components/SideColumn.jsx
import OtherSellers from "./OtherSellers.jsx";

export default function SideColumn({ product, qaCount = 0 }) {
  const p = product || {};
  const categoryName = p.category?.name;
  const categoryUrl = p.category?.url;

  const scrollToQA = () => {
    const el = document.getElementById("sec-qa");
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY - 80;
    window.scrollTo({ top, behavior: "smooth" });
  };

  return (
    <aside className="side">
      {/* بطاقة معلومات الفئة والعلامة */}
      <div className="info-card">
        <div className="info-row">
          <div className="info-label">الفئة</div>
          <a href={categoryUrl} className="info-link">
            {categoryName}
          </a>
        </div>
        <div className="info-row">
          <div className="info-label">العلامة التجارية</div>
          <a href={p.brandUrl} className="info-link">
            {p.brand}
          </a>
        </div>
      </div>

      {/* بطاقة المتجر */}
      <div className="seller-card v2">
        <a
          href={p.seller?.storeUrl}
          className="seller-head"
          title="الذهاب إلى المتجر"
        >
          <img
            className="seller-logo"
            src={p.seller?.logo}
            alt={`شعار ${p.seller?.name || "المتجر"}`}
            onError={(e) => { e.currentTarget.style.visibility = "hidden"; }}
          />
          <div className="seller-names">
            <div className="seller-name">{p.seller?.name}</div>
            <div className="seller-followers">
              {p.seller?.followers} متابع
            </div>
          </div>
          {p.seller?.score != null && (
            <span className="score-badge" title="تقييم المتجر">
              {Number(p.seller.score).toFixed(1)}
            </span>
          )}
        </a>

        {p.seller?.successful && (
          <div className="seller-subrow">
            <span className="seller-tag">بائع ناجح</span>
          </div>
        )}

        <ul className="seller-list">
          <li>
            <span className="li-ico">
              <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
                <path
                  d="M12 12a5 5 0 100-10 5 5 0 000 10zm-9 9c0-4 4-7 9-7s9 3 9 7"
                  fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"
                />
              </svg>
            </span>
            تابع المتجر
          </li>

          <li onClick={scrollToQA} role="button" tabIndex={0}>
            <span className="li-ico">
              <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
                <path
                  d="M21 15a4 4 0 0 1-4 4H7l-4 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4v8z"
                  fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"
                />
              </svg>
            </span>
            أسئلة البائع ({qaCount})<span className="chev">›</span>
          </li>
        </ul>

        <a href={p.seller?.storeUrl} className="btn-pill">
          اذهب إلى المتجر <span className="chev">›</span>
        </a>
      </div>

      {/* أضف إلى مجموعة */}
      <div className="collection-card">
        <span className="col-ico">
          <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
            <path
              d="M6 2h12a2 2 0 012 2v18l-8-4-8 4V4a2 2 0 012-2z"
              fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"
            />
          </svg>
        </span>
        أضف إلى مجموعة
        <span className="plus">+</span>
      </div>

      {/* بائعون آخرون */}
      <OtherSellers sellers={p.otherSellers || []} />
    </aside>
  );
}
