import { configureStore } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";

import { todosApi } from "@/services/todos.js";
import { generatorApi } from "@/services/generator.js";

const makeStore = () => configureStore({
    reducer: {
        [todosApi.reducerPath]: todosApi.reducer,
        [generatorApi.reducerPath]: generatorApi.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat([
        todosApi.middleware,
        generatorApi.middleware,
    ]),
    devTools: true,
});

export const wrapper = createWrapper(makeStore);
