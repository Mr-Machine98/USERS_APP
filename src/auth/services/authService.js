import axios from "axios";

export async function loginUser({username, password}) {
    try {
        return await axios.post(`${import.meta.env.VITE_API_BASE_URL}/login`, {
            username,
            password
        });
    } catch (error) {
        throw error;
    }
}