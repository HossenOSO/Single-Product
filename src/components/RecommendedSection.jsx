import Section from "./Section.jsx";
import ProductCarousel from "./ProductCarousel.jsx";

export default function RecommendedSection({ items }) {
  return (
    <Section title="قد تهمك هذه أيضًا">
      <ProductCarousel items={items} itemWidth={220} gap={12} />
    </Section>
  );
}
