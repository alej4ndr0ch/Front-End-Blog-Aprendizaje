import { Navbar } from "../../components/navbars/Navbar"
import { LoadingSpinner } from "../../components/LoadingSpinner"
import { Sidebar } from "../../components/navbars/Sidebar"
import { useUserDetails } from "../../shared/hooks"
import videoBC  from "../../assets/videoBC.mp4"
import './dashboardPage.css'

export const DashboardPage = () => {

  

  const { isFetching } = useChannels()
  const {    } = useUserDetails()

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
        <Sidebar  />
    </div>
  )
}