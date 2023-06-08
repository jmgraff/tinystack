import axios from "axios";

import { QueryClient, useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { configureAuth } from "react-query-auth";

const HOST = process.env.NEXT_PUBLIC_HOST;

export const client = axios.create({
    baseURL: `https://${HOST}/api`,
    withCredentials: true,
    xsrfCookieName: "csrftoken",
    xsrfHeaderName: "X-CSRFToken",
});

export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: false,
        },
    },
});

export const { AuthLoader, useUser, useLogin, useLogout } = configureAuth({
    userFn: () =>
        client
            .get("/users/me/")
            .then((res) => res.data)
            .catch((err) => null),
    loginFn: (creds) => client.post("/users/login/", creds),
    logoutFn: () => client.post("/users/logout/"),
});

export const useStartGenerator = (userInfo) => useMutation(() => client.post("/eventstest/start/"));
export const useStopGenerator = (userInfo) => useMutation(() => client.post("/eventstest/stop/"));
