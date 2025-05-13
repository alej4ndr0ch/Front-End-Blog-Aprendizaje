import { useState } from 'react';
import { Logo } from './Logo';
import { Input } from './Input';
import {
    validateUsername,
    validateEmail,
    validateName,
    validatePassword,
    validateConfirPassword,
    validateUsernameMessage,
    emailValidationMessage,
    validatePasswordMessage,
    ValidateNameMessage,
    passwordConfirmationMessage
} from '../shared/validators'
import { useRegister } from '../shared/hooks'

export const Register = () => {

    const { registerUser, isLoading, errorMessage } = useRegister();

    const [formState, setFormState] = useState({
        name: { 
            value: '', 
            isValid: false, 
            showError: false 
        },
        username: { 
            value: '', 
            isValid: false, 
            showError: false 
        },
        email: { 
            value: '', 
            isValid: false, 
            showError: false 
        },
        password: { 
            value: '', 
            isValid: false, 
            showError: false 
        },
    });

    const handleInputChange = (value, field) => {
        setFormState((prevState) => ({
            ...prevState,
            [field]: {
                ...prevState[field],
                value
            }
        }));
    };

    const handleBlurValidation = (value, field) => {
        let isValid = false;
        switch (field) {
            case 'name':
                isValid = validateName(value);
                break;
            case 'email':
                isValid = validateEmail(value);
                break;
            case 'username':
                isValid = validateUsername(value);
                break;
            case 'password':
                isValid = validatePassword(value);
                break;
            case 'passwordConfir':
                isValid = validateConfirPassword(formState.password.value, value)
                break;
            default:
                break;
        }
        setFormState((prevState) => ({
            ...prevState,
            [field]: {
                ...prevState[field],
                isValid,
                showError: !isValid
            }
        }));
    }

    const handleRegister = (e) => {
        e.preventDefault();
        const { name, username, email, password } = formState;

        if (name.isValid && username.isValid && email.isValid && password.isValid) {
            registerUser(name.value, username.value, email.value, password.value);
        } else {
            console.log("Faltan campos obligatorios o están mal");
        }
    };

    const isSubmitButtonDisable = isLoading ||
        !formState.name.isValid;
        !formState.email.isValid ||
        !formState.password.isValid ||
        !formState.username.isValid;

    return (
        <div className="register-container">
            <Logo/>
            <form  className="auth-form" onSubmit={handleRegister}>
                <Input
                    field="name"
                    label="Name"
                    value={formState.name.value}
                    onChangeHandler={handleInputChange}
                    onBlurHandler={handleBlurValidation}
                    type='text'
                    showErrorMessage={formState.name.showError}
                    validationMessage={ValidateNameMessage}
                />
                <Input
                    field="username"
                    label="Username"
                    value={formState.username.value}
                    onChangeHandler={handleInputChange}
                    type='text'
                    onBlurHandler={handleBlurValidation}
                    showErrorMessage={formState.username.showError}
                    validationMessage={validateUsernameMessage}
                />
                <Input
                    field="email"
                    label="Email"
                    value={formState.email.value}
                    onChangeHandler={handleInputChange}
                    onBlurHandler={handleBlurValidation}
                    showErrorMessage={formState.email.showError}
                    validationMessage={emailValidationMessage}
                />
                <Input
                    field="password"
                    label="Password"
                    value={formState.password.value}
                    onChangeHandler={handleInputChange}
                    onBlurHandler={handleBlurValidation}
                    type='password'
                    showErrorMessage={formState.password.showError}
                    validationMessage={passwordConfirmationMessage}
                />
                <button type="submit" disabled={isLoading}>
                    {isLoading ? 'Registering...' : 'Register'}
                </button>
            </form>

            {errorMessage && <div className="error-message">{errorMessage}</div>}
        </div>
    )
}