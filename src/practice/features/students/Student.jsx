import Accordion from "../../ui/Accordion";
import SubjectsList from "./SubjectsList";

export default function Student({ student }) {
  const Header = (
    <>
      <button>&times;</button>
      <h3>{student.fullName}</h3>
    </>
  );

  return (
    <Accordion header={Header} data={student}>
      <SubjectsList student={student} />
    </Accordion>
  );
}
