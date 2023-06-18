import { useGetMeQuery } from "@/services/users.js";

export default function AuthLoader({ loading, unauthenticated, children }) {
    const me = useGetMeQuery();

    if (me.isLoading) {
        return loading;
    } else if (me.isError && me.error.status === 401) {
        return unauthenticated;
    } else if (me.isSuccess) {
        return children;
    }

    throw "Unknown error checking authorization";
}
