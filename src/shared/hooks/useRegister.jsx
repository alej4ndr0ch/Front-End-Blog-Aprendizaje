import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register as registerRequest } from "../../services"
import toast from "react-hot-toast";

export const useRegister = () => {
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const register = async (name, email, password, username) => {
        setIsLoading(true);
        try {
            const response = await registerRequest({ name, email, password, username });

            if (response.error) {
                throw response.error;
            }

            const { userDetails } = response.data;
            localStorage.setItem('user', JSON.stringify(userDetails));
            toast.success('Usuario registrado exitosamente');
            navigate('/');
        } catch (error) {
            toast.error(
                error?.response?.data?.message || 'Ocurrió un error al registrar, intenta de nuevo'
            );
            throw error;
        } finally {
            setIsLoading(false);
        }
    };

    return { register, isLoading };
};
