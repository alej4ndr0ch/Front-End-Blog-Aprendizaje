import { useEffect } from "react"
import { Navbar } from "../../components/navbars/Navbar"
import { LoadingSpinner } from "../../components/LoadingSpinner"
import { Content } from "../../components/dashboard/Content"
import { Sidebar } from "../../components/navbars/Sidebar"
import { useChannels } from "../../shared/hooks/useChannels"
import { useUserDetails } from "../../shared/hooks"
import videoBC  from "../../assets/hola.mp4"
import './dashboardPage.css'

export const DashboardPage = () => {

  

  const { getChannels, allChannels, isFetching, followedChannels } = useChannels()
  const { isLogged } = useUserDetails()

  useEffect(() => {
    getChannels(isLogged)
  }, []);

  if(isFetching) {
    return <LoadingSpinner />
  }

  return (
    
    <div className="dashboard-container">
      <div className="video-background">
    <video autoPlay loop muted playsInline>
        <source src={videoBC} type="video/mp4"/>
    </video>
  </div>
        <Navbar />
        <Content channels={allChannels} getChannels={getChannels}/>
        <Sidebar channels={followedChannels}/>
    </div>
  )
}