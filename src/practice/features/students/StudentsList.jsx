import { useGetAllStudentsQuery } from "../../store/api/studentsApi";
import Entity from "./Entity";
import Student from "./Student";
import SubjectsList from "./SubjectsList";

export default function StudentsList() {
  const result = useGetAllStudentsQuery();
  //   console.log(result);
  const { data: students, isLoading, error } = result;

  if (isLoading) return <h2>Loading</h2>;
  if (error) return <h2>{error}</h2>;

  return (
    <div className="students">
      {students.map((student) => (
        <Entity
          key={student.id}
          data={student}
          content={<SubjectsList student={student} />}
        />
      ))}
    </div>
  );
}

// The Goal of this component is to display the List of all books each student needs to finish for each subject.

// Features:

//  1) display a list of students
//  2) display a list of subjects for each student
//  3) display a list of books for each subject

// 4) accordion panel (Reusable)

///////////////////////
// "Your self-expression allows the audience to have their own self-expression."

// - Rick Rubin​

// "Make art that makes artists." - Jack Butcher​

// Your brand/idea should be someone's 'missing piece'- that helps them create a new, greater version of themselves.

// They've always felt it, always resonated with it- but never had the label, the name, the product, the book- that captured it.

// But now, they do. And they'll use it to not only create themselves- but create for everyone else.

// Your life should be a painting (for others to get inspired).

// Your ideas should be a paintbrush (for others to create).
