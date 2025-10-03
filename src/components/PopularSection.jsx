import Section from "./Section.jsx";
import ProductCarousel from "./ProductCarousel.jsx";

export default function PopularSection({ items }) {
  return (
    <Section title="المنتجات الشعبية">
      <ProductCarousel items={items} itemWidth={220} gap={12} />
    </Section>
  );
}
