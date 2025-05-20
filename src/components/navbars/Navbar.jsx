import { useNavigate } from "react-router-dom";
import logo from '../../assets/Logo.png'
import { useUserDetails } from "../../shared/hooks";

const NavLogo = () => {
    return(
        <div className="nav-logo-container">
            <img 
                className="nav-logo"
                width='60px'
                height='40px'
                src={logo}
                alt="Logo personal"
            />
        </div>
    )
}

const NavButton = ({text, onClickHandler}) => {
    return(
        <span className="nav-button" onClick={onClickHandler}>
            {text}
        </span>
    )
}

export const Navbar = () => {
    
    const { isLogged, logout } = useUserDetails()

    const navigate = useNavigate()

    const handleNavigateToAuthPage = () => {
        navigate('/auth')
    }

    const handleLogout = () => {
        logout()
    }

    return (
        <div className="nav-container">
            <NavLogo />
            <div className="nav-buttons-container">
                {!isLogged ? (
                    <NavButton text="Login" className={"login-button"} onClickHandler={handleNavigateToAuthPage}/>
                ) : (
                    <div>
                        <NavButton text="Logout" onClickHandler={handleLogout}/>
                    </div>
                )}
            </div>
        </div>
    )
}