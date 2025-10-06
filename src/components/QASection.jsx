import { useRef, useEffect, useState, useCallback, useMemo } from "react";
import { Link } from "react-router-dom";
import QACard from "./QACard.jsx";

export default function QASection({
  threads,
  qa,
  seed,
  productId,
  onAskClick,
  onViewAll,
  onOpenThread,
}) {
  const sellerName = seed?.seller?.name || "البائع";

  const threadsData = useMemo(() => {
    if (Array.isArray(threads) && threads.length) return threads;
    const source = Array.isArray(qa) ? qa : (seed?.qa || []);
    return normalizeQA(source, sellerName);
  }, [threads, qa, seed, sellerName]);

  const trackRef = useRef(null);
  const [canL, setCanL] = useState(false);
  const [canR, setCanR] = useState(false);

  const update = useCallback(() => {
    const el = trackRef.current; if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    const x = Math.max(0, Math.min(el.scrollLeft, max));
    setCanL(x > 2); setCanR(max - x > 2);
  }, []);

  useEffect(() => {
    update();
    const el = trackRef.current; if (!el) return;
    const onScroll = () => update();
    const onResize = () => update();
    el.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    return () => {
      el.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, [update]);

  const jump = (dir) => {
    const el = trackRef.current; if (!el) return;
    const step = Math.max(420 + 12, Math.floor(el.clientWidth * 0.9));
    el.scrollBy({ left: dir * step, behavior: "smooth" });
  };

  return (
    <section className="section qa-sec">
      {threadsData.length ? (
        <div className="carousel">
          <button className="car-arrow left" onClick={() => jump(-1)} disabled={!canL} aria-label="يسار">‹</button>

          <div ref={trackRef} className="carousel-track no-scrollbar" style={{ gap: 12 }} dir="ltr" role="list">
            {threadsData.map((t) => (
              <QACard key={t.id} item={t} onOpenThread={onOpenThread} />
            ))}
          </div>

          <button className="car-arrow right" onClick={() => jump(1)} disabled={!canR} aria-label="يمين">›</button>
        </div>
      ) : (
        <div className="muted" style={{ textAlign:"center", margin:"8px 0 12px" }}>لا توجد أسئلة بعد</div>
      )}

      <div className="rv-viewall" style={{ marginTop: 10 }}>
        <div style={{ display:"flex", gap:8, flexWrap:"wrap", justifyContent:"center" }}>
          {productId ? (
            <Link className="btn-view-all" to={`/product/${productId}/qa`}>عرض كل الأسئلة</Link>
          ) : (
            <button className="btn-view-all" onClick={onViewAll}>عرض كل الأسئلة</button>
          )}
          <button className="btn-view-all" onClick={onAskClick}>اطرح سؤالًا</button>
        </div>
      </div>
    </section>
  );
}

/* تطبيع مبسّط */
function normalizeQA(qa, sellerName="البائع"){
  if(!Array.isArray(qa)) return [];
  return qa.map((row, idx) => {
    if (Array.isArray(row?.thread)) {
      const id = row.id || `qa-${idx}`;
      const thread = row.thread.map((m)=>({...m, name: m.name || (m.role==="seller"?sellerName:"مستخدم")}));
      return { id, date: row.date || firstDate(thread), thread };
    }
    const id = row.id || `qa-${idx}`;
    const t = [];
    if (row.question) t.push({ role:"buyer",  name: row.userName || "مستخدم", text: row.question, date: row.date });
    if (row.answer)   t.push({ role:"seller", name: sellerName,             text: row.answer,   date: row.date });
    return { id, date: row.date, thread: t };
  });
}
function firstDate(thread){ for(const m of thread) if(m?.date) return m.date; }
