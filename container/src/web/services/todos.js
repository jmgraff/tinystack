import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";

export const todosApi = createApi({
    reducerPath: "todosApi",

    baseQuery: fetchBaseQuery({
        baseUrl: "/api/todos/",
        prepareHeaders: (headers, { getState }) => {
            headers.set("X-CSRFToken", Cookies.get("csrftoken"));
            return headers;
        },
    }),

    tagTypes: ["todos"],

    endpoints: (builder) => ({

        getTodos: builder.query({
            query: () => "",
            providesTags: ["todos"],
        }),

        putTodo: builder.mutation({
            query: ({id, body}) => ({
                url: `${id}/`,
                method: "PUT",
                body,
            }),
            invalidatesTags: ["todos"],
        }),

        postTodo: builder.mutation({
            query: (body) => ({
                url: "",
                method: "POST",
                body,
            }),
            invalidatesTags: ["todos"],
        }),

        deleteTodo: builder.mutation({
            query: (id) => ({
                url: `${id}/`,
                method: "DELETE",
            }),
            invalidatesTags: ["todos"],
        }),

    }),
});

export const {
    useGetTodosQuery,
    useDeleteTodoMutation,
    usePutTodoMutation,
    usePostTodoMutation,
} = todosApi;
