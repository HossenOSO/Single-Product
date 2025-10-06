import { useNavigate, useParams, useLocation } from "react-router-dom";
import { useEffect, useMemo, useState, useRef } from "react";
import { mockProduct, mockReviews } from "../data/productMock.js";
import AddReviewModal from "../components/AddReviewModal.jsx";

export default function ReviewsPage(){
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();
  const liveRef = useRef(null); // aria-live

  const product = mockProduct;

  // مصدر التعليقات (محلي للسماح بالإضافة)
  const [all, setAll] = useState(() => Array.isArray(mockReviews.data) ? mockReviews.data : []);

  // helpful votes: تخزين محلي بسيط {rid: {up,down}}
  const [votes, setVotes] = useState({});

  // بحث + ترتيب
  const [q, setQ] = useState("");
  const [sort, setSort] = useState("recommended"); // recommended | newest | highest | lowest

  // ترقيم صفحات
  const [page, setPage] = useState(1);
  const pageSize = 12;

  // انبثاقات
  const [openReview, setOpenReview] = useState(null);  // عرض تعليق
  const [openAdd, setOpenAdd] = useState(false);       // إضافة تعليق

  // افتح الإضافة أو تعليق معيّن تلقائيًا بـ ?add=1 أو ?rid=...
  useEffect(() => {
    const sp = new URLSearchParams(location.search);
    if (sp.get("add") === "1") setOpenAdd(true);
    const rid = sp.get("rid");
    if (rid) {
      const it = all.find(r => makeRid(r) === rid);
      if (it) setOpenReview(it);
    }
  }, [location.search, all]);

  const filteredSorted = useMemo(() => {
    const term = q.trim().toLowerCase();
    let list = all.filter(r => {
      if(!term) return true;
      const hay = `${r.user_name || ""} ${r.comment || ""}`.toLowerCase();
      return hay.includes(term);
    });

    if (sort === "newest")      list = [...list].sort((a,b) => new Date(b.created_at) - new Date(a.created_at));
    else if (sort === "highest") list = [...list].sort((a,b) => Number(b.rating) - Number(a.rating));
    else if (sort === "lowest")  list = [...list].sort((a,b) => Number(a.rating) - Number(b.rating));

    return list; // recommended => كما هو
  }, [all, q, sort]);

  useEffect(() => { setPage(1); }, [q, sort]);

  const total = filteredSorted.length;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const start = (page - 1) * pageSize;
  const current = filteredSorted.slice(start, start + pageSize);

  const ratingVal   = Number(product?.rating?.value ?? 0);
  const ratingCount = Number(product?.rating?.count ?? 0);
  const commentCount = all.length;

  const submitAdd = ({ name, rating, comment }) => {
    const now = new Date();
    const y = now.getFullYear();
    const m = String(now.getMonth()+1).padStart(2,"0");
    const d = String(now.getDate()).padStart(2,"0");
    const newReview = {
      user_name: name.trim(),
      rating: Number(rating),
      created_at: `${y}-${m}-${d}`,
      comment: comment.trim(),
      verified: false // لو عندك من الخادم ضع القيمة الحقيقية
    };
    setAll(prev => [newReview, ...prev]);
    setOpenAdd(false);
    setPage(1);
    // scroll
    const el = document.getElementById("rvp-grid");
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top, behavior: "smooth" });
    }
    // aria-live
    if (liveRef.current) {
      liveRef.current.textContent = "تم إرسال تعليقك بنجاح.";
      setTimeout(() => (liveRef.current.textContent = ""), 1500);
    }
  };

  // helpful handlers
  const onVote = (rid, type) => {
    setVotes(prev => {
      const cur = prev[rid] || { up: 0, down: 0, clicked: null };
      if (cur.clicked === type) return prev; // منع تكرار نفس التصويت
      const next = {
        up: cur.up + (type === "up" ? 1 : 0),
        down: cur.down + (type === "down" ? 1 : 0),
        clicked: type
      };
      return { ...prev, [rid]: next };
    });
  };

  // ESC لإغلاق مودال العرض
  useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape") setOpenReview(null); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <main className="page" dir="rtl">
      {/* aria-live للإعلانات الهادئة */}
      <div ref={liveRef} aria-live="polite" style={{position:"absolute",clip:"rect(1px,1px,1px,1px)",padding:0,border:0,height:1,width:1,overflow:"hidden"}} />

      <section className="all-reviews">
        {/* يسار: بطاقة المنتج المصغّرة */}
        <aside className="prod-mini">
          <div className="pm-img">
            <img src={product.images?.[0]?.src} alt={product.title}/>
          </div>
          <div className="pm-title">{product.title}</div>
          <div className="pm-price">
            {Number(product.price).toLocaleString("tr-TR")} <span>{product.currency}</span>
          </div>
          <button className="pm-link" onClick={()=>navigate(-1)}>العودة للمنتج</button>
        </aside>

        {/* يمين: رأس + تحكمات + شبكة + ترقيم */}
        <section className="rvp-panel">
          {/* رأس كسطر واحد */}
          <header className="rvp-head row">
            <h1 className="rvp-title">كل التعليقات</h1>

            <div className="rvp-meta" aria-label={`تقييم المنتج ${ratingVal} من 5`}>
              <span className="val">{ratingVal.toFixed(1)}</span>
              <span className="stars">
                {"★".repeat(Math.round(ratingVal)) + "☆".repeat(5 - Math.round(ratingVal))}
              </span>
              <span className="sep">•</span>
              <span className="counts">
                {ratingCount} تقييم&nbsp;&nbsp;{commentCount} تعليق
              </span>
            </div>

            <a href="#" className="help-link" title="معايير نشر التعليقات" onClick={(e)=>e.preventDefault()}>
              <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
                <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="1.8"/>
                <path d="M12 8h.01M11 11h2v5h-2z" fill="currentColor"/>
              </svg>
              معايير نشر التعليقات
            </a>

            {/* زر إضافة تعليق */}
            <button type="button" className="btn-add-open" onClick={()=>setOpenAdd(true)}>+ أضِف تعليقًا</button>
          </header>

          {/* تحكمات: بحث + ترتيب */}
          <div className="rvp-controls">
            <div className="search-wrap">
              <input
                className="ctl search"
                placeholder="ابحث في التعليقات…"
                value={q}
                onChange={(e)=>setQ(e.target.value)}
                aria-label="بحث في التعليقات"
              />
              <button className="search-ico" aria-label="بحث" type="button" tabIndex={-1}>
                <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
                  <circle cx="11" cy="11" r="7" fill="none" stroke="currentColor" strokeWidth="1.8"/>
                  <path d="M20 20l-3.2-3.2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
                </svg>
              </button>
            </div>

            <div className="sort-wrap">
              <select
                className="ctl select"
                value={sort}
                onChange={(e)=>setSort(e.target.value)}
                aria-label="ترتيب التعليقات"
              >
                <option value="recommended">ترتيب مقترح</option>
                <option value="newest">الأحدث أولاً</option>
                <option value="highest">الأعلى تقييمًا</option>
                <option value="lowest">الأدنى تقييمًا</option>
              </select>
              <span className="sort-ico" aria-hidden="true">
                <svg width="16" height="16" viewBox="0 0 24 24">
                  <path d="M12 7l4 4H8l4-4zm0 10l-4-4h8l-4 4z" fill="currentColor"/>
                </svg>
              </span>
            </div>

            <a href="#rvp-grid" className="rvp-all" onClick={(e)=>e.preventDefault()}>عرض الكل ‹</a>
          </div>

          {/* شبكة بطاقات التعليق */}
          <div id="rvp-grid" className="rvp-grid" role="list">
            {current.map((r) => {
              const rid = makeRid(r);
              const v = votes[rid] || { up: 0, down: 0, clicked: null };
              return (
                <article
                  key={rid}
                  className="review-card rvp-item"
                  role="listitem"
                  onClick={()=>setOpenReview(r)}
                  style={{cursor:"pointer"}}
                  title="عرض التعليق"
                >
                  <header className="review-head">
                    <div className="review-avatar" aria-hidden="true">{initials(r.user_name)}</div>
                    <div className="review-user">
                      {r.user_name}
                      {r.verified && <span className="badge-verified" title="مشتري موثّق">موثّق</span>}
                    </div>
                    <time className="review-date">{r.created_at}</time>
                  </header>

                  <div className="review-stars" aria-label={`التقييم ${r.rating} من 5`}>
                    <span className="stars">
                      {"★".repeat(Math.round(r.rating)) + "☆".repeat(5 - Math.round(r.rating))}
                    </span>
                    <span className="stars-num">{Number(r.rating).toFixed(1)}</span>
                  </div>

                  <p className="review-text rvp-text">{r.comment}</p>

                  {/* أزرار مفيد/غير مفيد - النقر على البطاقة يفتح المودال، لذا نمنع الفقاعة هنا */}
                  <div className="rv-helpful" onClick={(e)=>e.stopPropagation()}>
                    <button
                      type="button"
                      className={`rv-hbtn up ${v.clicked === "up" ? "is-active" : ""}`}
                      onClick={()=>onVote(rid,"up")}
                      aria-pressed={v.clicked === "up"}
                    >مفيد ({v.up})</button>
                    <button
                      type="button"
                      className={`rv-hbtn down ${v.clicked === "down" ? "is-active" : ""}`}
                      onClick={()=>onVote(rid,"down")}
                      aria-pressed={v.clicked === "down"}
                    >غير مفيد ({v.down})</button>
                  </div>
                </article>
              );
            })}
            {!current.length && <div className="muted">لا توجد نتائج مطابقة</div>}
          </div>

          {/* ترقيم الصفحات */}
          {totalPages > 1 && (
            <nav className="rvp-pager" aria-label="ترقيم الصفحات">
              <button
                type="button"
                className="pg-btn"
                disabled={page === 1}
                onClick={()=>setPage(p => Math.max(1, p-1))}
                aria-label="السابق"
              >‹</button>

              {Array.from({length: totalPages}, (_,i)=>i+1).map(n => (
                <button
                  key={n}
                  type="button"
                  className={`pg-btn num ${page===n ? "is-active" : ""}`}
                  onClick={()=>setPage(n)}
                  aria-current={page===n ? "page" : undefined}
                >{n}</button>
              ))}

              <button
                type="button"
                className="pg-btn"
                disabled={page === totalPages}
                onClick={()=>setPage(p => Math.min(totalPages, p+1))}
                aria-label="التالي"
              >›</button>
            </nav>
          )}
        </section>
      </section>

      {/* انبثاق عرض التعليق */}
      {openReview && (
        <>
          <div className="rvmodal-backdrop" onClick={()=>setOpenReview(null)} />
          <div className="rvmodal-panel" role="dialog" aria-modal="true" aria-label="عرض التعليق">
            <div className="rvmodal-top">
              <div className="u">
                <span className="review-avatar" aria-hidden="true">{initials(openReview.user_name)}</span>
                <div className="uu">
                  <div className="review-user">
                    {openReview.user_name}
                    {openReview.verified && <span className="badge-verified" title="مشتري موثّق">موثّق</span>}
                  </div>
                  <time className="review-date">{openReview.created_at}</time>
                </div>
              </div>
              <button className="rvmodal-close" onClick={()=>setOpenReview(null)} aria-label="إغلاق">×</button>
            </div>
            <div className="rvmodal-stars" aria-label={`التقييم ${openReview.rating} من 5`}>
              <span className="stars">
                {"★".repeat(Math.round(openReview.rating)) + "☆".repeat(5 - Math.round(openReview.rating))}
              </span>
              <span className="stars-num">{Number(openReview.rating).toFixed(1)}</span>
            </div>
            <p className="rvmodal-text">{openReview.comment}</p>
          </div>
        </>
      )}

      {/* انبثاق إضافة تعليق */}
      <AddReviewModal
        open={openAdd}
        onClose={()=>setOpenAdd(false)}
        onSubmit={submitAdd}
      />

      <button className="fab-back" onClick={()=>navigate(-1)} aria-label="رجوع">‹ رجوع</button>
    </main>
  );
}

function initials(name=""){
  const parts = String(name).trim().split(/\s+/).slice(0,2);
  return parts.length ? parts.map(p=>p[0]).join("").toUpperCase() : "؟";
}
function makeRid(r){
  return `${r.user_name}-${r.created_at}-${(r.comment||"").slice(0,8)}`;
}
