import axios from 'axios';



export const customFetch = axios.create({
    baseURL: "https://aladdin-0kuf.onrender.com/api/admin",
    withCredentials: true, // Ensures cookies are sent
});
