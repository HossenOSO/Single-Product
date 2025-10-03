export default function Section({ id, title, children }) {
  return (
    <section id={id || undefined} className="section-block">
      <h2 className="section-title">{title}</h2>
      {children}
    </section>
  );
}
