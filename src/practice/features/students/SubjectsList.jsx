import {
  useAddSubjectMutation,
  useGetAllSubjectsByStudentQuery,
} from "../../store/api/studentsApi";
import AddButton from "../../ui/AddButton";
import BooksList from "./BooksList";
import Entity from "./Entity";
import Subject from "./Subject";

const subjectList = [
  "Physics",
  "Chemistry",
  "Math",
  "Programming",
  "Space",
  "Psychology",
  "English",
  "Literature",
  "Communication",
  "Sales",
];

export default function SubjectsList({ student }) {
  const {
    data: subjects,
    isLoading,
    error,
  } = useGetAllSubjectsByStudentQuery(student.id);

  const [addSubject, { isLoading: isAdding, error: isAddErrror }] =
    useAddSubjectMutation();

  if (isLoading) return <h2>Loading Subjects</h2>;
  if (error) return <h2>Error Occured</h2>;

  function handleClick() {
    const subjectName =
      subjectList[Math.floor(Math.random() * subjects.length)];
    addSubject({ name: subjectName, studentId: student.id });
  }

  return (
    <div>
      <AddButton onClick={handleClick} loading={isAdding}>
        Add Subjects
      </AddButton>
      {subjects.map((subject) => (
        <Entity
          key={subject.id}
          data={subject}
          content={<BooksList subject={subject} />}
        />
      ))}
    </div>
  );
}
