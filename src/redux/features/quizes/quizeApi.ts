import { api } from "../../api/apiSlice";
///api for product operation
export const quizeApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getQuizzes: builder.query({
      query: (queryString) => ({
        url: `/quizzes?${queryString}`,
        method: "GET",
      }),
      providesTags: ["Quizzes"],
    }),
    getSingleQuize: builder.query({
      query: (id) => ({
        url: `/quizzes/${id}`,
        method: "GET",
        // body: data,
      }),
      providesTags: ["singleService"],
    }),
    updateQuize: builder.mutation({
      query: ({ id, data }) => ({
        url: `/quizzes/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Quizzes", "singleService"],
    }),

    deleteQuize: builder.mutation({
      query: (id) => ({
        url: `/quizzes/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Quizzes"],
    }),
    addQuize: builder.mutation({
      query: (data) => ({
        url: `/quizzes`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Quizzes"],
    }),
    addCategory: builder.mutation({
      query: (data) => ({
        url: `/categories`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Quizzes"],
    }),
  }),
});

export const { useAddQuizeMutation,useGetQuizzesQuery,useAddCategoryMutation } = quizeApi;
