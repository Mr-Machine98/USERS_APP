import axios from "axios";

const BASE_URL = 'http://localhost:8080/api/users';
const config = () => {
    return {
        headers: {
            "Authorization": sessionStorage.getItem('token'),
            "Content-Type": "application/json"
        }
    }
}

export async function findAll() {
    try {
        const response = await axios.get(`${BASE_URL}/all`);
        return response;
    } catch (error) {
        console.error(error.response.data);
        throw error;
    }
    return [];
}

export async function save({username, email, password, onAdmin}) {
    try {
        return await axios.post(`${BASE_URL}`, {
            username,
            email,
            password,
            onAdmin
        }, config() );
    } catch (error) {
        console.error(error.response.data);
        throw error;
    }
}

export async function update({id, username, email, password, onAdmin}) {
    try {
        return await axios.put(`${BASE_URL}/update`, {
            id,
            username,
            email,
            password,
            onAdmin
        }, config() );
    } catch (error) {
        console.error(error.response.data);
        throw error;
    }
}

export async function remove(id) {
    try {
        await axios.delete(`${BASE_URL}/${id}`, config() );
    } catch (error) {
        console.error(error.response.data);
        throw error;
    }
}