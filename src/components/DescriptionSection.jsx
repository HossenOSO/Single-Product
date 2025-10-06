import Section from "./Section.jsx";

export default function DescriptionSection({ description }) {
  return (
    <Section title="وصف المنتج">
      <p className="desc">{description}</p>
    </Section>
  );
}
