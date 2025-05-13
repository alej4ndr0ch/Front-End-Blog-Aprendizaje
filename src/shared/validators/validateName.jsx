export const validateName = (name) => {
    const regex = /^\S{3,12}$/;
    return regex.test(name);
}

export const ValidateNameMessage = 'El nombre debe tener entre 3 y 12 caracteres';