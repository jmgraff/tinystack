import { Navigate, useLocation } from "react-router-dom";

export default function RequireAuth({children}){
    const auth = localStorage.getItem("token");
    const loc = useLocation()

    if (!auth) {
        return <Navigate to='/auth' state ={{from : loc}}/>;
    }

    return children;
}
