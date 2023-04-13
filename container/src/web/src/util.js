import axios from "axios";

import { QueryClient, useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { configureAuth } from "react-query-auth";

const PROTO = process.env.REACT_APP_PROTO;
const HOST = process.env.REACT_APP_API_HOST;

export const client = axios.create({
    baseURL: `${PROTO}://${HOST}`,
    withCredentials: true,
});

export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: false,
        }
    }
});

export const { AuthLoader, useUser, useLogin, useLogout } = configureAuth({
    userFn: () => client.get("/users/me").then(res => res.data).catch(err => null),
    loginFn: (creds) => client.post("/auth/jwt/login", creds, {headers:{"Content-Type": "multipart/form-data"}}),
    logoutFn: () => client.post("/auth/jwt/logout"),
});

export const useUsers = () => useQuery(["users"], () => client.get("/users").then(users => users.data));
export const useDelUser = (id) => {
    const queryClient = useQueryClient();
    return useMutation((id) => client.delete(`/users/${id}`), {
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ["users"] }),
    });
};
export const useAddUser = (userInfo) => {
    const queryClient = useQueryClient();
    return useMutation((userInfo) => client.post("/auth/register", userInfo), {
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ["users"] }),
    });
};
export const useSetUserActive = () => {
    const queryClient = useQueryClient();
    return useMutation((userInfo) => {
        client.patch(`/users/${userInfo.id}`, {is_active: userInfo.is_active})
    }, {
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ["users"] }),
    });
};
export const useSetSuperuser = () => {
    const queryClient = useQueryClient();
    return useMutation((userInfo) => {
        client.patch(`/users/${userInfo.id}`, {is_superuser: userInfo.is_superuser})
    }, {
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ["users"] }),
    });
};

