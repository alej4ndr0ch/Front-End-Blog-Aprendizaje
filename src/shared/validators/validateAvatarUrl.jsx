export const validationAvatarUrl = (url) => {
    const regex = /^(ftp|http|https):\/\/[^ "]+\/[^ "]+\.(jpg|jpeg|png|gif|webp)$/i;
    return regex.test(url);
}

export const avatarUrlValidationMessage = 'Esta no es una URL valida';