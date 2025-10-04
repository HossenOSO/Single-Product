import { useNavigate, useParams } from "react-router-dom";
import { mockProduct } from "../data/productMock.js";

export default function QAPage(){
  const navigate = useNavigate();
  const { id } = useParams();
  const product = mockProduct;       // عند الربط مع API استخدم id
  const qa = product.qa || [];       // إن لم توجد بيانات سيعرض رسالة بسيطة

  return (
    <main className="page" dir="rtl">
      <header className="qa-headbar">
        <h1 className="page-title">الأسئلة والأجوبة</h1>
      </header>

      <section className="qa-page">
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

        {/* يمين: شبكة أسئلة وأجوبة مريحة */}
        <section className="qa-grid" role="list">
          {qa.length ? qa.map((q, i)=>(
            <article key={i} className="qa-card" role="listitem">
              <header className="qa-head">
                <div className="qa-q">سؤال</div>
                <time className="qa-date">{q.date || ""}</time>
              </header>
              <p className="qa-text">{q.question}</p>

              <div className="qa-divider" />

              <header className="qa-head">
                <div className="qa-a">إجابة</div>
              </header>
              <p className="qa-text muted">{q.answer || "— لا توجد إجابة بعد"}</p>
            </article>
          )) : (
            <div className="muted">لا توجد أسئلة بعد</div>
          )}
        </section>
      </section>

      {/* زر رجوع عائم نفس أسلوب صفحة التعليقات */}
      <button className="fab-back" onClick={()=>navigate(-1)} aria-label="رجوع">
        ‹ رجوع
      </button>
    </main>
  );
}
