import axios from "axios";

export async function loginUser({username, password}) {
    try {
        return await axios.post("http://localhost:8080/login", {
            username,
            password
        });
    } catch (error) {
        throw error;
    }
}