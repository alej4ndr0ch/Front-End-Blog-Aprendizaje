import axios from "axios";

const apiClient = axios.create({
    baseURL: 'http://127.0.0.1:3000/learningBlog/v1',
    timeout: 5000
})

export const getPublicationById = (id) => axios.get(`${API_URL}/${id}`);

export const login = async (data) => {
    try {
        return await apiClient.post('auth/login', data)
    } catch (e) {
        return {
            error: true,
            e
        }
    }
}

export const register = async (data) => {
    try {
        const response = await apiClient.post('auth/register', data);
        return response.data;
    } catch (e) {
        console.error('Error en la solicitud de registro:', e);
        return { error: true, message: e.response?.data?.message || 'Error desconocido' };
    }
}

export const getPublications = async () => {
    try {
        return await apiClient.get('/publications')
    } catch (e) {
        return {
            error: true,
            e
        }
    }
}

export const getPublicationDetails = async () => {
    try {
        return await apiClient.get('/publications/${channelId}')
    } catch (error) {
        error: true
    }
}