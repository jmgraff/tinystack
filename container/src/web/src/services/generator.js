import { api } from "@/services/api.js";
import { HOST } from "@/util.js";

export const generatorApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getGenerator: builder.query({
            query: () => "eventstest/",
            onCacheEntryAdded: async (arg, { updateCachedData, cacheDataLoaded, cacheEntryRemoved }) => {
                console.log("Cache entry added");
                const ws = new WebSocket(`wss://${HOST}/api/eventstest/`);
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
