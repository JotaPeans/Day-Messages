import axios from "axios";

const api = axios.create({
    baseURL: "https://day-messages-backend-production.up.railway.app/",
});

export default api;