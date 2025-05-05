import logo from '../assets/Logo.png';

export const Logo = ({text}) => {
    return (
        <div className="auth-form-logo-container">
            <img src={logo} alt="Logo personal" />
            <span>{text}</span>
        </div>
    )
}