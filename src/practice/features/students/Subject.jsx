import Accordion from "../../ui/Accordion";

export default function Subject({ subject }) {
  const header = (
    <>
      <button>&times;</button>
      <h3>{subject.name}</h3>
      <button>◀/🔽</button>
    </>
  );
  return <Accordion header={header}>Books</Accordion>;
}
