import axios from "axios";

const apiClient = axios.create({
    baseURL: 'http://127.0.0.1:3000/learningBlog/v1',
    timeout: 5000
})

export const getPublicationById = (id) => apiClient.get(`/publications/${id}`);

export const login = async (data) => {
    try {
        return await apiClient.post('auth/login', data);
    } catch (e) {
        return {
            error: true,
            e
        };
    }
};

export const register = async (data) => {
    try {
        const response = await apiClient.post('auth/register', data);
        return response.data;
    } catch (e) {
        console.error('Error en la solicitud de registro:', e);
        return { error: true, message: e.response?.data?.message || 'Error desconocido' };
    }
};

export const getPublications = async ({ desde, limite }) => {
    try {
        return await apiClient.get(`/api/publications?desde=${desde}&limite=${limite}`);
    } catch (e) {
        return {
            error: true,
            e
        };
    }
};

export const getPublicationDetails = async (publicationId) => {
    try {
        return await apiClient.get(`/publications/${publicationId}`);
    } catch (error) {
        return { error: true };
    }
};

export const addComment = async (desde, limite) => {
    try {
        return await apiClient.get(`/publications?desde=${desde}&limite=${limite}`);
    } catch (error) {
        console.error("Error al agregar comentario:", error);
        return {
            success: false,
            message: "Error al agregar comentario",
        };
    }
};

export const getComments = async () => {
    try {
        const response = await apiClient.get('/comments');
        return response.data;
    } catch (error) {
        console.error("Error al obtener comentarios:", error);
        return { data: { success: false, comments: [] } };
    }
};