import axios from "axios";

const BASE_URL = 'http://localhost:8080/api/users';

export async function findAll() {
    try {
        const response = await axios.get(`${BASE_URL}/all`);
        return response;
    } catch (error) {
        console.error(error);
    }
    return [];
}

export async function save({username, email, password}) {
    try {
        return await axios.post(`${BASE_URL}`, {
            username,
            email,
            password
        });
    } catch (error) {
        console.error(error.response.data);
        throw error;
    }
}

export async function update({id, username, email, password}) {
    try {
        return await axios.put(`${BASE_URL}/update`, {
            id,
            username,
            email,
            password
        });
    } catch (error) {
        console.error(error.response.data);
        throw error;
    }
}

export function remove(id) {
    try {
        axios.delete(`${BASE_URL}/${id}`);
    } catch (error) {
        console.error(error);
    }
}