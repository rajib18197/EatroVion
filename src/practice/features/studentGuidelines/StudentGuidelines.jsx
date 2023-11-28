import { useDispatch } from "react-redux";
import { useAddStudentMutation } from "../../store/api/studentsApi";
import AddButton from "../../ui/AddButton";
import StudentsList from "../students/StudentsList";

const students = [
  "John Doe",
  "Jane Smith",
  "David Johnson",
  "Emily Davis",
  "Michael Wilson",
  "Amanda Brown",
  "Brian Miller",
  "Olivia Taylor",
  "Christopher Anderson",
  "Sophia Martinez",
];

export default function StudentGuidelines() {
  const [addStudent, result] = useAddStudentMutation();
  const { isLoading, error } = result;
  // console.log(error);
  // console.log(result);

  function handleClick() {
    const fullName = students[Math.floor(Math.random() * students.length)];
    console.log(fullName);
    addStudent({ fullName });
  }

  return (
    <div className="guidelines">
      <AddButton onClick={handleClick} loading={isLoading}>
        Add Students
      </AddButton>
      <StudentsList />
    </div>
  );
}

// You're still welcome to write additional logic with other approaches if you'd like, but one of the goals for RTKQ is that the API definitions can completely replace the need to write any thunks or other async logic by hand.
