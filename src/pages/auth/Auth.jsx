import { useState } from "react"
import { Login } from "../../components/Login";
import { Register } from "../../components/Register";
import videoBC  from "../../assets/videoBC.mp4"

import "./authPage.css"

export const Auth = () => {

  const [isLogin, setIsLogin] = useState(true);

  const handleAuthPageToggle = () => {
    setIsLogin((prev) => !prev)
  }

  return (
    <div className="auth-container">
      <div className="video-background">
          <video autoPlay loop muted playsInline>
              <source src={videoBC} type="video/mp4"/>
          </video>
        </div>
        {isLogin ? (
          <Login switchAuthHandler={handleAuthPageToggle}/>
        ) : (
          <Register switchAuthHandler={handleAuthPageToggle}/>
        )}
    </div>
  )
}