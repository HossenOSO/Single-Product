export default function Tabs({ active, onChange }) {
  return (
    <div className="tabs" role="tablist" aria-label="تفاصيل المنتج">
      <button
        className={`tab ${active === "desc" ? "is-active" : ""}`}
        onClick={() => onChange("desc")}
        role="tab"
        aria-selected={active === "desc"}
      >
        الوصف
      </button>
      <button
        className={`tab ${active === "specs" ? "is-active" : ""}`}
        onClick={() => onChange("specs")}
        role="tab"
        aria-selected={active === "specs"}
      >
        المواصفات
      </button>
      <button
        className={`tab ${active === "reviews" ? "is-active" : ""}`}
        onClick={() => onChange("reviews")}
        role="tab"
        aria-selected={active === "reviews"}
      >
        التقييمات
      </button>
      <button
        className={`tab ${active === "qa" ? "is-active" : ""}`}
        onClick={() => onChange("qa")}
        role="tab"
        aria-selected={active === "qa"}
      >
        سؤال وجواب
      </button>
    </div>
  );
}
