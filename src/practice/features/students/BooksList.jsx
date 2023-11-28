import { useGetAllBooksBySubjectQuery } from "../../store/api/studentsApi";

export default function BooksList({ subject }) {
  const {
    data: books,
    isLoading,
    error,
  } = useGetAllBooksBySubjectQuery(subject.id);

  if (isLoading) return <h2>Loading Books</h2>;
  if (error)
    return (
      <h2>Error happened while fetching books of subject - {subject.id}</h2>
    );

  console.log(books, subject);
  return (
    <div>
      {books.map((book) => (
        <Book key={book.id} book={book} />
      ))}
    </div>
  );
}

function Book({ book }) {
  return (
    <div>
      <h1>{book.name}</h1>
    </div>
  );
}
