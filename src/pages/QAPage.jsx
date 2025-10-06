import { useNavigate, useParams, useLocation } from "react-router-dom";
import { useEffect, useMemo, useState, useRef } from "react";
import { mockProduct } from "../data/productMock.js";
import AddQAModal from "../components/AddQAModal.jsx";
import ThreadModal from "../components/ThreadModal.jsx";
import QACard from "../components/QACard.jsx";

export default function QAPage(){
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();
  const liveRef = useRef(null); // aria-live

  const product = mockProduct;

  // تطبيع البيانات إلى ثريدات
  const initialThreads = useMemo(() => normalizeQA(product?.qa, product?.seller?.name), [product?.qa, product?.seller?.name]);
  const [threads, setThreads] = useState(initialThreads);

  // بحث + ترتيب
  const [q, setQ] = useState("");
  const [sort, setSort] = useState("recent"); // recent | answered | unanswered

  // ترقيم
  const [page, setPage] = useState(1);
  const pageSize = 12;

  // نوافذ
  const [openAsk, setOpenAsk] = useState(false);
  const [openThread, setOpenThread] = useState(null);

  // افتح الإضافة أو ثريد معيّن تلقائيًا بـ ?ask=1 أو ?qid=...
  useEffect(() => {
    const sp = new URLSearchParams(location.search);
    if (sp.get("ask") === "1") setOpenAsk(true);
    const qid = sp.get("qid");
    if (qid) {
      const t = threads.find(x => x.id === qid);
      if (t) setOpenThread(t);
    }
  }, [location.search, threads]);

  // بحث + ترتيب
  const filteredSorted = useMemo(() => {
    const term = q.trim().toLowerCase();

    let list = threads.filter(t => {
      if (!term) return true;
      const hay = t.thread.map(m => m.text || "").join(" ").toLowerCase();
      return hay.includes(term);
    });

    if (sort === "answered") {
      list = list.filter(t => t.thread.some(m => m.role === "seller" && m.text));
    } else if (sort === "unanswered") {
      list = list.filter(t => !t.thread.some(m => m.role === "seller" && m.text));
    } else {
      list = [...list].sort((a,b) => new Date(b.date || 0) - new Date(a.date || 0));
    }

    return list;
  }, [threads, q, sort]);

  useEffect(() => { setPage(1); }, [q, sort]);

  const total = filteredSorted.length;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const start = (page - 1) * pageSize;
  const current = filteredSorted.slice(start, start + pageSize);

  // إضافة سؤال جديد -> ثريد جديد
  const handleAskSubmit = ({ name, question }) => {
    const now = new Date();
    const y = now.getFullYear();
    const m = String(now.getMonth()+1).padStart(2,"0");
    const d = String(now.getDate()).padStart(2,"0");
    const newThread = {
      id: `qa-${Date.now()}`,
      date: `${y}-${m}-${d}`,
      thread: [{ role: "buyer", name: name || "مستخدم", text: question, date: `${y}-${m}-${d}` }]
    };
    setThreads(prev => [newThread, ...prev]);
    setOpenAsk(false);
    setPage(1);
    const el = document.getElementById("qa-grid");
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top, behavior: "smooth" });
    }
    if (liveRef.current) {
      liveRef.current.textContent = "تم إرسال سؤالك بنجاح.";
      setTimeout(() => (liveRef.current.textContent = ""), 1500);
    }
  };

  // متابعة داخل ثريد معيّن (من المشتري)
  const handleFollowUp = (threadId, { text }) => {
    const now = new Date();
    const y = now.getFullYear();
    const m = String(now.getMonth()+1).padStart(2,"0");
    const d = String(now.getDate()).padStart(2,"0");
    setThreads(prev => prev.map(t => {
      if (t.id !== threadId) return t;
      const thread = [...t.thread, { role: "buyer", name: "مستخدم", text, date: `${y}-${m}-${d}` }];
      return { ...t, thread };
    }));
  };

  return (
    <main className="page" dir="rtl">
      {/* aria-live */}
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

        {/* يمين: لوحة Q&A */}
        <section className="rvp-panel">
          <header className="rvp-head row">
            <h1 className="rvp-title">الأسئلة والأجوبة</h1>

            <div className="rvp-meta" aria-label="موجز">
              <span className="val">{threads.filter(t => t.thread.some(m=>m.role==="seller" && m.text)).length}</span>
              <span>إجابات</span>
              <span className="sep">•</span>
              <span className="counts">{threads.length} سؤال</span>
            </div>

            <a href="#" className="help-link" title="سياسة النشر" onClick={(e)=>e.preventDefault()}>
              <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
                <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="1.8"/>
                <path d="M12 8h.01M11 11h2v5h-2z" fill="currentColor"/>
              </svg>
              سياسة النشر
            </a>

            <button type="button" className="btn-add-open" onClick={()=>setOpenAsk(true)}>+ اطرح سؤالًا</button>
          </header>

          {/* تحكمات: بحث + ترتيب */}
          <div className="rvp-controls">
            <div className="search-wrap">
              <input
                className="ctl search"
                placeholder="ابحث في الأسئلة…"
                value={q}
                onChange={(e)=>setQ(e.target.value)}
                aria-label="بحث في الأسئلة"
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
                aria-label="ترتيب الأسئلة"
              >
                <option value="recent">الأحدث أولاً</option>
                <option value="answered">المجابة فقط</option>
                <option value="unanswered">غير المجابة</option>
              </select>
              <span className="sort-ico" aria-hidden="true">
                <svg width="16" height="16" viewBox="0 0 24 24">
                  <path d="M12 7l4 4H8l4-4zm0 10l-4-4h8l-4 4z" fill="currentColor"/>
                </svg>
              </span>
            </div>

            <a href="#qa-grid" className="rvp-all" onClick={(e)=>e.preventDefault()}>عرض الكل ‹</a>
          </div>

          {/* شبكة البطاقات */}
          <div id="qa-grid" className="rvp-grid" role="list">
            {current.map((t) => (
              <QACard key={t.id} item={t} onOpenThread={(it)=>setOpenThread(it)} />
            ))}
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

      {/* النوافذ */}
      <AddQAModal open={openAsk} onClose={()=>setOpenAsk(false)} onSubmit={handleAskSubmit}/>
      <ThreadModal
        open={!!openThread}
        item={openThread}
        onClose={()=>setOpenThread(null)}
        onFollowUp={handleFollowUp}
      />

      <button className="fab-back" onClick={()=>navigate(-1)} aria-label="رجوع">‹ رجوع</button>
    </main>
  );
}

/* === تطبيع البيانات === */
function normalizeQA(qa, sellerName = "البائع") {
  if (!Array.isArray(qa)) return [];
  return qa.map((row, idx) => {
    if (Array.isArray(row?.thread)) {
      const id = row.id || `qa-${idx}`;
      const thread = row.thread.map(m => ({
        ...m,
        name: m.name || (m.role === "seller" ? sellerName : "مستخدم")
      }));
      return { id, date: row.date || firstDate(thread), thread };
    }
    const id = row.id || `qa-${idx}`;
    const thread = [];
    if (row.question) thread.push({ role: "buyer", name: row.userName || "مستخدم", text: row.question, date: row.date });
    if (row.answer)   thread.push({ role: "seller", name: sellerName, text: row.answer, date: row.date });
    return { id, date: row.date, thread };
  });
}
function firstDate(thread) {
  for (const m of thread) if (m?.date) return m.date;
  return undefined;
}
