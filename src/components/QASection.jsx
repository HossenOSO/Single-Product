import Section from "./Section.jsx";
import ProductCarousel from "./ProductCarousel.jsx";

export default function QASection({ qa = [], count = 0 }) {
  return (
    <Section id="sec-qa" title={`الأسئلة والأجوبة (${count})`}>
      {qa.length ? (
        <ProductCarousel
          items={qa}
          itemWidth={260}
          gap={12}
          renderItem={(q) => (
            <div className="card" style={{ padding:10 }}>
              <div className="card-title" style={{ fontWeight:700 }}>{q.question}</div>
              <p className="desc" style={{ marginTop:6 }}>{q.answer || "— لا توجد إجابة بعد"}</p>
            </div>
          )}
        />
      ) : (
        <div className="muted">لا توجد أسئلة بعد</div>
      )}
    </Section>
  );
}
