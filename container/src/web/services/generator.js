import { api } from "@/services/api.js";

export const generatorApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getGenerator: builder.query({
            query: () => "eventstest/",
            providesTags: ["generator"],
            onCacheEntryAdded: async (arg, { updateCachedData, cacheDataLoaded, cacheEntryRemoved }) => {
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
            },
        }),

        startGenerator: builder.mutation({
            query: () => ({
                url: "eventstest/start/",
                method: "POST",
            }),
            invalidatesTags: ["generator"],
        }),

        stopGenerator: builder.mutation({
            query: () => ({
                url: "eventstest/stop/",
                method: "POST",
            }),
            invalidatesTags: ["generator"],
        }),
    }),
});

export const { useGetGeneratorQuery, useStartGeneratorMutation, useStopGeneratorMutation } = generatorApi;
