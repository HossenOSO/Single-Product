import Section from "./Section.jsx";
import { Link } from "react-router-dom";

export default function CollectionsSection({ collections = [] }) {
  const isInternal = (url) => typeof url === "string" && url.startsWith("/");

  return (
    <Section title="مجموعات قد تهمك">
      <ul className="chips">
        {collections.map((t, i) => {
          const name = t?.name || "بدون اسم";
          const url  = t?.url || "#";
          const key  = `${name}-${url}-${i}`; // مفتاح ثابت قدر الإمكان

          return (
            <li key={key}>
              {isInternal(url) ? (
                <Link to={url}>{name}</Link>
              ) : (
                <a href={url}>{name}</a>
              )}
            </li>
          );
        })}
      </ul>
    </Section>
  );
}
