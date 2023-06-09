import { api } from "@/services/api.js";

export const generatorApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getGenerator: builder.query({
            query: () => "eventstest/",
            onCacheEntryAdded: async (arg, { updateCachedData, cacheDataLoaded, cacheEntryRemoved }) => {
                const ws = new WebSocket(`wss://${window.location.host}/api/eventstest/`);
                await cacheDataLoaded;
                ws.addEventListener("message", (event) => {
                    const data = JSON.parse(event.data);
                    updateCachedData((draft) => {
                        draft.value = data.value;
                    });
                });
                await cacheEntryRemoved;
                ws.close();
            },
            providesTags: ["generator"],
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
