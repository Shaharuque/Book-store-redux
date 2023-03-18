import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const bookApiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:9000/" }),
  // tagTypes: ["Videos", "Edited"],
  tagTypes: ["Books", "Book"],
  endpoints: (builder) => ({
    //getting all videos
    getAllBooks: builder.query({
      query: () => `/books`,
      providesTags: ["Books"],
    }),
    //getting all books
    addbook: builder.mutation({
      // note: an optional `queryFn` may be used in place of `query`
      query: (data) => ({
        url: `/books`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Books"],
    }),
    // getting all featured books
    getFeaturedBooks: builder.mutation({
      query: (token) => ({
        url: `/books?featured=${token}`,
        method: "GET",
      }),
    }),

    //getting Book by its id
    getindividualbook: builder.mutation({
      query: (id) => ({
        url: `/books?id=${id}`,
        method: "GET",
      }),
      providesTags: (result, error, arg) => {
        console.log(result);
        return [
          { type: "Book", id: arg }, //dynamic tag //each single book ar jnno different different single tag provided
        ];
      },
    }),
    //Searching Book
    getSearchedBook: builder.mutation({
      query: (token) => ({
        url: `/books?name_like=${token}`,
        method: "GET",
      }),
    }),
    //update request
    editBook: builder.mutation({
      query: ({ id, data }) => ({
        url: `/books/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Books"],
    }),
    // Delete Book
    deleteBook: builder.mutation({
      query: (id) => ({
        url: `/books/${id}`,
        method: "DELETE",
      }),

      //update request korar por successful holey shei result ta 'result' property r moddhey thakbey
      //error holey error ta 'error' a pabo
      //arg={id,data}-->payload ta
      invalidatesTags: ["Books"],
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useGetAllBooksQuery,
  useAddbookMutation,
  useGetFeaturedBooksMutation,
  useGetSearchedBookMutation,
  useGetindividualbookMutation,
  useEditBookMutation,
  useDeleteBookMutation,
} = bookApiSlice;
