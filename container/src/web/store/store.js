import { configureStore } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";

import { api } from "@/services/api.js";

const makeStore = () =>
    configureStore({
        reducer: {
            [api.reducerPath]: api.reducer,
        },
        middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware),
        devTools: true,
    });

export const wrapper = createWrapper(makeStore);
