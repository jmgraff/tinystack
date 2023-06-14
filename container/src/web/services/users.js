import { api } from "@/services/api.js";

export const usersApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getMe: builder.query({
            query: () => "users/me/",
            providesTags: ["user"],
        }),

        logMeIn: builder.mutation({
            query: (body) => ({
                url: "users/login/",
                method: "POST",
                body,
            }),
            invalidatesTags: ["user"],
        }),

        logMeOut: builder.mutation({
            query: () => ({
                url: "users/logout/",
                method: "POST",
            }),
            onQueryStarted: async (arg, {dispatch, queryFulfilled}) => {
                await queryFulfilled;
                dispatch(api.util.resetApiState());
            },
        }),
    }),
});

export const {
    useGetMeQuery,
    useLogMeInMutation,
    useLogMeOutMutation,
} = usersApi;
