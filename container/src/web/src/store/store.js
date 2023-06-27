import { configureStore } from "@reduxjs/toolkit";

import { api } from "@/services/api.js";

export const store = configureStore({
    reducer: {
        [api.reducerPath]: api.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware),
    devTools: true,
});
