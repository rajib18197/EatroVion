import apiSlice from "./apiSlice";

const studentsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    //
    getAllStudents: builder.query({
      query: () => "/students",
    }),
    //
    addStudent: builder.mutation({
      query: (student) => {
        return {
          url: "/students",
          body: student,
          method: "POST",
        };
      },
    }),

    addSubject: builder.mutation({
      query: (subject) => {
        return {
          url: "/subjects",
          body: subject,
          method: "POST",
        };
      },

      invalidatesTags: (result, error, arg) => {
        console.log(result);
        return [{ type: `${result.studentId}-subjects`, id: result.studentId }];
      },
    }),

    getAllSubjectsByStudent: builder.query({
      query: (studentId) => {
        return {
          url: `/subjects`,
          params: {
            studentId: studentId,
          },
          method: "GET",
        };
      },

      providesTags: (result, error, studentId) => {
        console.log(result);
        const tags = result.map((subject) => ({
          type: subject.name,
          id: subject.id,
        }));
        tags.push({ type: `${studentId}-subjects`, id: studentId });
        return tags;
      },
    }),

    getAllBooksBySubject: builder.query({
      query: (subjectId) => `/books?subjectId=${subjectId}`,
    }),
  }),
});

export const {
  useGetAllStudentsQuery,
  useAddStudentMutation,
  useGetAllSubjectsByStudentQuery,
  useAddSubjectMutation,
  useGetAllBooksBySubjectQuery,
} = studentsApi;
