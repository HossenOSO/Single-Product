import { useEffect, useRef, useState } from "react";


export default function AddQAModal({ open, onClose, onSubmit }) {
  const [form, setForm] = useState({ name: "", question: "" });
  const [submitting, setSubmitting] = useState(false);

  const panelRef = useRef(null);
  const nameRef = useRef(null);

  // إعادة تعيين الحقول عند الإغلاق
  useEffect(() => {
    if (!open) setForm({ name: "", question: "" });
  }, [open]);

  // عند الفتح: تركيز حقل الاسم (أو اللوحة)
  useEffect(() => {
    if (!open) return;
    // نحاول التركيز على حقل الاسم أولاً
    if (nameRef.current) {
      nameRef.current.focus();
    } else if (panelRef.current) {
      panelRef.current.focus();
    }
  }, [open]);

  if (!open) return null;

  const handleKeyDown = (e) => {
    // التزامًا بالقواعد: التقاط Escape داخل المودال فقط
    if (e.key === "Escape") {
      e.stopPropagation();
      onClose?.();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.question.trim() || submitting) return;
    try {
      setSubmitting(true);
      await Promise.resolve(
        onSubmit?.({
          name: form.name.trim(),
          question: form.question.trim(),
        })
      );
      setForm({ name: "", question: "" });
      onClose?.();
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      {/* النقر على الخلفية يغلق المودال */}
      <div className="rvadd-backdrop" onClick={onClose} />

      <form
        ref={panelRef}
        className="rvadd-panel"
        role="dialog"
        aria-modal="true"
        aria-label="اطرح سؤالًا"
        onSubmit={handleSubmit}
        onKeyDown={handleKeyDown}
        tabIndex={-1} /* حتى تقبل التركيز وتلتقط لوحة المفاتيح */
      >
        <div className="rvadd-top">
          <div className="rvadd-title">اطرح سؤالًا</div>
          <button
            type="button"
            className="rvadd-close"
            onClick={onClose}
            aria-label="إغلاق"
          >
            ×
          </button>
        </div>

        <div className="rvadd-row">
          <input
            ref={nameRef}
            type="text"
            className="ctl add-input"
            placeholder="اسمك"
            value={form.name}
            onChange={(e) =>
              setForm((f) => ({ ...f, name: e.target.value }))
            }
            required
          />
          <div />
        </div>

        <textarea
          className="ctl add-text"
          rows={3}
          placeholder="اكتب سؤالك…"
          value={form.question}
          onChange={(e) =>
            setForm((f) => ({ ...f, question: e.target.value }))
          }
          required
        />

        <div className="rvadd-actions">
          <button
            type="button"
            className="btn-cancel"
            onClick={onClose}
            disabled={submitting}
          >
            إلغاء
          </button>
          <button type="submit" className="btn-add" disabled={submitting}>
            {submitting ? "جاري الإرسال…" : "إرسال السؤال"}
          </button>
        </div>
      </form>
    </>
  );
}
