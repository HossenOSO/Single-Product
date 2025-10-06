import { useEffect, useState } from "react";

/**
 * ThreadModal
 * Props:
 * - open: boolean
 * - item: { id, date, thread: [{ role: 'buyer'|'seller', name, text, date }] }
 * - onClose: () => void
 * - onFollowUp: (text) => void   (اختياري)
 */
export default function ThreadModal({ open, item, onClose, onFollowUp }) {
  const [text, setText] = useState("");

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => { if (e.key === "Escape") onClose?.(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  useEffect(() => {
    if (!open) setText("");
  }, [open]);

  if (!open || !item) return null;

  const msgs = Array.isArray(item.thread) ? item.thread : [];

  const submit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    onFollowUp?.(text.trim());
    setText("");
  };

  return (
    <>
      <div className="rvadd-backdrop" onClick={onClose} />
      <div className="rvadd-panel" role="dialog" aria-modal="true" aria-label="محادثة السؤال والجواب">
        <div className="rvadd-top">
          <div className="rvadd-title">محادثة السؤال والجواب</div>
          <button type="button" className="rvadd-close" onClick={onClose} aria-label="إغلاق">×</button>
        </div>

        <div className="qa-thread">
          {msgs.map((m, i) => (
            <div key={i} className={`qa-msg ${m.role === "seller" ? "seller" : "buyer"}`}>
              <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                <div className={`qa-avatar ${m.role==="seller"?"seller":""}`} aria-hidden="true">
                  {initials(m.name)}
                </div>
                <div className="qa-meta">
                  <div className="qa-name">{m.name || (m.role==="seller" ? "البائع" : "مستخدم")}</div>
                  {m.date && <time className="qa-time">{m.date}</time>}
                </div>
              </div>
              <div className="qa-bubble">{m.text}</div>
            </div>
          ))}
        </div>

        <form className="qa-follow" onSubmit={submit}>
          <input
            className="add-input"
            placeholder="أضف ردّاً…"
            value={text}
            onChange={(e)=>setText(e.target.value)}
          />
          <button type="submit" className="btn-add">إرسال</button>
        </form>
      </div>
    </>
  );
}

function initials(name = "") {
  const parts = String(name).trim().split(/\s+/).slice(0, 2);
  return parts.length ? parts.map((p) => p[0]).join("").toUpperCase() : "؟";
}
