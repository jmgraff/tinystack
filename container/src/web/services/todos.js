import { api } from "@/services/api.js";

export const todosApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getTodos: builder.query({
            query: () => "todos/",
            providesTags: ["todo"],
        }),

        putTodo: builder.mutation({
            query: ({id, body}) => ({
                url: `todos/${id}/`,
                method: "PUT",
                body,
            }),
            invalidatesTags: ["todo"],
        }),

        postTodo: builder.mutation({
            query: (body) => ({
                url: "todos/",
                method: "POST",
                body,
            }),
            invalidatesTags: ["todo"],
        }),

        deleteTodo: builder.mutation({
            query: (id) => ({
                url: `todos/${id}/`,
                method: "DELETE",
            }),
            invalidatesTags: ["todo"],
        }),
    }),
});

export const {
    useGetTodosQuery,
    useDeleteTodoMutation,
    usePutTodoMutation,
    usePostTodoMutation,
} = todosApi;
