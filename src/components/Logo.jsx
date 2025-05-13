import logo from '../assets/Logo.png';

export const Logo = ({text}) => {
    return (
        <div className="auth-form-logo-container">
            <img src={logo} alt="Logo personal" width={"480px"} height={"350px"}/>
            <span>{text}</span>
        </div>
    )
}