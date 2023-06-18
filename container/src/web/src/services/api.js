import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";

export const api = createApi({
    baseQuery: fetchBaseQuery({
        baseUrl: "/api/",
        prepareHeaders: async (headers, _) => {
            if (Cookies.get("csrftoken") === undefined) {
                await fetch("/api/users/csrf/");
            }
            headers.set("X-CSRFToken", Cookies.get("csrftoken"));
            return headers;
        },
    }),
    tagTypes: ["user", "todo", "generator"],
    reducerPath: "api",
    endpoints: () => ({}),
});
