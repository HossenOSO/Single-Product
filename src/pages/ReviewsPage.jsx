import { useNavigate, useParams } from "react-router-dom";
import { mockProduct, mockReviews } from "../data/productMock.js";

export default function ReviewsPage(){
  const navigate = useNavigate();
  const { id } = useParams();
  const product = mockProduct; // عند الربط بالـ API بدّل حسب id
  const reviews = mockReviews.data || [];

  return (
    <main className="page" dir="rtl">
      {/* ترويسة بسيطة فقط للعنوان */}
      <header className="rvp-head">
        <h1 className="page-title">كل التعليقات</h1>
      </header>

      <section className="all-reviews">
        {/* يسار: بطاقة المنتج المصغّرة */}
        <aside className="prod-mini">
          <div className="pm-img">
            <img src={product.images?.[0]?.src} alt={product.title}/>
          </div>
          <div className="pm-title">{product.title}</div>
          <div className="pm-price">
            {Number(product.price).toLocaleString("tr-TR")} <span>TRY</span>
          </div>
          <button className="pm-link" onClick={()=>navigate(-1)}>العودة للمنتج</button>
        </aside>

        {/* يمين: شبكة تعليقات مريحة */}
        <section className="rvp-grid" role="list">
          {reviews.map((r, i)=>(
            <article key={i} className="review-card rvp-item" role="listitem">
              <header className="review-head">
                <div className="review-avatar" aria-hidden="true">{initials(r.user_name)}</div>
                <div className="review-user">{r.user_name}</div>
                <time className="review-date">{r.created_at}</time>
              </header>
              <div className="review-stars" aria-label={`التقييم ${r.rating} من 5`}>
                <span className="stars">
                  {"★".repeat(Math.round(r.rating)) + "☆".repeat(5 - Math.round(r.rating))}
                </span>
                <span className="stars-num">{Number(r.rating).toFixed(1)}</span>
              </div>
              <p className="review-text rvp-text">{r.comment}</p>
            </article>
          ))}
        </section>
      </section>

      {/* زر رجوع عائم أسفل الشاشة */}
      <button className="fab-back" onClick={()=>navigate(-1)} aria-label="رجوع">
        ‹ رجوع
      </button>
    </main>
  );
}

function initials(name=""){
  const parts = String(name).trim().split(/\s+/).slice(0,2);
  return parts.length ? parts.map(p=>p[0]).join("").toUpperCase() : "؟";
}
