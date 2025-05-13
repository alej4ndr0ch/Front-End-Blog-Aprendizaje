const registerUser = async (name, username, email, password) => {
  setIsLoading(true);

  const data = { name, username, email, password };

  try {
    const response = await register(data);

    if (response.error) {
      setErrorMessage(response.message || "Hubo un problema con el registro.");
    } else if (response.success) {
      console.log("Registro exitoso", response);
      setIsLoading(false);
    } else {
      setErrorMessage("Error desconocido.");
      setIsLoading(false);
    }
  } catch (error) {
    console.error("Error durante el registro:", error);
    setErrorMessage("Hubo un problema con el registro, inténtalo de nuevo.");
    setIsLoading(false);
  }
};
