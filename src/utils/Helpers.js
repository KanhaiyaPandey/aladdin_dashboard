import axios from 'axios';



export const customFetch = axios.create({
    baseURL: "${import.meta.env.VITE_BASE_URL}/api/admin",
    withCredentials: true, // Ensures cookies are sent
});
