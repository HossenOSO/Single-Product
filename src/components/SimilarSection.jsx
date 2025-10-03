import Section from "./Section.jsx";
import ProductCarousel from "./ProductCarousel.jsx";

export default function SimilarSection({ items }) {
  return (
    <Section title="منتجات مماثلة">
      <ProductCarousel items={items} itemWidth={220} gap={12} />
    </Section>
  );
}
