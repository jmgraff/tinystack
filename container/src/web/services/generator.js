import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";

export const generatorApi = createApi({
    reducerPath: "generatorApi",

    baseQuery: fetchBaseQuery({
        baseUrl: "/api/eventstest/",
        prepareHeaders: (headers, { getState }) => {
            headers.set("X-CSRFToken", Cookies.get("csrftoken"));
            return headers;
        },
    }),

    tagTypes: ["generator"],

    endpoints: (builder) => ({

        getGenerator: builder.query({
            query: () => "",
            providesTags: ["generator"],
            onCacheEntryAdded: async (arg, {updateCachedData, cacheDataLoaded, cacheEntryRemoved}) => {
                console.log("onCacheEntryAdded called");
                const eventSource = new EventSource("/api/events/");
                await cacheDataLoaded;

                eventSource.onmessage = (msg) => {
                    const obj = JSON.parse(msg.data);
                    updateCachedData((draft) => {
                        draft.value = obj.value;
                    });
                };

                await cacheEntryRemoved;
                eventSource.close();
                console.log("onCacheEntryAdded exited");
            }
        }),

        startGenerator: builder.mutation({
            query: () => ({
                url: "start/",
                method: "POST",
            }),
            invalidatesTags: ["generator"],
        }),

        stopGenerator: builder.mutation({
            query: () => ({
                url: "stop/",
                method: "POST",
            }),
            invalidatesTags: ["generator"],
        }),

    }),
});

export const {
    useGetGeneratorQuery,
    useStartGeneratorMutation,
    useStopGeneratorMutation,
} = generatorApi;
