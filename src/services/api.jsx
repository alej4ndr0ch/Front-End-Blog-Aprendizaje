import axios from "axios";

const apiClient = axios.create({
    baseURL: 'http://127.0.0.1:3000/learningBlog/v1',
    headers: {
        "Content-Type": "application/json",
    },
    timeout: 5000
});

export const getPublications = async ({ desde = 0, limite = 10 } = {}) => {
    try {
        const response = await apiClient.get('/publications', {
            params: { desde, limite },
        });
        return response;
    } catch (e) {
        return {
            error: true,
            e
        };
    }
};

export const getPublicationById = async (id) => {
    try {
        return await apiClient.get(`/publications/${id}`);
    } catch (e) {
        return { error: true, e };
    }
};

export const getComments = async (publicationId) => {
  try {
    const res = await apiClient.get(`/comments/publication/${publicationId}`);
    return res.data; 
  } catch (error) {
    console.error("Error al obtener comentarios:", error.response?.data?.msg || error.message);
    return [];
  }
};

export const getCourses = async () => {
    try {
        const response = await apiClient.get('/courses');
        return response;
    } catch (e) {
        return {
            error: true,
            e
        };
    }
};

export const addComment = async (publicationId, comment) => {
    try {
        const response = await apiClient.post(`/comments/${publicationId}`, comment);
        return response.data;
    } catch (error) {
        console.error("Error al enviar comentario:", error.response?.data || error.message);
        return { success: false, message: "Error al enviar comentario" };
    }
};


export const deleteComment = async (commentId) => {
    try {
        return await apiClient.delete(`/comments/${commentId}`);
    } catch (error) {
        console.error("Error al eliminar comentario:", error);
        return { data: { success: false, msg: "Error al eliminar comentario" } };
    }
};

export const updateComment = async (commentId, newText) => {
    try {
        return await apiClient.put(`/comments/${commentId}`, { text: newText });
    } catch (error) {
        console.error("Error al actualizar comentario:", error);
        return { data: { success: false, msg: "Error al actualizar comentario" } };
    }
};

export const login = async (data) => {
    try {
        return await apiClient.post('auth/login', data);
    } catch (e) {
        return { error: true, e };
    }
};

export const register = async (data) => {
    try {
        const response = await apiClient.post('auth/register', data);
        return response.data;
    } catch (e) {
        console.error('Error en la solicitud de registro:', e);
        return {
            error: true,
            message: e.response?.data?.message || 'Error desconocido',
        };
    }
};

export const getPaginatedPublications = async (desde, limite) => {
    try {
        return await apiClient.get(`/publications?desde=${desde}&limite=${limite}`);
    } catch (e) {
        return { error: true, e };
    }
};

export const getCommentsByPublicationId = async (publicationId) => {
  try {
    const res = await apiClient.get(`/comments/publication/${publicationId}`);
    return res.data.comments || []; 
  } catch (error) {
    console.error("Error al obtener comentarios:", error.response?.data?.msg || error.message);
    return [];
  }
};

export const getPublicationsByCourse = async (course, { desde = 0, limite = 10 }) => {
    try {
        const response = await apiClient.get('/publications/by-course', {
            params: { course, desde, limite },
        });
        return response;
    } catch (e) {
        return {
            error: true,
            e
        };
    }
};

