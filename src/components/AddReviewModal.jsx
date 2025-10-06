import { useEffect, useRef, useState } from "react";

export default function AddReviewModal({ open, onClose, onSubmit }) {
  const [form, setForm] = useState({ name: "", rating: "5", comment: "" });
  const [submitting, setSubmitting] = useState(false);

  const panelRef = useRef(null);
  const nameRef  = useRef(null);

  // إعادة الضبط عند الإغلاق
  useEffect(() => {
    if (!open) setForm({ name: "", rating: "5", comment: "" });
  }, [open]);

  // تركيز تلقائي عند الفتح
  useEffect(() => {
    if (!open) return;
    if (nameRef.current) nameRef.current.focus();
    else if (panelRef.current) panelRef.current.focus();
  }, [open]);

  if (!open) return null;

  const handleKeyDown = (e) => {
    // التزامًا بالقواعد: التقاط Escape داخل اللوحة فقط
    if (e.key === "Escape") {
      e.stopPropagation();
      onClose?.();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (submitting) return;
    if (!form.name.trim() || !form.comment.trim()) return;

    try {
      setSubmitting(true);
      await Promise.resolve(
        onSubmit?.({
          name: form.name.trim(),
          rating: Number(form.rating),
          comment: form.comment.trim(),
        })
      );
      setForm({ name: "", rating: "5", comment: "" });
      onClose?.();
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      {/* الخلفية تغلق المودال */}
      <div className="rvadd-backdrop" onClick={onClose} />

      <form
        ref={panelRef}
        className="rvadd-panel"
        role="dialog"
        aria-modal="true"
        aria-label="إضافة تعليق"
        onSubmit={handleSubmit}
        onKeyDown={handleKeyDown}
        tabIndex={-1} /* للسماح بالتركيز والتقاط لوحة المفاتيح */
      >
        <div className="rvadd-top">
          <div className="rvadd-title">إضافة تعليق</div>
          <button
            type="button"
            className="rvadd-close"
            onClick={onClose}
            aria-label="إغلاق"
            disabled={submitting}
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
            onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
            required
          />

          <select
            className="ctl add-select"
            value={form.rating}
            onChange={(e) => setForm((f) => ({ ...f, rating: e.target.value }))}
            aria-label="التقييم"
          >
            <option value="5">5 نجوم</option>
            <option value="4">4 نجوم</option>
            <option value="3">3 نجوم</option>
            <option value="2">نجمتان</option>
            <option value="1">نجمة واحدة</option>
          </select>
        </div>

        <textarea
          className="ctl add-text"
          rows={3}
          placeholder="اكتب تعليقك…"
          value={form.comment}
          onChange={(e) => setForm((f) => ({ ...f, comment: e.target.value }))}
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
            {submitting ? "جاري الإرسال…" : "إضافة تعليق"}
          </button>
        </div>
      </form>
    </>
  );
}
