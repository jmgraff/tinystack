import axios from "axios";

const PROTO = process.env.REACT_APP_PROTO;
const HOST = process.env.REACT_APP_API_HOST;

export const client = axios.create({
    baseURL: `${PROTO}://${HOST}`,
});

client.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response.status === 401) {
            //TODO get web host from env
            //window.location = "http://localhost:3000/auth";
        }
        return error;
    }
);
