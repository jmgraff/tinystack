import axios from "axios";

const PROTO = process.env.REACT_APP_PROTO;
const HOST = process.env.REACT_APP_API_HOST;

export const axiosInstance = axios.create({
    baseURL: `${PROTO}://${HOST}`,
});
