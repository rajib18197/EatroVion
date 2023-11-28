import Accordion from "../../ui/Accordion";

export default function Entity({ data, content }) {
  const header = (
    <>
      <button>&times;</button>
      <h3>{data.fullName || data.name}</h3>
    </>
  );
  return <Accordion header={header}>{content}</Accordion>;
}
