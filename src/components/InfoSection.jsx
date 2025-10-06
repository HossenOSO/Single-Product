import Section from "./Section.jsx";

export default function InfoSection({ brand, category, id }) {
  return (
    <Section title="معلومات المنتج">
      <ul className="kv">
        <li><span>الماركة</span><strong>{brand}</strong></li>
        <li><span>الفئة</span><strong>{category}</strong></li>
        <li><span>رمز المنتج</span><strong>{id}</strong></li>
      </ul>
    </Section>
  );
}
